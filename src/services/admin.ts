import { Op } from 'sequelize';
import { THERAPISTS_LIMIT } from '../config/constants';
import { Admin, Therapist, User } from '../models';
import { templateErrors } from '../helpers';

const getAdmin = async (userName: string) => {
  const admin = await Admin.findOne({ where: { username: userName } });
  return admin;
};

const getTherapists = async (name: string, page: number, active?: boolean) => {
  const offset = (page - 1) * THERAPISTS_LIMIT;

  const whereCondition = {
    isActive: active,
    fullName: {
      [Op.iLike]: `%${name}%`,
    },
  };

  if (active === undefined) {
    delete whereCondition.isActive;
  }

  const therapists = await Therapist.findAndCountAll({
    include: [
      {
        model: User,
        attributes: ['fullName', 'isActive', 'email', 'phoneNumber'],
        where: whereCondition,
      },
    ],
    attributes: ['profileImg', 'major', 'hourlyRate', 'userId', 'cvLink'],
    limit: THERAPISTS_LIMIT,
    offset,
    order: [[User, 'createdAt', 'DESC']],
  });

  return {
    therapists,
    totalPages: Math.ceil(therapists.count / THERAPISTS_LIMIT),
  };
};

const patchTherapist = async (id: number, active: boolean) => {
  const therapist = await Therapist.findOne({ where: { userId: id } });

  if (!therapist) {
    throw templateErrors.NOT_FOUND('Therapist not found');
  }

  const user = await User.findOne({ where: { id } });

  if (user?.isActive === active) {
    throw templateErrors.BAD_REQUEST(`Therapist isActive property is already ${active}`);
  }

  if (user?.isActive === undefined) {
    throw templateErrors.BAD_REQUEST('Therapist isActive property is not defined');
  }

  user.isActive = active;
  await user?.save({ fields: ['isActive'] });
  const { email, fullName } = user;
  return { email, fullName };
};

export { getAdmin, getTherapists, patchTherapist };
