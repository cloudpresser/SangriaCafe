import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import stripe from 'tipsi-stripe'
import { STRIPE_PUBLISHABLE_KEY, MERCHANT_ID } from '../Setup'

export default checkOutModal = (props) => {

    console.log(props)

    const [customerId, setCustID] = useState()
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
                amount: ((parseFloat(props.total) + parseFloat(props.tip)) * 100),
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
                amount: (parseFloat(total()) + parseFloat(tip)).toFixed(2)
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
                    name: authUser.name,
                    line1: authUser.address,
                    line2: authUser.aptNum,
                    city: authUser.city,
                    state: authUser.state,
                    postalCode: authUser.postalCode,
                    email: authUser.email,
                }
            }
        }
        const newToken = await stripe.paymentRequestWithCardForm(options)
        await firestore().collection('users').doc(refId).update({ customerId: newToken.id });
        setToken(newToken)
    }

    return token && token.length ? (
        <>
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={() => cancelCheckout()}>
                    <View style={styles.modalView}>
                        <KeyboardAvoidingView behavior="position">
                            <View style={styles.modalMenuItems}>
                                <Text style={styles.tokenWord}>{token}</Text>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </>
    ) : (
            <>
                <SafeAreaView>
                    <TouchableWithoutFeedback onPress={() => cancelCheckout()}>
                        <View style={styles.modalView}>
                            <KeyboardAvoidingView behavior="position">
                                <View style={styles.modalMenuItems}>
                                    <Text style={styles.tokenWord}>{props.cardToken}</Text>
                                </View>
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
        backgroundColor: 'white',
        padding: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    modalMenuItems: {
        alignItems: 'center',
        backgroundColor: 'tomato',
        borderRadius: 5,
        width: screen.width / 1.15,
    },
    tokenWord: {
        fontSize: 24,
    }
});
