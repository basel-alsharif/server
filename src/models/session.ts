import { DataTypes } from 'sequelize';
import { SessionsAttributes } from '../types';
import sequelize from '../db/connection';

const Session = sequelize.define<SessionsAttributes>('session', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

});

export default Session;
