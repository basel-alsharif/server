import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey,
} from 'sequelize';

interface UsersAttributes extends Model
<InferAttributes<UsersAttributes>,
InferCreationAttributes<UsersAttributes>> {
  id: CreationOptional<number>,
  fullName: string,
  email: string,
  password: string,
  phoneNumber?: string | undefined,
  role: CreationOptional<string>,
  isActive: CreationOptional<boolean>,
  createdAt?: CreationOptional<Date>,
  updatedAt?: CreationOptional<Date>,
}

interface TherapistAttributes extends Model
<InferAttributes<TherapistAttributes>,
InferCreationAttributes<TherapistAttributes>> {
  id:CreationOptional <number>,
  cvLink: string,
  profileImg: string,
  major: string,
  bio?: string | undefined,
  hourlyRate: number,
  userId?: ForeignKey<UsersAttributes['id']>,
  createdAt?: CreationOptional<Date>,
  updatedAt?: CreationOptional<Date>,
}

interface AppointmentsAttributes extends Model
<InferAttributes<AppointmentsAttributes>,
InferCreationAttributes<AppointmentsAttributes>> {
  id: CreationOptional<number>,
  therapistId?: ForeignKey<TherapistAttributes['id']>,
  datetime: Date,
  isBooked?: CreationOptional<boolean>,
  isAvailable?: CreationOptional<boolean>
}

interface AdminAttributes extends Model
<InferAttributes<AdminAttributes>,
InferCreationAttributes<AdminAttributes>> {
  id: CreationOptional<number>,
  username: string,
  password: string,
  role: string,
  createdAt?: CreationOptional<Date>,
  updatedAt?: CreationOptional<Date>,
}

interface SessionsAttributes extends Model
<InferAttributes<SessionsAttributes>,
InferCreationAttributes<SessionsAttributes>> {
  id: CreationOptional<number>,
  appointmentId?: ForeignKey<AppointmentsAttributes['id']>,
  userId?: ForeignKey<UsersAttributes['id']>,
  createdAt?: CreationOptional<Date>,
  updatedAt?: CreationOptional<Date>,

}

interface BugsAttributes extends Model
<InferAttributes<BugsAttributes>,
InferCreationAttributes<BugsAttributes>> {
  id: CreationOptional<number>,
  title: string,
  description: string,
  priority: string,
  status?: string,
  assignedTo?: string | undefined,
  createdAt?: CreationOptional<Date>,
  updatedAt?: CreationOptional<Date>,
}

export {
  UsersAttributes, TherapistAttributes, AdminAttributes, AppointmentsAttributes, SessionsAttributes,
  BugsAttributes,
};
