import { Router } from 'express';
import { checkAuth } from '../middlewares';
import { RolesForSelect } from '../types';
import {
  getAllBugs, createNewBug, editBug, deleteBug,
} from '../controllers';

const router = Router();

router.get('/', checkAuth(RolesForSelect.admin), getAllBugs);
router.post('/', createNewBug);
router.patch('/', checkAuth(RolesForSelect.admin), editBug);
router.delete('/:id', checkAuth(RolesForSelect.admin), deleteBug);

export default router;
