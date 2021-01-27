/* eslint-disable promise/always-return */
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')(
  'sk_test_51HzlLmHwxt8Lx8ITY8fBkdyHtdNAkUOv9KJgPlQeiohfIs7d2wvvCWn8RnHVPrKzn06DoJllPgXFeMNWyjtCvyqr00UMm6PIN5',
);

/**
 * This function is called to process a payment!
 *
 * @see https://stripe.com/docs/api/payment_intents/create
 * @see https://stripe.com/docs/api/payment_intents/confirm
 */
exports.payWithStripe = functions.https.onRequest(async (request, response) => {
  let user_stripe_id = await getStripeUserIdOrCreate(request.body.user);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: (request.body.amount * 100).toFixed(0),
    currency: 'usd',
    customer: user_stripe_id,
    payment_method_types: ['card'],
  });
  console.log(paymentIntent);
  const payment = await stripe.paymentIntents.confirm(paymentIntent.id, {
    payment_method: request.body.token,
  });
  response.send({...payment, statusCode: 200});

  //   stripe.charges
  //     .create({
  //       amount: (request.body.amount * 100).toFixed(0),
  //       currency: 'usd',
  //       source: request.body.token,
  //     })
  //     .then((charge) => {
  //       // asynchronously called
  //       response.send({...charge, statusCode: 200});
  //     })
  //     .catch((err) => {
  //       response.send(err);
  //     });
});
exports.chargeApplePay = functions.https.onRequest(
  async (request, response) => {
    let user_stripe_id = await getStripeUserIdOrCreate(request.body.user);
    const {id} = await stripe.customers.createSource(user_stripe_id, {
      source: request.body.token,
    });

    stripe.charges
      .create({
        amount: (request.body.amount * 100).toFixed(0),
        currency: 'usd',
        source: id,
        customer: user_stripe_id,
      })
      .then((charge) => {
        // asynchronously called
        response.send({charge, statusCode: 200});
      })
      .catch((err) => {
        console.log(err);
      });
  },
);

/**
 * This function is called to retrieve cards associated to a customer
 *
 * @see https://stripe.com/docs/api/payment_methods/list
 */
exports.getCards = functions.https.onRequest(async (request, response) => {
  let user_stripe_id = await getStripeUserIdOrCreate(request.body.user);
  const paymentMethods = await stripe.paymentMethods.list({
    customer: user_stripe_id,
    type: 'card',
  });
  function uniq(a) {
    var seen = {};
    return a.filter((item) => {
      return seen[item.last4 + item.brand]
        ? false
        : (seen[item.last4 + item.brand] = true);
    });
  }
  response.send({
    paymentMethods: {data: uniq(paymentMethods.data)},
    statusCode: 200,
  });
});

/**
 * This function is called to save a card to a customer.
 * It first checks if the user has a stripe  customer id, creates one if needed,
 * then attaches payment method to said stripe customer id
 *
 * @see https://stripe.com/docs/api/cards/create
 */
exports.attachStripeCard = functions.https.onRequest(
  async (request, response) => {
    let user_stripe_id = await getStripeUserIdOrCreate(request.body.user);
    let card_token = request.body.token;
    // Attach card to stripe customer
    const card = await stripe.customers.createSource(user_stripe_id, {
      source: card_token,
    });

    console.log(card);
    // Returns new card
    response.send({card, statusCode: 200});
    //   stripe.charges
    //     .create({
    //       amount: (request.body.amount * 100).toFixed(0),
    //       currency: 'usd',
    //       source: request.body.token,
    //     })
    //     .then((charge) => {
    //       // asynchronously called
    //       response.send({...charge, statusCode: 200});
    //     })
    //     .catch((err) => {
    //       response.send(err);
    //     });
  },
);
/**
 * This function checks if stripe user has been created
 * and creates if needed. This is a internal use function
 * @param {string} dbUserId
 * @see https://firebase.google.com/docs/reference/node/firebase.firestore.QueryDocumentSnapshot
 * @see https://stripe.com/docs/api/customers/create
 */
const getStripeUserIdOrCreate = async (dbUserId) => {
  console.log(dbUserId);
  // get DB user info
  let customer = await admin
    .firestore()
    .collection('users')
    .doc(dbUserId)
    .get()
    .then((doc) => {
      return doc.data();
    });
  // check if stripe id
  if (customer.stripeId) {
    console.log('yeah!');
    //   if yes, return it
    return customer.stripeId;
  } else {
    // if no, create stripe user, save to db and return it
    const {name, email} = customer;
    // create
    const stripeCustomer = await stripe.customers.create({
      email,
      name,
    });
    console.log(stripeCustomer);
    // save to DB
    admin
      .firestore()
      .collection('users')
      .doc(dbUserId)
      .set({...customer, stripeId: stripeCustomer.id})
      .then((res) => console.log('Set success', res))
      .catch((e) => console.log(e));
    // return
    return stripeCustomer.id;
  }
};

// admin
// .firestore()
// .collection('orders')
