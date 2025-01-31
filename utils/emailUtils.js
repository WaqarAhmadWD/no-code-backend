const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const TOKEN = "1d90d4f0a930d513181341ff9b5999a3";

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};



const sendForgotPasswordEmail = async (email, message) => {
    return await transport
  .sendMail({
    from: sender,
    to: email,
    subject: "Forgot password",
    html: message,
    category: "Integration Test",
  })

};

module.exports = {
  sendForgotPasswordEmail,
};
