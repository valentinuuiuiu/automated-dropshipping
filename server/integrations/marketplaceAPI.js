const { AmazonSPAPI, AlibabaOpenAPI } = require('marketplace-sdk');

class UnifiedAPI {
  constructor() {
    this.amazon = new AmazonSPAPI({
      clientId: process.env.AMAZON_CLIENT_ID,
      clientSecret: process.env.AMAZON_SECRET
    });

    this.alibaba = new AlibabaOpenAPI({
      appKey: process.env.ALIBABA_KEY,
      appSecret: process.env.ALIBABA_SECRET
    });
  }

  async getProductDetails(platform, productId) {
    switch(platform) {
      case 'amazon':
        return this.amazon.getProduct(productId);
      case 'alibaba':
        return this.alibaba.productDetails(productId);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  async getCompetitorPrices(productId) {
    const [amazonPrice, alibabaPrice] = await Promise.all([
      this.amazon.getPrice(productId),
      this.alibaba.getPrice(productId)
    ]);
    
    return {
      amazon: amazonPrice,
      alibaba: alibabaPrice
    };
  }

  async getProductCost(productId) {
    // Implementation to get product cost from suppliers
    return this.alibaba.getCost(productId);
  }
}

module.exports = UnifiedAPI;
