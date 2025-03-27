import {
  findTherapistById, getAllTherapists, updateTherapistProfile, updateProfileImg,
} from './therapists';
import { getAppointments, updateAvailable, addAppointment } from './appointment';
import { login, getAuth, register } from './auth';
import createSessionController from './session';
import findClientSecret from './payment';
import s3upload from './s3upload';
import { adminLogin, getTherapistsForAdmin, updateTherapistActive } from './admin';
import {
  getAllBugs, editBug, createNewBug, deleteBug,
} from './bug';

export {
  findTherapistById, getAllTherapists, updateTherapistProfile, getAppointments, updateAvailable,
  getAuth, addAppointment, findClientSecret, createSessionController, updateProfileImg,
  login, s3upload, adminLogin, register, getTherapistsForAdmin, updateTherapistActive,
  getAllBugs, editBug, createNewBug, deleteBug,
};
