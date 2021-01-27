import React, {useState, useEffect} from 'react';

import {
  Text,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {Button, List, Title} from 'react-native-paper';
import stripe from 'tipsi-stripe';
import {MERCHANT_ID, STRIPE_PUBLISHABLE_KEY, functionsUrl} from '../../Setup';
export default function CreditCards({
  refId,
  authUser,
  deviceCheckoutOption,
  back,
  total,
  deliveryFee,
  subtotal,
  tip,
  salesTax,
  printToKitchen,
}) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const newCardCheckoutOption = async () => {
    const options = {
      smsAutofillDisabled: true,
      requiredBillingAddressFields: 'full',
      prefilledInformation: {
        billingAddress: {
          name: authUser.name,
          line1: authUser.address,
          line2: authUser.aptNum,
          city: authUser.city,
          state: authUser.state,
          postalCode: authUser.postalCode,
          email: authUser.email,
        },
      },
    };
    const {tokenId} = await stripe.paymentRequestWithCardForm(options);
    // stripe.paymentRequestWithCardForm returns => {"card": {"addressCity": "Rocky mount", "addressCountry": "US", "addressLine1": "560 fenner road", "addressLine2": "", "addressState": "North carolina", "addressZip": "27804", "brand": "Visa", "cardId": "card_1IDBO2Hwxt8Lx8IT4Q8JOG5H", "country": "US", "expMonth": 12, "expYear": 2022, "funding": "credit", "isApplePayCard": false, "last4": "4242", "name": "Luiz Ozorio"}, "created": 1611505467, "livemode": false, "tokenId": "tok_1IDBO3Hwxt8Lx8ITJtJzFZYT"}
    addCardToUser(tokenId);
  };
  const addCardToUser = async (cardToken) => {
    //   passing token in because setState is async, we want to make sure token is available
    console.log('processing new card with options: \n\n', {
      user: refId,
      token: cardToken,
    });
    fetch(functionsUrl +'/attachStripeCard', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: refId,
        token: cardToken,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        getPaymentMethods();
        if (responseJson.statusCode !== 200) {
          Alert.alert(responseJson.raw.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getPaymentMethods = () => {
    fetch(functionsUrl +'/getCards', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: refId,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setCards(responseJson.paymentMethods.data);
        if (responseJson.statusCode !== 200) {
          Alert.alert(responseJson.raw.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const makePayment = async (cardToken) => {
    setLoading(true);
    //   passing token in because setState is async, we want to make sure token is available
    console.log('processing payment with options: \n\n', {
      amount: (total + tip).toFixed(2),
      currency: 'usd',
      token: cardToken,
      user: refId,
    });
    fetch(functionsUrl +'/payWithStripe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: (total + tip).toFixed(2),
        currency: 'usd',
        token: cardToken,
        user: refId,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.statusCode !== 200) {
          Alert.alert(responseJson.raw.message);
        } else {
          printToKitchen();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // stripe.setOptions({
    //   publishableKey: STRIPE_PUBLISHABLE_KEY,
    //   merchantId: MERCHANT_ID,
    // });
    getPaymentMethods();
  }, []);

  return (
    <>
      <Title style={{alignSelf: 'center', color: 'tomato'}}>My Cards</Title>
      {loading === true ? (
        <ActivityIndicator
          color="tomato"
          size="large"
          style={{marginVertical: 60}}
        />
      ) : cards.length == 0 ? (
        <Title style={{alignSelf: 'center', fontSize: 15, marginTop: 40}}>
          No saved cards, press new card
        </Title>
      ) : (
        <FlatList
          data={cards}
          style={{
            height: screen.height / 4,
          }}
          //   contentContainerStyle={{alignItems: 'center'}}
          renderItem={({item}) => {
            let {card} = item;
            console.log(item);
            return (
              <TouchableOpacity onPress={() => makePayment(item.id)}>
                <List.Item
                  title={`${card.brand
                    .charAt(0)
                    .toUpperCase()}${card.brand.slice(1)} ending in: ${
                    card.last4
                  }`}
                  left={(props) => (
                    <Image
                      source={require('../images/card.png')}
                      style={{
                        height: 30,
                        width: 30,
                        alignSelf: 'center',
                        marginLeft: 60,
                        marginRight: 20,
                        marginVertical: 5,
                      }}
                    />
                  )}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
      <View style={{padding: 20}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text>Subtotal:</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text>Delivery Fee:</Text>
          <Text>{deliveryFee === 0 ? 'FREE' : '$' + 1.99}</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text>Tax:</Text>
          <Text>${salesTax.toFixed(2)}</Text>
        </View>
        {tip > 0 ? (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text>Tip:</Text>
            <Text>${tip.toFixed(2)}</Text>
          </View>
        ) : null}
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text>Total:</Text>
          <Text>${(total + tip).toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.paymentOptionContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Button
            labelStyle={{
              color: 'white',
              fontSize: 12,
            }}
            width={screen.width / 3.5}
            mode="contained"
            color="tomato"
            onPress={() => deviceCheckoutOption()}>
            {Platform.OS === 'ios' ? '' : 'ANDROID'} PAY
          </Button>
          <Button
            labelStyle={{
              color: 'white',
              fontSize: 12,
            }}
            width={screen.width / 3.5}
            mode="contained"
            color="tomato"
            onPress={() => newCardCheckoutOption()}>
            New CARD
          </Button>
        </View>
        <View>
          <Button color="tomato" onPress={() => back()}>
            Back
          </Button>
        </View>
      </View>
    </>
  );
}
const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  modalView: {
    height: screen.height,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalMenuItems: {
    alignItems: 'center',
    borderRadius: 5,
  },
  tokenWord: {
    fontSize: 24,
  },
  paymentOptionContainer: {},
});
