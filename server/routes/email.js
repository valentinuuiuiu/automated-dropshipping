import express from 'express';
const router = express.Router();
import EmailManager from '../integrations/emailService.js';

const emailManager = new EmailManager();

router.post('/send-report', async (req, res) => {
  const { agentName, actions } = req.body;
  try {
    await emailManager.sendAgentReport(agentName, actions);
    res.status(200).json({ message: 'Email report sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email report.', error });
  }
});

export default router;
