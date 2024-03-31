import { createTransport } from "../config/nodemailer.js";

export async function SendEmailVerification({ email, name, token }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "AppSalon <cuentas@appsalon.com>",
    to: email,
    subject: "Confirm  your email address on AppSalon!",
    text: "Please click the following link to verify your account",
    html: `<p>Hi! ${name}, verify your account in AppSalon</p> 
      <p>Your account is almost ready, you just must  confirm it by clicking this button below.</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account/${token}">Verify your Account</a>
      <p>If you did not create this account, ignore this message.</p>
    `,
  });
  console.log("Email  sent: ", info.messageId);
}
