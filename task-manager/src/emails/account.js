const sgMail = require('@sendgrid/mail');
const sendgridAPIKey =
  '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';

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'momensherif.2019@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me how you get along with the app.`
  };

  sgMail.send(msg);
};

const sendCancelationEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'momensherif.2019@gmail.com',
    subject: 'Sorry to see you go',
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`
  };

  sgMail.send(msg);
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
};
