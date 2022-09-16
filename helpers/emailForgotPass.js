import nodemailer from "nodemailer";

const emailForgotPass = async (data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    secure: true, // use SSL
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, name, token } = data;

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset your password",
    text: "Reset your password",
    html: `<p>Hello! ${name}, You have requested to reset your password.</p>
    <p> Follow the link below to generate a new password: </p>
    <a href="${process.env.FRONTEND_URL_TOKEN}/new-password/${token}">Restore password<a></p>

    <p> If you did not create this account you can ignore this message </p>
    
    `,
  });
};

export default emailForgotPass;
