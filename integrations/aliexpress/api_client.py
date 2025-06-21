
import requests
from typing import Dict, List, Optional
from dataclasses import dataclass
import hashlib
import time

@dataclass
class AliExpressProduct:
    product_id: str
    title: str
    price: float
    variants: List[Dict]
    shipping_info: Dict

class AliExpressAPI:
    def __init__(self, api_key: str, secret_key: str):
        self.base_url = "https://api.aliexpress.com"
        self.api_key = api_key
        self.secret_key = secret_key
        self.session = requests.Session()
        
    def _generate_signature(self, params: Dict) -> str:
        """Generate API signature using MD5 hash"""
        param_str = '&'.join(f'{k}{v}' for k,v in sorted(params.items()))
        return hashlib.md5(f"{self.secret_key}{param_str}".encode()).hexdigest()

    def get_product(self, product_id: str) -> Optional[AliExpressProduct]:
        """Fetch product details from AliExpress API"""
        params = {
            'method': 'aliexpress.product.get',
            'product_id': product_id,
            'timestamp': str(int(time.time())),
            'app_key': self.api_key
        }
        params['sign'] = self._generate_signature(params)
        
        try:
            response = self.session.get(f"{self.base_url}/router/rest", params=params)
            data = response.json()
            
            if data.get('error'):
                raise Exception(f"API Error: {data['error']}")
                
            return AliExpressProduct(
                product_id=data['product_id'],
                title=data['title'],
                price=float(data['price']),
                variants=data.get('variants', []),
                shipping_info=data.get('shipping_info', {})
            )
        except Exception as e:
            print(f"Failed to fetch product {product_id}: {str(e)}")
            return None

    def get_bulk_products(self, product_ids: List[str]) -> Dict[str, Optional[AliExpressProduct]]:
        """Batch fetch multiple products with error handling"""
        return {pid: self.get_product(pid) for pid in product_ids}

    def check_inventory(self, product_id: str, variant_id: str) -> int:
        """Check available inventory for specific variant"""
        params = {
            'method': 'aliexpress.inventory.get',
            'product_id': product_id,
            'variant_id': variant_id,
            'timestamp': str(int(time.time())),
            'app_key': self.api_key
        }
        params['sign'] = self._generate_signature(params)
        
        response = self.session.get(f"{self.base_url}/router/rest", params=params)
        return int(response.json().get('inventory', 0))
