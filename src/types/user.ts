interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber?: string;
  isActive?: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export { IUser };
