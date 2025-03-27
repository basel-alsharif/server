import { Request } from 'express';

interface Decode {
  adminId?: string;
  userId?: string;
  therapistId?: string;
  role: string
}
interface RequestWithUserRole extends Request {
  user?: Decode,
}

type Roles = 'user' | 'therapist' | 'admin';

enum RolesForSelect {
  user = 'user',
  admin = 'admin',
  therapist = 'therapist',
}

export {
  Decode, RequestWithUserRole, RolesForSelect, Roles,
};
