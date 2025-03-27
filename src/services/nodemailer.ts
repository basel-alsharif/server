import nodemailer, { SendMailOptions } from 'nodemailer';
import config from '../config';

const { MAILER: { user, pass }, environment } = config;

const mailer = async (info:SendMailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: environment === 'production',
    auth: {
      user,
      pass,
    },
  });
  const email = await transporter.sendMail({
    ...info,
    from: user,
  });

  return email;
};

export default mailer;
