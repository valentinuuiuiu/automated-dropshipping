
class DeepseekLLM {
  constructor(apiKey) {
    // Accept but ignore API key
  }
  
  async generate(prompt, options = {}) {
    return JSON.stringify({
      optimal_price: 99.99,
      dynamic_pricing_strategy: 'time-based',
      promotional_calendar: []
    });
  }
}
export { DeepseekLLM };
