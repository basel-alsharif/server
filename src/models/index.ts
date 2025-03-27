import User from './user';
import Admin from './admin';
import Therapist from './therapist';
import Appointment from './appointment';
import Session from './session';
import Bug from './bug';

User.hasOne(Therapist);
Therapist.belongsTo(User);

Therapist.hasMany(Appointment);
Appointment.belongsTo(Therapist);

Session.belongsTo(Appointment);
Appointment.hasOne(Session);

Session.belongsTo(User);
User.hasMany(Session);

export {
  User, Therapist, Appointment, Admin, Session,
  Bug,
};
