import { log } from 'console';
import sequelize from './connection';

import {
  Users, Therapists, Sessions, Appointments, Admins,
  Bugs,
} from './fakeData';

import {
  User, Therapist, Admin, Appointment, Session,
} from '../models';
import Bug from '../models/bug';

const buildDB = async () => {
  log('Building database...');
  await sequelize.sync({ force: true });
  log('Database built');
  await Admin.bulkCreate(Admins);
  log('Admins created');
  await User.bulkCreate(Users);
  log('Users created');
  await Therapist.bulkCreate(Therapists);
  log('Therapists created');
  await Appointment.bulkCreate(Appointments);
  log('Appointments created');
  await Session.bulkCreate(Sessions);
  log('Sessions created');
  await Bug.bulkCreate(Bugs);
  log('Bugs created');
  if (process.env.BUILD) {
    process.exit();
  }
};
if (process.env.BUILD) {
  buildDB();
}
export default buildDB;
