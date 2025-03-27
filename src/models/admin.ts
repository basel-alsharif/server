import { DataTypes } from 'sequelize';
import { AdminAttributes } from '../types';
import sequelize from '../db/connection';

const Admin = sequelize.define<AdminAttributes>('admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default Admin;
