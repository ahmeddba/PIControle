const { createTransport } = require("nodemailer");


const transporter = createTransport({
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = (to, subject, body) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
        text: body,
      },
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      }
    );
  });
};

const sendTemplatedEmail = (to, subject, body) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
        html: body,
      },
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      }
    );
  });
};

module.exports = {
  sendEmail,
  sendTemplatedEmail,
};
