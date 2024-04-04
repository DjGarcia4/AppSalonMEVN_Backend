import { createTransport } from "../config/nodemailer.js";

export async function SendEmailAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "AppSalon <citas@appsalon.com>",
    to: "admin@appsalon.com",
    subject: "Nueva Cita",
    text: "Hola admin, tienes una nueva cita.",
    html: `<p>Hola admin, tienes una nueva ciata.</p> 
      <p>La cita sera el dia:${date} a las ${time} horas.</p>
    `,
  });
  console.log("Email  sent: ", info.messageId);
}
export async function SendEmailUpdateAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "AppSalon <citas@appsalon.com>",
    to: "admin@appsalon.com",
    subject: "Cita Actualizada",
    text: "Hola admin, una cita fue actualizada.",
    html: `<p>Hola admin, tienes una cita actualizada.</p> 
      <p>La cita ahora sera el dia:${date} a las ${time} horas.</p>
    `,
  });
  console.log("Email  sent: ", info.messageId);
}
export async function SendEmailDeleteAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "AppSalon <citas@appsalon.com>",
    to: "admin@appsalon.com",
    subject: "Cita Cancelada",
    text: "Hola admin, una cita fue cancelada.",
    html: `<p>Hola admin, una cita fue cancelada.</p> 
      <p>La cita del dia:${date} a las ${time} horas fue cancelada.</p>
    `,
  });
  console.log("Email  sent: ", info.messageId);
}
