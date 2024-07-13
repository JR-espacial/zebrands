const sgMail = require('@sendgrid/mail');

class MailerService {
  constructor(apiKey, defaultFrom) {
    this.apiKey = apiKey;
    this.defaultFrom = defaultFrom || 'default@example.com';
    sgMail.setApiKey(this.apiKey);
  }

  async sendMessage({ to, from = this.defaultFrom, subject, text, html = '' }) {
    const msg = {
      to,
      from,
      subject,
      text,
      html,
    };

    try {
      await sgMail.send(msg);
      return true;
    } catch (error) {
      console.error('Error sending email:', error.response ? error.response.body : error.message);
      throw new Error('Error sending email: ' + (error.response ? error.response.body.errors.map(e => e.message).join(', ') : error.message));
    }
  }
}

const mailerService = new MailerService(process.env.SENDGRID_API_KEY, process.env.SENDGRID_FROM_EMAIL);

module.exports = mailerService;
