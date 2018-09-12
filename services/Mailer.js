const sendgrid = require('@sendgrid/mailer');
const helper = sendgrid.mail;
const keys = require('../config/keys');

/**
 * helper.Mail is a Mail class from SendGrid's library.
 */
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    /**
     * TODO: Explain 'where is the email coming from?'
     * TODO: Explain SendGrid helper methods
     * TODO: Research, can this.xxxx be any name we want?
     */
    this.sgApi = sendgrid(keys.sendGridKey); // explain sendgrid object used with api key
    this.from_email = new helper.Email('no-reply@not-real.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    /**
     * TODO: Explain custom helper function
     */
    this.recipients = this.formatAddresses(recipients);

    /**
     * TODO: Explain
     * Add the body content to the Mailer, using SendGrid helper.Mail class
     */
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  /**
   * TODO: Explain what this does -- return an array of emails formatted for SendGrid
   * @param {*} recipients
   */
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  /**
   * TODO: Explain this or point to SendGrid documentation
   */
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  /**
   * TODO: Explain how this is what actually adds the emails to the mailer
   */
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  /**
   * TODO: Explain async/await
   * TODO: Explain emptyRequest config object
   */
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = this.sgApi.API(request); // sends off the request via API function from sendgrid; returns a response
    return response;
  }
}

module.exports = Mailer;
