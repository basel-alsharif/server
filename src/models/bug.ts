import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { BugsAttributes } from '../types/models';

const Bug = sequelize.define<BugsAttributes>('bug', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  priority: {
    type: DataTypes.ENUM,
    values: ['low', 'medium', 'high'],
  },
  status: {
    type: DataTypes.ENUM,
    values: ['new', 'in progress', 'resolved', 'rejected'],
    defaultValue: 'new',
  },
  assignedTo: {
    type: DataTypes.STRING,
    defaultValue: 'unassigned',
  },
});

export default Bug;
