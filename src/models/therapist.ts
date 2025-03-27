import { DataTypes } from 'sequelize';
import { TherapistAttributes } from '../types/index';

import sequelize from '../db/connection';

const Therapist = sequelize.define<TherapistAttributes>('therapist', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cvLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImg: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  major: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  hourlyRate: {
    type: DataTypes.FLOAT,
  },
});

export default Therapist;
