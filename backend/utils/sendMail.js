const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="background-color: #B66E41; padding: 20px; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to NexVendor!</h1>
      </div>
      <div style="padding: 30px; background-color: #fff;">
        <p style="font-size: 16px; color: #333;">
          Hello <strong>${options.name}</strong>,
        </p>
        <p style="font-size: 16px; color: #333;">
          Thank you for registering. To activate your account, please click the button below:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${
            options.activationUrl
          }" target="_blank" style="background-color: #FF6F00; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; display: inline-block;">
            Activate Now
          </a>
        </div>
        <p style="font-size: 14px; color: #666;">
          If you did not create this account, you can safely ignore this email.
        </p>
      </div>
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #999;">
        &copy; ${new Date().getFullYear()} NexVendor. All rights reserved.
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
