const { DeepseekLLM } = require('deepseek-sdk');
const { analyzeMarketTrends } = require('./marketAnalysis');
const UnifiedAPI = require('../integrations/marketplaceAPI');
const EmailManager = require('../integrations/emailService');
const { logger } = require('../utils/logger');

class ProcurementAgent {
  constructor() {
    this.llm = new DeepseekLLM(process.env.DEEPSEEK_API_KEY);
    this.marketplace = new UnifiedAPI();
    this.emailService = new EmailManager();
    this.logger = logger.child({ module: 'ProcurementAgent' });
    this.rateLimit = 100; // API calls per minute
    this.lastCallTime = Date.now();
  }

  async rateLimitedCall(fn) {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCallTime;
    const minDelay = 60000 / this.rateLimit;

    if (timeSinceLastCall < minDelay) {
      await new Promise(resolve => setTimeout(resolve, minDelay - timeSinceLastCall));
    }

    this.lastCallTime = Date.now();
    return fn();
  }

  async execute() {
    try {
      // 1. Get market trends
      const trends = await analyzeMarketTrends();
      
      // 2. Generate AI-powered product recommendations
      const prompt = `Based on current market trends: ${JSON.stringify(trends)}
                    Suggest 10 products matching:
                    - AliExpress ratings > 4.5
                    - Amazon price variance > 15%
                    - Alibaba MOQ < 100 units
                    Format as JSON array with product names, suppliers, and profit margins`;
      
      const response = await this.llm.generate(prompt);
      
      // Parse and validate LLM response
      let products;
      try {
        products = JSON.parse(response);
        if (!Array.isArray(products)) {
          throw new Error('LLM response is not an array');
        }
      } catch (error) {
        this.logger.error(`Failed to parse LLM response: ${error.stack}`);
        throw new Error('Invalid product recommendations format');
      }
      
      // 3. Validate against actual marketplace data
      const validatedProducts = await Promise.all(
        products.map(async product => {
          const [amazonPrice, alibabaMOQ] = await Promise.all([
            this.rateLimitedCall(() =>
              this.marketplace.getCompetitorPrices(product.name)
            ),
            this.rateLimitedCall(() =>
              this.marketplace.getProductDetails('alibaba', product.name)
            )
          ]);
          
          return {
            ...product,
            amazonPrice: amazonPrice.amazon,
            alibabaMOQ: alibabaMOQ.minOrderQuantity
          };
        })
      );

      // 4. Filter and rank results
      const filteredProducts = validatedProducts.filter(p => 
        p.amazonPrice && 
        p.alibabaMOQ < 100 &&
        (p.amazonPrice / p.product.targetPrice) > 1.15
      ).sort((a, b) => b.profitMargin - a.profitMargin);

      // 5. Send report and return results
      await this.emailService.sendAgentReport('Procurement', filteredProducts);
      return filteredProducts;
      
    } catch (error) {
      this.logger.error(`Procurement failed: ${error.stack}`);
      await this.emailService.sendErrorReport('Procurement', error);
      throw error;
    }
  }
}

module.exports = ProcurementAgent;
