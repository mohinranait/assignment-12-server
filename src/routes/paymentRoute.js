const { stripePayment } = require("../controllers/PaymentController");

const paymentRoute = require("express").Router();

paymentRoute.post("/create-payment-intent", stripePayment)

module.exports = paymentRoute