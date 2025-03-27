import { templateErrors } from '../helpers';
import { Appointment, Therapist, User } from '../models';

const bookAppointment = async (appointmentId: number) => {
  const appointment = await Appointment.findOne({
    where: {
      id: appointmentId,
      isAvailable: true,
      isBooked: false,
    },
    include: [
      {
        model: Therapist,
        include: [
          {
            model: User,
            attributes: ['email'],
          },
        ],
      },
    ],
  });

  if (!appointment) {
    throw templateErrors.BAD_REQUEST('The requested appointment is not available.');
  }

  appointment.isBooked = true;
  await appointment.save();

  return appointment;
};

export default bookAppointment;
