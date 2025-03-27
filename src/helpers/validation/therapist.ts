import * as yup from 'yup';

const validateOptional = ({ schema }: { schema: yup.AnySchema }) => yup
  .lazy((field: undefined | string) => {
    if (field !== undefined) {
      return schema;
    }
    return yup.string().notRequired();
  });

const therapistInfoSchema = yup.object().noUnknown().shape({
  fullName: validateOptional({ schema: yup.string().min(7).max(35).required() }),
  phoneNumber: validateOptional({ schema: yup.string().min(8).max(12).required() }),
  major: validateOptional({ schema: yup.string().min(10).max(40).required() }),
  bio: validateOptional({ schema: yup.string().max(1000).required() }),
  cvLink: validateOptional({
    schema: yup.string().url().min(20).max(150)
      .required(),
  }),
  hourlyRate: validateOptional({ schema: yup.number().min(3).required() }),
});

export default therapistInfoSchema;
