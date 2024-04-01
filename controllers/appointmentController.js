import Appointment from "../models/Appointmen.js";

const createAppointment = async (req, res) => {
  const appointment = req.body;
  appointment.user = req.user._id.toString();
  try {
    const newAppointment = new Appointment(appointment);
    await newAppointment.save();
    res.json({
      msg: "Tu reservacion se realizo correctamente!",
    });
  } catch (error) {
    console.log();
  }
};

export { createAppointment };
