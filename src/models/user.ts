import { DataTypes } from 'sequelize';
import { UsersAttributes } from '../types';
import sequelize from '../db/connection';

const User = sequelize.define<UsersAttributes>('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM,
    values: ['user', 'therapist'],
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default User;
