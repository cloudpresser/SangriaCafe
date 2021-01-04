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
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import stripe from 'tipsi-stripe'
import { STRIPE_PUBLISHABLE_KEY, MERCHANT_ID } from '../Setup'

export default checkOutModal = (props) => {

    console.log(props)

    const [customerId, setCustID] = useState()
    const [paymentOptionsVisible, togglePaymentOptions] = useState(true)
    const [deliveryAddress, setDeliveryAddress] = useState()
    const [apartmentNumber, setApartmentNumber] = useState()
    const [postalCode, setPostalCode] = useState()
    const [allowed, isAllowed] = useState(false)
    const [complete, isCompleted] = useState(true)
    const [status, currentStatus] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        stripe.setOptions({
            publishableKey: STRIPE_PUBLISHABLE_KEY,
            merchantId: MERCHANT_ID,
        })
        isAllowed(stripe.canMakeNativePayPayments())
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
        if (authUser && authUser.customerId) {
            let customer = await stripe.customers.retrieve(authUser.customerId);
            setCustID(customer)
            console.log(customerId)
        } else {
            let customer = await stripe.customers.create({
                name: authUser.name,
                line1: authUser.address,
                line2: authUser.aptNum,
                city: authUser.city,
                state: authUser.state,
                postalCode: authUser.postalCode,
                email: authUser.email,
            });
            await firestore().collection('users').doc(refId).update({ customerId: customer.id });
            setCustID(customer)
            console.log(customerId)
        }
    }

    deviceCheckoutOption = async () => {
        // await checkIfCurrentCustomer()
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
        await firestore().collection('users').doc(refId).update({ customerId: newToken.id });
        setToken(newToken)
    }

    return (
        <>
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={() => cancelCheckout()}>
                    <View style={styles.modalView}>
                        <KeyboardAvoidingView behavior="position">
                            {props.orderType === 5 ? <View>
                                <Text> Deliver to </Text>
                                <TextInput
                                    placeholder={props.authUser.name}
                                    onChangeText={setDeliveryAddress}
                                    value={deliveryAddress} />
                                <TextInput
                                    placeholder={props.authUser.address}
                                    onChangeText={setDeliveryAddress}
                                    value={deliveryAddress} />
                                <TextInput
                                    placeholder={props.authUser.aptNum}
                                    onChangeText={setApartmentNumber}
                                    value={apartmentNumber} />
                                <TextInput value={'Bronx, NY'} />
                                <TextInput
                                    placeholder={props.authUser.postalCode}
                                    onChangeText={setPostalCode}
                                    value={postalCode} />
                            </View>
                                :
                                <Text>Order for PickUp</Text>}
                            {paymentOptionsVisible ? (
                                <View style={styles.modalMenuItems}>
                                    <Button
                                        color="tomato"
                                        onPress={() => deviceCheckoutOption()}>
                                        {Platform === 'android' ?
                                            'Android Pay' : 'Pay'}
                                    </Button>
                                    <Button
                                        color="tomato"
                                        onPress={() => console.log('GET stripe customer')}>
                                        Saved Card
                                        </Button>
                                    <Button
                                        color="tomato"
                                        onPress={() => newCardCheckoutOption()}>
                                        New Card
                                        </Button>
                                </View>
                            ) : null}
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </>
    )
};

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
    modalView: {
        width: screen.width,
        padding: 10
    },
    modalMenuItems: {
        margin: 10,
        alignItems: 'center',
        borderRadius: 5
    },
    tokenWord: {
        fontSize: 24,
    },
});
