import * as Yup from 'yup';

const adminLoginSchema = Yup.object().shape({
  username: Yup.string().min(5).required('user name required'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters long'),
});

const updateTherapistActiveSchema = Yup.object().shape({
  userId: Yup.number().required().integer().positive(),
  active: Yup.boolean().required().oneOf([true, false]),
});

export { adminLoginSchema, updateTherapistActiveSchema };
