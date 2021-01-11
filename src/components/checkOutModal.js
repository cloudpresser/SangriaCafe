import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import stripe from 'tipsi-stripe'
import { STRIPE_PUBLISHABLE_KEY, MERCHANT_ID } from '../../Setup'
import { WebView } from 'react-native-webview'

export default checkOutModal = (props) => {
    const [paymentOptionsVisible, togglePaymentOptions] = useState(false)
    const [customerId, setCustID] = useState()

    const [deliveryAddress, setDeliveryAddress] = useState()
    const [apartmentNumber, setApartmentNumber] = useState()
    const [postalCode, setPostalCode] = useState()

    const [response, setResponse] = useState()
    const [paymentStatus, setPaymentStatus] = useState('')
    const [complete, isCompleted] = useState(true)
    const [status, currentStatus] = useState(null)
    const [token, setToken] = useState(null)

    // const onCheckStatus = async (paymentResponse) => {

    // }

    // const htmlContent = `
    //     <h1>Card Page</h1>
    // `;

    // const injectedJavaScript = `(function(){
    //     window.postMessage = function(data){
    //         window.ReactNativeWebView.postMessage(data);
    //     };
    // })()`;

    // const onMessage = (event) => {
    //     const { data } = event.nativeEvent;
    //     console.log(data)
    // }

    useEffect(() => {
        stripe.setOptions({
            publishableKey: STRIPE_PUBLISHABLE_KEY,
            merchantId: MERCHANT_ID,
        })
        setDeliveryAddress(props.authUser.address)
        setApartmentNumber(props.authUser.aptNum)
        setPostalCode(props.authUser.postalCode)
        console.log(token)
    }, []);

    cancelCheckout = () => {
        props.setModalVisible(false);
    }

    makePayment = async () => {
        fetch('http://localhost:5001/sangriacafe/us-central1/payWithStripe', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: props.total + props.tip * 100,
                currency: "usd",
                token: token
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });;
    }

    checkIfCurrentCustomer = async () => {
        if (props.authUser && props.authUser.customerId) {
            let customer = await stripe.customers.retrieve(props.authUser.customerId);
            setCustID(customer)
            console.log(customerId)
        } else {
            let customer = await stripe.customers.create({
                name: props.authUser.name,
                line1: props.authUser.address,
                line2: props.authUser.aptNum,
                city: props.authUser.city,
                state: props.authUser.state,
                postalCode: props.authUser.postalCode,
                email: props.authUser.email,
            });
            await firestore().collection('users').doc(refId).update({ customerId: customer.id });
            setCustID(customer)
            console.log(customerId)
        }
    }

    deviceCheckoutOption = async () => {
        try {
            const items = [{
                label: 'SNGRIA CFE',
                amount: (parseFloat(props.total) + parseFloat(props.tip)).toFixed(2)
            }]
            const options = {
                requiredBillingAddressFields: ['all'],
                requiredShippingAddressFields: ['phone', 'postal_address'],
            }
            const newToken = await stripe.paymentRequestWithApplePay(items, options)
            setToken(newToken)
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }

    newCardCheckoutOption = async () => {
        const options = {
            smsAutofillDisabled: true,
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
                billingAddress: {
                    name: props.authUser.name,
                    line1: props.authUser.address,
                    line2: props.authUser.aptNum,
                    city: props.authUser.city,
                    state: props.authUser.state,
                    postalCode: props.authUser.postalCode,
                    email: props.authUser.email,
                }
            }
        }
        const newToken = await stripe.paymentRequestWithCardForm(options)
        setToken(newToken)
    }

    return (
        <>
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={() => cancelCheckout()}>
                    <View style={styles.modalView}>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
                            <KeyboardAvoidingView behavior="position">
                                {props.orderType === 5 ?
                                    <View>
                                        <Text style={{ margin: 5, fontWeight: 'bold' }}> Deliver to </Text>
                                        <TextInput
                                            mode='outlined'
                                            label='Street Address'
                                            onChangeText={setDeliveryAddress}
                                            value={deliveryAddress} />
                                        <TextInput
                                            mode='outlined'
                                            label='Apt Number'
                                            onChangeText={setApartmentNumber}
                                            value={apartmentNumber} />
                                        <TextInput mode='outlined' label='City, State' value={'Bronx, NY'} />
                                        <TextInput
                                            mode='outlined'
                                            label='Zip Code'
                                            onChangeText={setPostalCode}
                                            value={postalCode} />
                                    </View>
                                    : <Text style={{ margin: 5, fontWeight: 'bold' }}>Order for PickUp</Text>
                                }
                                <View>
                                    <View style={{ padding: 20 }}>
                                        <View
                                            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text>Subtotal:</Text>
                                            <Text>${props.subtotal.toFixed(2)}</Text>
                                        </View>
                                        <View
                                            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text>Delivery Fee:</Text>
                                            <Text>{props.deliveryFee === 0 ? 'FREE' : '$' + 1.99}</Text>
                                        </View>
                                        <View
                                            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text>Tax:</Text>
                                            <Text>${props.salesTax.toFixed(2)}</Text>
                                        </View>
                                        {props.tip > 0 ? (<View
                                            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text>Tip:</Text>
                                            <Text>${props.tip.toFixed(2)}</Text>
                                        </View>) : null}
                                        <View
                                            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text>Total:</Text>
                                            <Text>${(props.total + props.tip).toFixed(2)}</Text>
                                        </View>
                                    </View>
                                    {paymentOptionsVisible ? null :
                                        <Button
                                            color="tomato"
                                            onPress={() => togglePaymentOptions(true)}>
                                            Payment Options
                                        </Button>}
                                </View>
                            </KeyboardAvoidingView>
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
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <Button
                                            labelStyle={{
                                                color: "white",
                                                fontSize: 12,
                                            }}
                                            width={screen.width / 3.5}
                                            mode='contained'
                                            color="tomato"
                                            onPress={() => deviceCheckoutOption()}
                                        >
                                            {Platform.OS === 'ios' ? '' : 'ANDROID'} PAY
                                    </Button>
                                        {props.authUser.customerId ? <Button
                                            labelStyle={{
                                                color: "white",
                                                fontSize: 12,
                                            }}
                                            width={screen.width / 3.5}
                                            mode='contained'
                                            color="tomato"
                                            onPress={console.log('HOW TO SAVE A CARD?')}>
                                            SAVED CARD
                                    </Button> : null}
                                        <Button
                                            labelStyle={{
                                                color: "white",
                                                fontSize: 12,
                                            }}
                                            width={screen.width / 3.5}
                                            mode='contained'
                                            color="tomato"
                                            onPress={() => newCardCheckoutOption()}>
                                            NEW CARD
                                    </Button>
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
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </>
    )
};

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
        borderRadius: 5
    },
    tokenWord: {
        fontSize: 24,
    },
    paymentOptionContainer: {

    }
});
