import { NextFunction, Response, Request } from 'express';
import bcrypt from 'bcrypt';
import * as yup from 'yup';
import { userLoginSchema, userRegisterSchema } from '../helpers/validation';
import { templateErrors, generateToken } from '../helpers';
import { Admin, Therapist, User } from '../models';
import {
  TherapistAndUser, IPayload, RolesForSelect, RequestWithUserRole, TherapistWithUserOptional,
} from '../types';
import {
  registerTherapist, registerUser, loginByEmail, mailer, generateEmail,
} from '../services';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    await userLoginSchema.validate({ email, password });

    const user: TherapistAndUser | null = await loginByEmail(email);

    if (!user) {
      throw templateErrors.BAD_REQUEST('Wrong email or password');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw templateErrors.BAD_REQUEST('Wrong email or password');
    }

    if (user && !user.isActive) {
      throw templateErrors.BAD_REQUEST('Your account is not activated yet. Please check your email for activation instructions.');
    }

    const payload: IPayload = {
      role: user.role,
      userId: user.id,
    };

    if (user.role === 'therapist') {
      payload.therapistId = user?.therapist?.id as number;
    }

    const token = await generateToken(payload);

    res.json({
      message: 'User logged in successfully',
      data: { access_token: token },
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return next(templateErrors.BAD_REQUEST(err.message));
    }
    next(err);
  }
};
const getAuth = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction,
) => {
  try {
    let data;
    if (req.user?.role === RolesForSelect.therapist) {
      const therapist:TherapistWithUserOptional | null = await Therapist.findOne({
        attributes: ['profileImg', 'id'],
        where: {
          id: req.user?.therapistId,
        },
        include: {
          model: User,
          attributes: ['fullName', 'role', 'id'],
        },
      });
      if (!therapist) throw templateErrors.NOT_FOUND('Therapist not found');
      const { id, profileImg, user } = therapist;
      if (!user) throw templateErrors.NOT_FOUND('User not found');
      data = { therapistId: id, profileImg, ...user.dataValues };
    } else if (req.user?.role === RolesForSelect.user) {
      const user = await User.findOne({
        attributes: ['fullName', 'role', 'id'],
        where: {
          id: req.user?.userId,
        },
      });
      data = user;
    } else {
      const admin = await Admin.findOne({
        attributes: ['username', 'id', 'role'],
        where: {
          id: req.user?.adminId,
        },
      });
      data = admin;
    }

    res.json({
      msg: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    await userRegisterSchema.validate(body);
    if (body.role === RolesForSelect.therapist) {
      const user = await registerTherapist(body);

      const { emailBody, emailText } = generateEmail({
        theme: 'salted',
        body: {
          name: user.fullName,
          intro: 'Welcome to Ntherapy! We\'re very excited to have you on board. \n we will review your application and get back to you as soon as possible.',
          outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.',
        },
      });

      await mailer({
        to: user.email,
        subject: 'Account Activation',
        text: emailText,
        html: emailBody,
      });

      return res.status(201).json({
        message: 'Therapist registered successfully , please check your email for more details',
      });
    // eslint-disable-next-line no-else-return
    } else {
      await registerUser(body);
      return res.status(201).json({
        message: 'User registered successfully',
      });
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return next(templateErrors.BAD_REQUEST(error.message));
    }
    next(error);
  }
};

export { login, getAuth, register };
