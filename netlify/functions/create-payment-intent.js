// Import backend libraries to work with stripe for serverless function
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    // Make payment intent, currency, payment method, amount (in cents)
    const { amount } = JSON.parse(event.body);
    console.log(amount);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount,
      payment_method_types: ["card"],
    });

    return { statusCode: 200, body: JSON.stringify({ paymentIntent }) };
  } catch (err) {
    console.log({err})
    return { status: 400, body: JSON.stringify({ err })}
  }
};
