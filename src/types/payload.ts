interface Payload {
  fullName?: string;
  phoneNumber?: string;
  major?: string;
  bio?: string;
  cvLink?: string;
  hourlyRate?: number;
}
interface IPayload {
  role: string;
  userId?: number;
  therapistId?: number;
  adminId?: number;
}

export { Payload, IPayload };
