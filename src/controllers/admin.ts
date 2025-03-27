import { Response, NextFunction, Request } from 'express';
import * as yup from 'yup';
import { RequestWithUserRole } from '../types';
import {
  adminLoginSchema, templateErrors, generateToken, updateTherapistActiveSchema,
} from '../helpers';
import {
  generateEmail, getAdmin, getTherapists, mailer, patchTherapist,
} from '../services';
import config from '../config';

const adminLogin = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    await adminLoginSchema.validate({ username, password });
    const admin = await getAdmin(username);

    if (!admin) {
      throw templateErrors.BAD_REQUEST(' wrong username or password');
    }

    if (password !== admin?.password) {
      throw templateErrors.BAD_REQUEST('wrong username or password');
    }

    const payload = {
      role: 'admin',
      adminId: admin.id,
    };

    const token = await generateToken(payload);
    res.json({
      message: 'Login Successfully',
      data: { access_token: token, data: payload },
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return next(templateErrors.BAD_REQUEST(err.message));
    }
    next(err);
  }
};

const getTherapistsForAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, page, active } = req.query;
    const pageNumber = Number(page);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(pageNumber) || pageNumber < 1) {
      throw templateErrors.BAD_REQUEST('Page number should be a valid number');
    }

    if (active !== undefined && active !== 'true' && active !== 'false') {
      throw templateErrors.BAD_REQUEST('Active should be a valid boolean');
    }

    const { therapists, totalPages } = await getTherapists(q as string || '', pageNumber, active as boolean | undefined);

    res.json({
      message: 'Success',
      data: {
        ...therapists,
        pagination: {
          currentPage: pageNumber,
          totalPages,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateTherapistActive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, active } = req.body;
    const therapistId = Number(userId);

    await updateTherapistActiveSchema.validate({ userId, active });

    const therapist = await patchTherapist(therapistId, active);

    if (active) {
      const { emailBody, emailText } = generateEmail({
        theme: 'salted',
        body: {
          name: therapist.fullName,
          intro: 'Congrats 🎉🎉, Your account has been activated. You can now login to your account.',
          action: {
            instructions: 'Click the button below to login to your account.',
            button: {
              color: '#22BC66',
              text: 'Login to your account',
              link: `${config.FRONT_END_URL}/login`,
            },
          },
          outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.',
        },
      });
      mailer({
        to: therapist.email,
        subject: 'Account activated 🎉',
        text: emailText,
        html: emailBody,
      });
    }

    res.json({
      message: 'Success',
      active,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return next(templateErrors.BAD_REQUEST(error.message));
    }
    next(error);
  }
};

export { adminLogin, getTherapistsForAdmin, updateTherapistActive };
