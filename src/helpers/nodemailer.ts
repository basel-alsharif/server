import nodemailer from 'nodemailer';
import config from '../config';

const { MAILER: { user, pass } } = config;

const mailer = async (memEmail: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },
  });
  const email = await transporter.sendMail({
    from: user,
    to: memEmail,
    subject: 'Hello world',
    text: 'some text',
  });

  return email;
};

export default mailer;
