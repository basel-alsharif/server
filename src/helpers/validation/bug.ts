import * as yup from 'yup';

const addBugSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  priority: yup.string().required('Priority is required').oneOf(['low', 'medium', 'high']),
});

const updateBugSchema = yup.object().shape({
  id: yup.number().required('Id is required'),
  priority: yup.string().oneOf(['low', 'medium', 'high']),
  status: yup.string().oneOf(['in progress', 'resolved', 'rejected']),
  assignedTo: yup.string(),

});

export { addBugSchema, updateBugSchema };
