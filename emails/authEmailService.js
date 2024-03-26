import { createTransport } from "../config/nodemailer.js";

export async function SendEmailVerification({ email, name, token }) {
  const transporter = createTransport(
    "sandbox.smtp.mailtrap.io",
    2525,
    "eb8e1ebb967e01",
    "b428132caef912"
  );
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "AppSalon",
    to: email,
    subject: "Confirm  your email address on AppSalon!",
    text: "Please click the following link to verify your account",
    html: `<p>Hi! ${name}, verify your account in AppSalon</p> 
      <p>Your account is almost ready, you just must  confirm it by clicking this button below.</p>
      <a href="http://localhost:4000/api/auth/verify/${token}">Verify your Account</a>
      <p>If you did not create this account, ignore this message.</p>
    `,
  });
  console.log("Email  sent: ", info.messageId);
}
