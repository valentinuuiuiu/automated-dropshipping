
from typing import Dict, List
from .api_client import AliExpressProduct

class ProductMapper:
    @staticmethod
    def to_standard_format(product: AliExpressProduct) -> Dict:
        """Convert AliExpress product to our standard schema"""
        return {
            'id': product.product_id,
            'title': product.title,
            'base_price': product.price,
            'variants': [
                {
                    'id': variant['variant_id'],
                    'options': variant['options'],
                    'price': variant.get('price', product.price),
                    'inventory': variant.get('stock', 0)
                } 
                for variant in product.variants
            ],
            'shipping_options': [
                {
                    'method': method['name'],
                    'cost': method['cost'],
                    'delivery_time': method['days']
                }
                for method in product.shipping_info.get('methods', [])
            ]
        }

    @staticmethod
    def filter_products(products: List[Dict], min_inventory: int = 10) -> List[Dict]:
        """Filter products meeting inventory requirements"""
        return [
            p for p in products 
            if any(v['inventory'] >= min_inventory for v in p['variants'])
        ]
