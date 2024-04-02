import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
    },
  ],
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  totalToPay: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
