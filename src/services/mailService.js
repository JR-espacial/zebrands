const sgMail = require('@sendgrid/mail');

class MailerService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    sgMail.setApiKey(this.apiKey);
  }

  async sendMessage({ to,subject, text, html }) {
    const msg = {
      to,
      from: 'jorge.alan.egs@gmail.com',
      subject,
      text,
      html,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

const mailerService = new MailerService(process.env.SENDGRID_API_KEY);

module.exports = mailerService;
