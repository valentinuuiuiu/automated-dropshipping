const nodemailer = require('nodemailer');
const { logger } = require('../utils/logger');
const { createEventLogger } = require('../utils/logger');

class EmailManager {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    this.eventLogger = createEventLogger();
  }

  async sendAgentReport(agentType, data) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.REPORT_RECIPIENT,
        subject: `[${agentType}] Daily Report`,
        html: this.generateReportHTML(agentType, data)
      };

      await this.transporter.sendMail(mailOptions);
      this.eventLogger.logEvent('AgentReportSent', {
        agentType,
        numItems: data.length
      });
    } catch (error) {
      this.eventLogger.logError(error, {
        context: 'sendAgentReport',
        agentType
      });
      throw error;
    }
  }

  async sendErrorReport(agentType, error) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ERROR_RECIPIENT,
        subject: `[${agentType}] Error Report`,
        text: `Error occurred in ${agentType} agent:\n\n${error.stack}`
      };

      await this.transporter.sendMail(mailOptions);
      this.eventLogger.logEvent('ErrorReportSent', {
        agentType,
        error: error.message
      });
    } catch (emailError) {
      this.eventLogger.logError(emailError, {
        context: 'sendErrorReport',
        agentType
      });
      throw emailError;
    }
  }

  generateReportHTML(agentType, data) {
    return `
      <h1>${agentType} Report</h1>
      <p>Generated at: ${new Date().toLocaleString()}</p>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Supplier</th>
            <th>Profit Margin</th>
            <th>Amazon Price</th>
            <th>MOQ</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>${item.supplier}</td>
              <td>${item.profitMargin}%</td>
              <td>$${item.amazonPrice}</td>
              <td>${item.alibabaMOQ}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}

module.exports = EmailManager;
