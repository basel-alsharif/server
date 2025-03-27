import * as Yup from 'yup';

const userRegisterSchema = Yup.object().shape({
  role: Yup.string().required('Role is required').oneOf(['user', 'therapist'], 'Role must be either user or therapist'),
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  major: Yup.string().when('role', {
    is: 'therapist',
    then: (fieldSchema) => fieldSchema.required('Major is required'),
    otherwise: (fieldSchema) => fieldSchema,
  }),
  hourlyRate: Yup.number().when('role', {
    is: 'therapist',
    then: (fieldSchema) => fieldSchema.required('Hourly rate is required'),
    otherwise: (fieldSchema) => fieldSchema,
  }),
  cvLink: Yup.string().when('role', {
    is: 'therapist',
    then: (fieldSchema) => fieldSchema.required('CV link is required'),
    otherwise: (fieldSchema) => fieldSchema,
  }),
  profileImg: Yup.string().when('role', {
    is: 'therapist',
    then: (fieldSchema) => fieldSchema.required('Profile image is required'),
    otherwise: (fieldSchema) => fieldSchema,
  }),
  phoneNumber: Yup.string().when('role', {
    is: 'therapist',
    then: (fieldSchema) => fieldSchema.required('Phone number is required'),
    otherwise: (fieldSchema) => fieldSchema,
  }),
});

export default userRegisterSchema;
