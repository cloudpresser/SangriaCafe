import { useTheme } from '@react-navigation/native';
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
    const [customerId, setCustID] = useState()
    const [paymentOptionsVisible, togglePaymentOptions] = useState(true)
    const [deliveryAddress, setDeliveryAddress] = useState()
    const [apartmentNumber, setApartmentNumber] = useState()
    const [postalCode, setPostalCode] = useState()
    const [allowed, isAllowed] = useState(false)
    const [complete, isCompleted] = useState(true)
    const [status, currentStatus] = useState(null)
    const [token, setToken] = useState(null)
    const [finalCheckoutViewVisible, toggleFinalCheckoutView] = useState(false)

    useEffect(() => {
        stripe.setOptions({
            publishableKey: STRIPE_PUBLISHABLE_KEY,
            merchantId: MERCHANT_ID,
        })
        isAllowed(stripe.canMakeNativePayPayments())
        props
        // checkIfCurrentCustomer()
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

    return !finalCheckoutViewVisible ? (
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
                            <View>
                                <Text>Order Details</Text>
                                <Text>Subtotal: {props.subtotal.toFixed(2)}</Text>
                                <Text>Delivery Fee: {props.deliveryFee}</Text>
                                <Text>Tax: {props.salesTax.toFixed(2)}</Text>
                                {props.tip > 0 ?
                                    <Text>Tip: {props.tip.toFixed(2)}</Text>
                                    : null}
                                <Text>Total: {props.total.toFixed(2)}</Text>
                                <Button
                                    width={screen.width}
                                    color="tomato"
                                    onPress={() => toggleFinalCheckoutView(true)}>
                                    Place Order
                                </Button>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </>
    ) : (
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={() => cancelCheckout()}>
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
                        <Button
                            color="tomato"
                            onPress={() => toggleFinalCheckoutView(false)}>
                            Back
                </Button>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        )
};

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
    modalView: {
        height: screen.height - 100,
        justifyContent: 'center',
    },
    modalMenuItems: {
        alignItems: 'center',
        borderRadius: 5
    },
    tokenWord: {
        fontSize: 24,
    },
});
