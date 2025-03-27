import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import {
  getTherapistById, getAllTherapist, updateTherapist, createPresignedUrl,
} from '../services';
import { templateErrors, therapistInfoSchema } from '../helpers';
import { TherapistWithUserOptional, RequestWithUserRole } from '../types';

const findTherapistById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    if (!parseInt(id, 10)) {
      throw templateErrors.BAD_REQUEST('id should be number');
    }
    const data: TherapistWithUserOptional | null = await getTherapistById(id);
    if (!data?.user?.isActive) {
      throw templateErrors.NOT_FOUND('therapist not found');
    }
    if (data) {
      res.json({ data, message: 'success therapist data' });
    } else {
      throw templateErrors.NOT_FOUND('Therapist not found');
    }
  } catch (error) {
    next(error);
  }
};

const getAllTherapists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      q, page, minPrice, maxPrice,
    } = req.query;
    const pageNumber = Number(page);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(pageNumber) || pageNumber < 1) {
      throw templateErrors.BAD_REQUEST('Page number should be a valid number');
    }

    const { therapists, totalPages } = await getAllTherapist(q as string || '', pageNumber, minPrice as string, maxPrice as string);

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

const updateTherapistProfile = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req;

    const { body } = req;
    const data = await therapistInfoSchema.validate(body);
    const { isTherapistUpdated, isUserUpdated } = await updateTherapist(
      data,
      Number(user?.therapistId),
      Number(user?.userId),
    );

    if (isTherapistUpdated || isUserUpdated) {
      return res.json({ data: null, message: 'Successfully updated' });
    }
    res.json({ data: null, message: 'No Records Updated' });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return next(templateErrors.BAD_REQUEST(error.message));
    }
    next(error);
  }
};

const updateProfileImg = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req;
    const therapist = await getTherapistById(user?.therapistId as string);
    const profileImgKey = therapist?.profileImg?.split('/')[3];
    const url = await createPresignedUrl(profileImgKey as string);
    res.json({
      data: {
        url,
        message: 'the link will expire within 60s',

      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  findTherapistById, getAllTherapists, updateTherapistProfile, updateProfileImg,
};
