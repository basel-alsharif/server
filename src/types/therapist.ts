import { Op } from 'sequelize';
import { AppointmentsAttributes, TherapistAttributes, UsersAttributes } from './models';

interface TherapistWithUserOptional extends TherapistAttributes {
  user?: UsersAttributes,
}

interface AppointmentWithTherapistOptional extends AppointmentsAttributes {
  therapist?: TherapistWithUserOptional,
}

interface Imeeting {
  therapistEmail: string,
  userEmail: string,
  startDate: string,
  endDate: string,
}

interface Appointment {
  therapistId: number;
  datetime: Date;
}

interface TimeRange {
  from: string;
  to: string;
}

interface AddAppointment {
  start: string,
  end: string,
  timeRanges: TimeRange[],
  therapistId: number,
}

interface TherapistAndUser extends UsersAttributes {
  therapist?:TherapistAttributes
}

interface PriceFilter {
  hourlyRate?: {
    [Op.between]?: [string, string];
    [Op.gte]?: string;
    [Op.lte]?: string;
  };
}

interface ITherapist {
  fullName: string;
  email: string;
  password: string;
  cvLink: string;
  profileImg: string;
  major: string;
  hourlyRate: number;
  role: string;
  phoneNumber: string;
}

export {
  TherapistWithUserOptional, Imeeting, Appointment,
  TimeRange, AddAppointment, AppointmentWithTherapistOptional, TherapistAndUser, ITherapist,
  PriceFilter,
};
