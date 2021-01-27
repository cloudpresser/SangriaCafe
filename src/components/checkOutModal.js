import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import stripe from 'tipsi-stripe';
import {STRIPE_PUBLISHABLE_KEY, MERCHANT_ID, functionsUrl} from '../../Setup';
import {WebView} from 'react-native-webview';
import auth from '@react-native-firebase/auth';
import PaymentCardModal from './creditCards';
import CreditCards from './creditCards';

export default function CheckOutModal(props) {
  const [paymentOptionsVisible, togglePaymentOptions] = useState(false);
  //   This will only exist on backend
  //   const [customerId, setCustID] = useState();

  const [deliveryAddress, setDeliveryAddress] = useState();
  const [apartmentNumber, setApartmentNumber] = useState();
  const [postalCode, setPostalCode] = useState();

  //   const [response, setResponse] = useState();
  //   const [paymentStatus, setPaymentStatus] = useState('');
  //   const [complete, isCompleted] = useState(true);
  //   const [status, currentStatus] = useState(null);
  //   const [token, setToken] = useState(null);
  const [selectCardsVisible, setSelectCardsVisible] = useState(false);

  // Handlers
  const cancelCheckout = () => {
    props.setModalVisible(false);
  };
  const newCardCheckoutOption = async () => {
    setSelectCardsVisible(true);
  };

  // Set-Up
  useEffect(() => {
    setDeliveryAddress(props.authUser.address);
    setApartmentNumber(props.authUser.aptNum);
    setPostalCode(props.authUser.postalCode);
  }, []);

  //   Payment Functions
  const deviceCheckoutOption = async () => {
    try {
      const items = [
        {
          label: 'SNGRIA CFE',
          amount: (parseFloat(props.total) + parseFloat(props.tip)).toFixed(2),
        },
      ];
      const options = {
        requiredBillingAddressFields: ['all'],
        requiredShippingAddressFields: ['phone', 'postal_address'],
      };
      const {tokenId} = await await stripe.paymentRequestWithNativePay(
        options,
        items,
      );

      //   setToken(tokenId);
      console.log('success', tokenId);
      makeNativePayment(tokenId)
        .catch((e) => {
          stripe.cancelNativePayRequest();
          Alert.alert(e);
        });
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
  const makeNativePayment = async (cardToken) => {
    //   passing token in because setState is async, we want to make sure token is available
    console.log('processing payment with options: \n\n', {
      amount: (props.total + props.tip).toFixed(2),
      currency: 'usd',
      token: cardToken,
      user: props.refId,
    });
    await fetch(functionsUrl +'/chargeApplePay', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: (props.total + props.tip).toFixed(2),
        currency: 'usd',
        token: cardToken,
        user: props.refId,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson',responseJson);
        if (responseJson.statusCode !== 200) {
          throw responseJson.raw.message;
        } else {
          stripe.completeNativePayRequest();
          printToKitchen();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const printToKitchen = () => {
    const cart = props.foodCart;
    const total = (props.total + props.tip).toFixed(2);
    console.log({cart, total});
    props.storeOrder(new Date().toLocaleString(), {street: deliveryAddress, postalCode}, total , cart)
    cancelCheckout();
    props.clearCart();
    setTimeout(() => {
      Alert.alert('Payment successful!');
    }, 1000);
    //   Call aldelo with the cart
  };
  useEffect(() => {
    stripe.setOptions({
      publishableKey: STRIPE_PUBLISHABLE_KEY,
      merchantId: MERCHANT_ID,
    });
  }, []);

  return (
    <>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={() => cancelCheckout()}>
          <View style={styles.modalView}>
            <View
              style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
              <KeyboardAvoidingView behavior="position">
                {selectCardsVisible ? (
                  <CreditCards
                    authUser={props.authUser}
                    refId={props.refId}
                    back={() => setSelectCardsVisible(false)}
                    deviceCheckoutOption={deviceCheckoutOption}
                    total={props.total}
                    tip={props.tip}
                    deliveryFee={props.deliveryFee}
                    subtotal={props.subtotal}
                    salesTax={props.salesTax}
                    printToKitchen={printToKitchen}
                  />
                ) : (
                  <>
                    {props.orderType === 5 ? (
                      <View>
                        <Text style={{margin: 5, fontWeight: 'bold'}}>
                          {' '}
                          Deliver to{' '}
                        </Text>
                        <TextInput
                          mode="outlined"
                          label="Street Address"
                          onChangeText={setDeliveryAddress}
                          value={deliveryAddress}
                        />
                        <TextInput
                          mode="outlined"
                          label="Apt Number"
                          onChangeText={setApartmentNumber}
                          value={apartmentNumber}
                        />
                        <TextInput
                          mode="outlined"
                          label="City, State"
                          value={'Bronx, NY'}
                        />
                        <TextInput
                          mode="outlined"
                          label="Zip Code"
                          onChangeText={setPostalCode}
                          value={postalCode}
                        />
                      </View>
                    ) : (
                      <Text style={{margin: 5, fontWeight: 'bold'}}>
                        Order for PickUp
                      </Text>
                    )}
                    <View>
                      <View style={{padding: 20}}>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <Text>Subtotal:</Text>
                          <Text>${props.subtotal.toFixed(2)}</Text>
                        </View>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <Text>Delivery Fee:</Text>
                          <Text>
                            {props.deliveryFee === 0 ? 'FREE' : '$' + 1.99}
                          </Text>
                        </View>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <Text>Tax:</Text>
                          <Text>${props.salesTax.toFixed(2)}</Text>
                        </View>
                        {props.tip > 0 ? (
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <Text>Tip:</Text>
                            <Text>${props.tip.toFixed(2)}</Text>
                          </View>
                        ) : null}
                        <View
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <Text>Total:</Text>
                          <Text>${(props.total + props.tip).toFixed(2)}</Text>
                        </View>
                      </View>
                      {paymentOptionsVisible ? null : (
                        <Button
                          color="tomato"
                          onPress={() => togglePaymentOptions(true)}>
                          Payment Options
                        </Button>
                      )}
                    </View>
                    {paymentOptionsVisible ? (
                      // <WebView
                      //     javaScriptEnabled={true}
                      //     style={{ flex: 1 }}
                      //     originWhitelist={['*']}
                      //     source={{ html: htmlContent }}
                      //     injectedJavaScript={injectedJavaScript}
                      //     onMessage={onMessage}
                      // />
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
                          {selectCardsVisible ? (
                            <Button
                              labelStyle={{
                                color: 'white',
                                fontSize: 12,
                              }}
                              width={screen.width / 3.5}
                              mode="contained"
                              color="tomato"
                              onPress={console.log('HOW TO SAVE A CARD?')}>
                              New CARD
                            </Button>
                          ) : (
                            <Button
                              labelStyle={{
                                color: 'white',
                                fontSize: 12,
                              }}
                              width={screen.width / 3.5}
                              mode="contained"
                              color="tomato"
                              onPress={() => newCardCheckoutOption()}>
                              card
                            </Button>
                          )}
                        </View>
                        <View>
                          <Button
                            color="tomato"
                            onPress={() => togglePaymentOptions(false)}>
                            Hide
                          </Button>
                        </View>
                      </View>
                    ) : null}
                  </>
                )}
              </KeyboardAvoidingView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
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
