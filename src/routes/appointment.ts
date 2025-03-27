import { Router } from 'express';
import { addAppointment, getAppointments, updateAvailable } from '../controllers';
import { RolesForSelect } from '../types';
import { checkAuth } from '../middlewares';

const router = Router();
router.get('/:therapistId', getAppointments);
router.put('/:id', checkAuth(RolesForSelect.therapist), updateAvailable);
router.post('/', checkAuth(RolesForSelect.therapist), addAppointment);

export default router;
