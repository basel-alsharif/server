import Mailgen from 'mailgen';
import { IMailBuilder } from '../types';
import config from '../config';

const generateMail = ({ theme, body }:IMailBuilder) => {
  const mailGenerator = new Mailgen({
    theme: theme || config.THEME as string || 'salted',
    product: {
      name: config.PRODUCTNAME as string,
      link: config.PRODUCTLINK as string,
    },
  });
  const email = {
    body,
  };
  const emailBody = mailGenerator.generate(email);
  const emailText = mailGenerator.generatePlaintext(email);

  return { emailBody, emailText };
};

export default generateMail;
