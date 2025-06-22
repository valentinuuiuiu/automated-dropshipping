


import os
from typing import Dict
from pydantic import BaseSettings, PostgresDsn, validator

class DatabaseSettings(BaseSettings):
    POSTGRES_HOST: str
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    
    @property
    def db_config(self) -> Dict[str, str]:
        return {
            "host": self.POSTGRES_HOST,
            "port": self.POSTGRES_PORT,
            "user": self.POSTGRES_USER,
            "password": self.POSTGRES_PASSWORD,
            "dbname": self.POSTGRES_DB,
            "connect_timeout": 5,
            "application_name": "dropshipping_app"
        }

    class Config:
        env_file = ".env"
        case_sensitive = True

def get_db_config() -> Dict[str, str]:
    """Initialize and return validated DB config"""
    try:
        settings = DatabaseSettings()
        return settings.db_config
    except Exception as e:
        raise RuntimeError(f"Database configuration error: {str(e)}")

# Singleton configuration instance
DB_CONFIG = get_db_config()


