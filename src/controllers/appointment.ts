import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import {
  getAppointmentsPerDateService,
  getAppointmentById,
  updateIsAvailable,
  addAppointment as addAppointmentService,
} from '../services';
import {
  templateErrors,
  getAppointmentSchema,
  updateAvailableSchema,
  addAppointmentSchema,
} from '../helpers';
import { RequestWithUserRole, TimeRange } from '../types';

const getAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const date = req.query.date as string;
    const { therapistId } = req.params;
    await getAppointmentSchema.validate({ date, therapistId });
    const data = await getAppointmentsPerDateService(therapistId, date);
    if (!data.length) {
      return res.json({
        data,
        message: 'sorry but no appointments found',
      });
    }
    return res.json({
      data,
      message: 'appointment successfully retrieved',
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(templateErrors.BAD_REQUEST(err.message));
    }
    return next(err);
  }
};

const updateAvailable = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userData = req.user;

    const appointmentData = await getAppointmentById(id);
    const isAvailable = appointmentData?.isAvailable;
    if (!appointmentData) {
      throw templateErrors.BAD_REQUEST("appointment doesn't exist");
    }
    const therapistId = userData?.therapistId;
    const data = await updateAvailableSchema.validate({
      therapistId,
      isAvailable,
    });

    if (appointmentData?.therapistId?.toString() !== therapistId?.toString()) {
      throw templateErrors.UNAUTHORIZED('Unauthorized');
    }

    if (appointmentData?.isBooked) {
      throw templateErrors.BAD_REQUEST('this appointment is booked');
    }

    await updateIsAvailable(id, data.isAvailable);
    return res.json({ data: null, message: 'Availability Successfully updated' });
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(templateErrors.BAD_REQUEST(error.message));
    }
    next(error);
  }
};
const addAppointment = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = req.user;
    const { date, time } = req.body;
    const therapistId = userData?.therapistId as string;
    await addAppointmentSchema.validate({ date, time });
    const { from, to } : TimeRange = date;
    const data = await addAppointmentService(
      parseInt(therapistId, 10),
      from,
      to,
      time,
    );
    if (!data.length) {
      throw templateErrors.BAD_REQUEST('Invalid Range');
    }
    return res.status(201).json({ data, message: 'appointments added successfully' });
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(templateErrors.BAD_REQUEST(error.message));
    }
    next(error);
  }
};
export { getAppointments, updateAvailable, addAppointment };
