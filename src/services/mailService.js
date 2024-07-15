const sgMail = require('@sendgrid/mail');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
      throw new Error('Error sending email: ' + (error.response ? error.response.body.errors.map(e => e.message).join(', ') : error.message));
    }
  }

  async notifyAllAdmins({ subject, text, html }) {
    try {
      // Get all admin users
      const admins = await prisma.admin.findMany();

      // Send an email to each admin
      for (const admin of admins) {
        await this.sendMessage({
          to: admin.email,
          subject,
          text,
          html,
        });
      }

      return true;
      
    } catch (error) {

      throw new Error('Error sending email: ' + (error.response ? error.response.body.errors.map(e => e.message).join(', ') : error.message));
    }
  }

}

const mailerService = new MailerService(process.env.SENDGRID_API_KEY, process.env.SENDGRID_FROM_EMAIL);

module.exports = mailerService;
