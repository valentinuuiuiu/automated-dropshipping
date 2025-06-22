

import os
from typing import List, Dict
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class MigrationManager:
    def __init__(self, db_manager):
        self.db = db_manager
        self.migrations_dir = "migrations"
        
    def get_current_version(self) -> int:
        """Get currently deployed schema version"""
        conn = self.db.get_connection()
        try:
            with conn.cursor() as cur:
                cur.execute("""
                SELECT MAX(version) FROM schema_versions
                """)
                return cur.fetchone()[0] or 0
        finally:
            self.db.connection_pool.putconn(conn)

    def get_pending_migrations(self) -> List[str]:
        """List migration files not yet applied"""
        current = self.get_current_version()
        migrations = []
        
        if os.path.exists(self.migrations_dir):
            for f in sorted(os.listdir(self.migrations_dir)):
                if f.endswith(".sql"):
                    version = int(f.split("_")[0])
                    if version > current:
                        migrations.append(f)
        
        return migrations

    def apply_migrations(self) -> bool:
        """Execute all pending migrations"""
        pending = self.get_pending_migrations()
        if not pending:
            logger.info("No pending migrations")
            return True
            
        conn = self.db.get_connection()
        try:
            with conn.cursor() as cur:
                for migration in pending:
                    path = os.path.join(self.migrations_dir, migration)
                    with open(path) as f:
                        sql = f.read()
                        
                    logger.info(f"Applying migration {migration}")
                    cur.execute(sql)
                    
                    version = int(migration.split("_")[0])
                    cur.execute("""
                    INSERT INTO schema_versions (version)
                    VALUES (%s)
                    """, (version,))
                    
                    conn.commit()
                    logger.info(f"Successfully applied {migration}")
                    
            return True
        except Exception as e:
            conn.rollback()
            logger.error(f"Migration failed: {str(e)}")
            return False
        finally:
            self.db.connection_pool.putconn(conn)

