

import psycopg2
from psycopg2 import pool
from typing import Dict, Optional
import logging
import time
from datetime import datetime

logger = logging.getLogger(__name__)

class DatabaseManager:
    def __init__(self, db_config: Dict):
        self.db_config = db_config
        self.connection_pool = None
        self.schema_version = 1
        
    def create_connection_pool(self, min_conn=1, max_conn=5):
        """Initialize connection pool with retries"""
        attempts = 0
        max_attempts = 3
        
        while attempts < max_attempts:
            try:
                self.connection_pool = pool.SimpleConnectionPool(
                    min_conn, max_conn, **self.db_config
                )
                logger.info("Connection pool established")
                return True
            except Exception as e:
                attempts += 1
                wait_time = 2 ** attempts
                logger.warning(f"Connection failed (attempt {attempts}): {str(e)}")
                time.sleep(wait_time)
                
        logger.error("Failed to establish connection pool")
        return False

    def initialize_database(self) -> bool:
        """Create tables, indexes, and version tracking"""
        try:
            conn = self.connection_pool.getconn()
            with conn.cursor() as cur:
                # Schema version tracking
                cur.execute("""
                CREATE TABLE IF NOT EXISTS schema_versions (
                    version INT PRIMARY KEY,
                    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );
                """)
                
                # Products table
                cur.execute("""
                CREATE TABLE IF NOT EXISTS products (
                    id VARCHAR(64) PRIMARY KEY,
                    data JSONB NOT NULL,
                    last_updated TIMESTAMPTZ NOT NULL,
                    supplier_id VARCHAR(32),
                    search_tsvector TSVECTOR GENERATED ALWAYS AS (
                        to_tsvector('english',
                            data->>'title' || ' ' || 
                            data->>'description'
                        )
                    ) STORED
                );
                """)
                
                # Create indexes
                cur.execute("""
                CREATE INDEX IF NOT EXISTS products_search_idx 
                ON products USING GIN(search_tsvector);
                """)
                
                cur.execute("""
                CREATE INDEX IF NOT EXISTS products_supplier_idx 
                ON products (supplier_id);
                """)
                
                # Record schema version
                cur.execute("""
                INSERT INTO schema_versions (version)
                VALUES (%s)
                ON CONFLICT DO NOTHING;
                """, (self.schema_version,))
                
                conn.commit()
                logger.info(f"Database initialized (schema v{self.schema_version})")
                return True
                
        except Exception as e:
            logger.error(f"Database initialization failed: {str(e)}")
            return False
        finally:
            self.connection_pool.putconn(conn)

    def get_connection(self):
        """Get connection from pool with health check"""
        conn = self.connection_pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute("SELECT 1")
            return conn
        except:
            conn.close()
            raise

