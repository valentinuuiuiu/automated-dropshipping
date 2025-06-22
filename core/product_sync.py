
import schedule
import time
import psycopg2
from datetime import datetime
from typing import List, Dict
import logging
from integrations.aliExpress.api_client import AliExpressAPI
from core.data_pipeline import DataPipeline

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ProductSyncer:
    def __init__(self, api_key: str, db_config: Dict):
        self.api = AliExpressAPI(api_key)
        self.pipeline = DataPipeline()
        self.db_config = db_config
        self.failed_syncs = 0
        self.last_success = None
        
    def _get_db_connection(self):
        return psycopg2.connect(**self.db_config)

    def sync_all_products(self) -> bool:
        try:
            # 1. Fetch products
            products = self.api.get_bulk_products()
            if not products:
                raise ValueError("No products received from API")
                
            # 2. Process through pipeline
            transformed = self.pipeline.process_product_batch(products)
            
            # 3. Store in database
            with self._get_db_connection() as conn:
                with conn.cursor() as cur:
                    # Upsert products
                    for product in transformed:
                        cur.execute("""
                            INSERT INTO products 
                            (id, data, last_updated)
                            VALUES (%s, %s, %s)
                            ON CONFLICT (id) DO UPDATE SET
                            data = EXCLUDED.data,
                            last_updated = EXCLUDED.last_updated
                        """, (
                            product['id'],
                            json.dumps(product),
                            datetime.utcnow()
                        ))
                    conn.commit()
                    
            logger.info(f"Successfully synced {len(transformed)} products")
            self.failed_syncs = 0
            self.last_success = datetime.utcnow()
            return True
            
        except Exception as e:
            self.failed_syncs += 1
            logger.error(f"Sync failed (attempt {self.failed_syncs}): {str(e)}")
            
            # Exponential backoff
            if self.failed_syncs > 3:
                time.sleep(60 * self.failed_syncs)
                
            return False

    def start_sync_cycle(self, interval_hours=6):
        """Run with exponential backoff and alerting"""
        schedule.every(interval_hours).hours.do(
            self.sync_all_products
        )
        
        while True:
            try:
                schedule.run_pending()
                time.sleep(60)
                
                # Alert if no success for 24h
                if (self.last_success and 
                    (datetime.utcnow() - self.last_success).total_seconds() > 86400):
                    self._send_alert("24h without successful sync")
                    
            except Exception as e:
                logger.critical(f"Scheduler crashed: {str(e)}")
                self._send_alert(f"Scheduler down: {str(e)}")
                time.sleep(300)  # Wait 5 minutes before restart

    def _send_alert(self, message: str):
        """Integrate with monitoring system"""
        # TODO: Connect to PagerDuty/Slack
        logger.critical(f"ALERT: {message}")
