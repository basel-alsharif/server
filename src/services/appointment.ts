import { Op } from 'sequelize';
import moment from 'moment';
import { Appointment, Therapist, User } from '../models';
import sequelize from '../db/connection';
import { templateErrors } from '../helpers';
import { AddAppointment, Appointment as AppointmentType, TimeRange } from '../types';
import { HOUR_RANGE } from '../config/constants';

const getAppointmentsPerDateService = async (
  therapistId: string,
  date = 'today',
) => {
  const isTherapistFound = await Therapist.findByPk(therapistId, {
    include: [
      {
        model: User,
        attributes: ['fullName', 'isActive', 'email'],
        where: {
          isActive: true,
        },
      },
    ],
  });
  if (!isTherapistFound) {
    throw templateErrors.BAD_REQUEST('therapist not found');
  }
  const appointments = await Appointment.findAll({
    attributes: ['id', 'datetime', 'therapistId', 'isBooked', 'isAvailable'],
    where: {
      [Op.and]: [
        { therapistId },
        sequelize.where(sequelize.fn('date', sequelize.col('datetime')), date),
      ],
    },
  });
  return appointments;
};

const getAppointmentById = async (id: string) => {
  const appointment = await Appointment.findByPk(id);
  return appointment;
};

const updateIsAvailable = async (id: string, isAvailable: boolean) => {
  const afterUpdate = await Appointment.update(
    {
      isAvailable: !isAvailable,
    },
    {
      where: { id },
    },
  );
  return afterUpdate;
};
/*
  @Description This function generates appointments based on the given time ranges.
  @param {AddAppointment} - The appointment data.
  @returns {AppointmentType[]} - An array of appointments.
  {AddAppointment} start - The start date. @type {string}
  {AddAppointment} end - The end date. @type {string}
  {AddAppointment} timeRanges - An array of time ranges. @type {TimeRange[]}
  {AddAppointment} therapistId - The therapist id. @type {number}

  ** all the times are in UTC format.

  */
const generateAppointments = (
  {
    start,
    end,
    timeRanges,
    therapistId,
  }: AddAppointment,
): AppointmentType[] => {
  const startDate = moment.utc(start, 'YYYY-MM-DD');
  const endDate = moment.utc(end, 'YYYY-MM-DD');
  const appointments: AppointmentType[] = [];

  const currentDate = startDate.clone().startOf('day').utc();
  /*
    @Description This loop generates appointments for each day between the start and end date.
    @Input The current date.
    @returns {AppointmentType[]} - An array of appointments.
  */
  while (currentDate.isSameOrBefore(endDate, 'day')) {
    const availableRanges = timeRanges.map((range) => {
      const { from, to } = range;
      const startTime = currentDate.clone().add(from, 'hours');
      const endTime = currentDate.clone().add(to, 'hours');

      if (endTime.isBefore(startTime)) { // handle the case when the end time is in the next day.
        endTime.add(1, 'day');
      }

      return { startTime, endTime };
    });

    availableRanges.forEach(({ startTime, endTime }) => {
      const currentTime = startTime.clone();

      while (currentTime.isBefore(endTime)) {
        appointments.push({
          therapistId,
          datetime: currentTime.clone().toDate(),
        });
        currentTime.add(HOUR_RANGE);
      }
    });

    currentDate.add(1, 'day');
  }

  return appointments;
};

const addAppointment = async (
  therapistId:number,
  startDate:string,
  endDate:string,
  timeRanges:TimeRange[],
) => {
  const appointments = generateAppointments(
    {
      start: startDate,
      end: endDate,
      timeRanges,
      therapistId,
    },
  );

  const appointment = await Appointment.bulkCreate(appointments, {
    returning: true,
  });
  return appointment;
};

export {
  getAppointmentsPerDateService, getAppointmentById, updateIsAvailable, addAppointment,
};
