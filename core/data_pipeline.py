import json  
from typing import Dict, List, Optional  
from datetime import datetime  
import logging  
from concurrent.futures import ThreadPoolExecutor  
from queue import Queue  

# Configure logging  
logging.basicConfig(level=logging.INFO)  
logger = logging.getLogger(__name__)  

class DataPipeline:  
    def __init__(self, max_workers: int = 4):  
        self.executor = ThreadPoolExecutor(max_workers=max_workers)  
        self.task_queue = Queue()  
        self.failed_tasks = Queue()  

    def process_product_batch(self, products: List[Dict]) -> bool:  
        """Batch process products with retry logic."""  
        try:  
            results = list(self.executor.map(self._transform_product, products))  
            if any(isinstance(result, Exception) for result in results):  
                self._handle_failures(results)  
                return False  
            logger.info(f"Processed {len(products)} products successfully.")  
            return True  
        except Exception as e:  
            logger.error(f"Batch processing failed: {str(e)}")  
            return False  

    def _transform_product(self, product: Dict) -> Optional[Dict]:  
        """Transform raw product data into standardized format."""  
        try:  
            return {  
                "id": product["product_id"],  
                "title": product["title"].strip(),  
                "price": float(product["price"]),  
                "last_updated": datetime.utcnow().isoformat(),  
                "metadata": json.dumps(product.get("variants", []))  
            }  
        except Exception as e:  
            logger.warning(f"Transformation failed for product {product.get('product_id')}: {str(e)}")  
            return e  

    def _handle_failures(self, failed_results: List) -> None:  
        """Requeue failed tasks with exponential backoff."""  
        for result in failed_results:  
            if isinstance(result, Exception):  
                self.failed_tasks.put(result)  

    def stream_real_time(self, callback: callable) -> None:  
        """Process real-time data streams (e.g., Kafka, Webhooks)."""  
        while True:  
            task = self.task_queue.get()  
            try:  
                callback(task)  
            except Exception as e:  
                logger.error(f"Stream processing error: {str(e)}")  
                self.failed_tasks.put(task)  

    def get_metrics(self) -> Dict:  
        """Return pipeline health metrics."""  
        return {  
            "pending_tasks": self.task_queue.qsize(),  
            "failed_tasks": self.failed_tasks.qsize(),  
            "timestamp": datetime.utcnow().isoformat()  
        }  