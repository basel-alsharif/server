import { Router } from 'express';
import { adminLogin, getTherapistsForAdmin, updateTherapistActive } from '../controllers';
import { checkAuth } from '../middlewares';
import { RolesForSelect } from '../types';

const router = Router();

router.post('/login', adminLogin);
router.get('/therapists', checkAuth(RolesForSelect.admin), getTherapistsForAdmin);
router.patch('/therapists/', checkAuth(RolesForSelect.admin), updateTherapistActive);

export default router;
