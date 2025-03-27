import { getTherapistById, getAllTherapist, updateTherapist } from './therapists';
import {
  getAppointmentsPerDateService, getAppointmentById, updateIsAvailable,
  addAppointment,
} from './appointment';
import { loginByEmail, registerTherapist, registerUser } from './auth';
import getClientSecret from './payment';
import bookAppointment from './session';
import { getAdmin, getTherapists, patchTherapist } from './admin';
import createPresignedUrl from './S3Service';
import mailer from './nodemailer';
import generateEmail from './mailBuilder';
import {
  getAllBugs, createBug, updateBug,
} from './bug';

export {
  getTherapistById, getAllTherapist, getAppointmentsPerDateService, getAppointmentById
  , updateIsAvailable, addAppointment, updateTherapist, getClientSecret, bookAppointment, getAdmin,
  createPresignedUrl, mailer, generateEmail, getTherapists,
  loginByEmail, registerTherapist, registerUser, patchTherapist,
  getAllBugs, createBug, updateBug,
};
