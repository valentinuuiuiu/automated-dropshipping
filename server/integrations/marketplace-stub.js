// Stub for UnifiedAPI
class UnifiedAPI {
  async getCompetitorPrices(productName) {
    console.log(`Getting competitor prices for ${productName}`);
    return { amazon: 100 };
  }

  async getProductDetails(platform, productName) {
    console.log(`Getting product details for ${productName} from ${platform}`);
    return { minOrderQuantity: 10 };
  }
}

export default UnifiedAPI;
