require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const stripePayment = async (req, res) => {
    const {price} = req.body;
    const amount = parseFloat(price * 100);

    if(!amount || amount < 1) return;

    try {
        const paymentIntent  = await stripe.paymentIntents.create({
            amount : amount,
            currency : "usd",
            payment_method_types:['card']
        }) 

        res.send({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (error) {
        res.send({
            success: false,
        })
    }
}


module.exports = {
    stripePayment
}