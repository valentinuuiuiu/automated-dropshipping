

-- Migration 0001 - Initial schema
-- Applies version 1 schema from db_setup.py

-- Products table remains as initialized in db_setup
-- This migration exists to establish baseline versioning

-- Additional indexes for performance
CREATE INDEX IF NOT EXISTS products_price_idx ON products ((data->>'price'));
CREATE INDEX IF NOT EXISTS products_stock_idx ON products ((data->>'stock'));

-- Add created_at column for better analytics
ALTER TABLE products ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ 
DEFAULT (data->>'created_time')::TIMESTAMPTZ;

COMMENT ON TABLE products IS 'Product catalog with full text search capabilities';
COMMENT ON COLUMN products.data IS 'Full product data in JSON format';

