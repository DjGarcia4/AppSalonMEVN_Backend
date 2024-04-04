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
    to: "correo@correo.com",
    subject: "Confirma tu cuenta",
    text: "Por favor click en el link de bajo para verificar tu cuenta",
    html: `<p>Hola! ${name}, verifica tu cuenta en AppSalon</p> 
      <p>Tu cuenta esta casi lista, solo debes dar click en el link de abajo.</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account/${token}">Verifica tu cuenta</a>
      <p>Si tu no has creado esta cuenta, ignora este mensaje.</p>
    `,
  });
  console.log("Email enviado: ", info.messageId);
}
