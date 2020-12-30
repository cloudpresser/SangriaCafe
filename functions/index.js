/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_51HzlLmHwxt8Lx8ITY8fBkdyHtdNAkUOv9KJgPlQeiohfIs7d2wvvCWn8RnHVPrKzn06DoJllPgXFeMNWyjtCvyqr00UMm6PIN5');
// http://localhost:5001/sangriacafe/us-central1/payWithStripe

exports.payWithStripe = functions.https.onRequest((request, response) => {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys

    // eslint-disable-next-line promise/catch-or-return
    stripe.charges.create({
        amount: request.body.amount,
        currency: 'usd',
        source: request.body.token,
    }).then((charge) => {
        // asynchronously called
        response.send(charge);
    })
        .catch(err => {
            console.log(err);
        });

});