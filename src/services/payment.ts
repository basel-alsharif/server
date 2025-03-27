import Stripe from 'stripe';
import config from '../config';
import { User } from '../models';

const apiKey = config.API_KEY;
const stripeInstance = new Stripe(apiKey as string, {
  apiVersion: '2022-11-15',
});

const getClientSecret = async (session_price: number, userId: string | undefined) => {
  const user = await User.findByPk(userId, {
    attributes: ['email'],
  });
  const userEmail = user?.email;
  const paymentIntent = await stripeInstance.paymentIntents.create({
    amount: session_price * 100,
    currency: 'usd',
    payment_method_types: ['card'],
    receipt_email: userEmail,
  });

  return paymentIntent;
};

export default getClientSecret;
