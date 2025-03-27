import { DataTypes } from 'sequelize';
import { AppointmentsAttributes } from '../types';
import sequelize from '../db/connection';

const Appointment = sequelize.define<AppointmentsAttributes>('appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isBooked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

});

export default Appointment;
