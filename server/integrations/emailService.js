// Mock implementation of the EmailManager

class EmailManager {
  constructor() {
    // In a real implementation, this would use a service like Nodemailer
  }

  async sendAgentReport(agentName, actions) {
    console.log(`Mock EmailManager: Sending report for agent ${agentName}...`);
    console.log('Actions:', actions);
    return Promise.resolve();
  }
}

export default EmailManager;
