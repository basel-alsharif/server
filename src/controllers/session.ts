import { Response, NextFunction } from 'express';
import { RequestWithUserRole, AppointmentWithTherapistOptional } from '../types';
import generateMeeting from '../services/calendar';
import { templateErrors } from '../helpers';
import { bookAppointment } from '../services';
import { User } from '../models';

const createSessionController = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = req.user;
    const { appointmentId } = req.body;

    const appointment: AppointmentWithTherapistOptional
    | null = await bookAppointment(appointmentId);

    const therapistEmail = appointment?.therapist?.user?.email;
    if (!therapistEmail) {
      throw templateErrors.BAD_REQUEST('The Therapist email is not available');
    }
    const user = await User.findOne({
      attributes: ['email'],
      where: { id: userData?.userId },
    });

    const userEmail = user?.email;
    if (!userEmail) {
      throw templateErrors.BAD_REQUEST('The Therapist email is not available');
    }

    await generateMeeting({
      therapistEmail,
      userEmail,
      startDate: new Date(appointment.datetime).toISOString(),
      endDate: new Date(appointment.datetime.getTime() + (60 * 60 * 1000)).toISOString(),
    });

    res.json({
      message: 'Success',
    });
  } catch (error) {
    next(error);
  }
};

export default createSessionController;
