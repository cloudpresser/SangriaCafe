import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, Button, TouchableOpacity, ScrollView } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const Cart = props => {

    const [tip, addTip] = useState(0)
    const [orderType, changeOrderType] = useState(5)
    const [currentUser, setCurrentUser] = useState()
    const [currentCard, getCard] = useState()
    const [refId, setRefId] = useState()
    
    const taxRate = 0.08875
    const subtotal = () => (props.foodCart.reduce((total, food) => total += parseInt(food.item.details.price * food.quantity), 0))
    const deliveryFee = () => (subtotal() < 50) ? 1.99 : 0
    const salesTax = () => subtotal() * taxRate
    const total = () => subtotal() + deliveryFee() + salesTax()
    const toroTotal = () => (props.foodCart.reduce((total, food) => total += parseInt(food.item.details.toros * food.quantity), 0))

    useEffect(() => {
        tipHandler(0.15)
        if (auth()._user && auth()._user.email) findUserInfo()
    }, [])

    findUserInfo = async () => {
        let cloudUser = await firestore().collection("users")
            .where('email','==',auth()._user.email).get()
        setCurrentUser(cloudUser._docs[0]._data) 
        setRefId(cloudUser._docs[0]._ref._documentPath._parts[1])
        checkCardOnFile() // will remove and place in checkout sequence once up and running
    }

    checkCardOnFile = async () => {
        let savedCard = await firestore().collection("cards")
            .where('user_id', '==', refId).get()
        if (savedCard._docs && savedCard._docs.length > 0) getCard(savedCard._docs[0]._data)
    }

    tipHandler = select => {
        addTip((total() * select))
    }

    checkoutButtonPress = async () => {
        if (currentCard) {
        //POST order to database, do not print
        // GET order and iterate information to POST externalPay
        // GET externalPay to gather information for POST
        // if POST externalPay successful then print order in Kitchen
        // push order confirmation to user

        // do get request first then study data

    const sandboxHeaders = {
        'Content-Type':"application/json",
        'ISV-ID':"D-181207-0001",
        'ISV-Key':"480a31cb-03e6-4718-9e16-2d7a27e7af8f",
        'App-Key':"6eeeccfb-dd19-41a3-b2fa-a15586c23e64",
        'App-Version':"1.0.0.0",
        'Store-Sub-ID':"2296-1C2A",
        'Store-App-Token': '72ce5c21-9885-4de8-9f07-7dcc3202e83a'
    }

    const requestOptions = {
        method: 'GET',
        headers: sandboxHeaders,
        redirect: 'follow'
    }

    fetch("https://sandbox.aldelo.io/v1/group/1000000000000000001", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))

    const order = {
        "EmployeeID": 1000000000000000001,
        "OrderType": orderType, // 3=takeout 5=delivery
        "GuestCount": 1,
        "CustomerName": currentUser.name,
        "Telephone": currentUser.phoneNumber,
        "Address": currentUser.address,
        "PostalCode": currentUser.postalCode,
        "City": 'Bronx',
        "State": 'NY',
        "DeliveryCharge": deliveryFee(),
        "OrderGratuityPercent": (tip/total())*100,
        "AutoPrint": false,
        "SystemPrint": false,
        "OrderDetails": props.foodCart.map( food => {
            return (
                {
                    "ItemID" : food.item.name,
                    "Qty": food.quantity,
                    "UnitPrice": food.item.details.price,
                    "LineNote": food.instruction ? food.instruction : null,
                    "CreatedByEmployeeID": 1000000000000000001
                }
            )
        })
    }

    console.log(order)

        } else {
            alert('no card on file')
        }
    }

    return props.foodCart.length > 0 ?
            <>
                <SafeAreaView>
                    <View style={styles.topContainer}>
                        <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
                    </View>

                    <ScrollView  alwaysBounceVertical={true} showsVerticalScrollIndicator={false} contentInset={{bottom: 100}} >

                    <View style={{padding: 20, flexDirection: 'row'}}>
                        {orderType === 5 ? <Button title={'Delivery'} onPress={() => changeOrderType(3)}/> : <Button title={'PickUp'} onPress={() => changeOrderType(5)}/> }
                    </View>

                    {props.foodCart.map( food => {
                        return (
                        <View style={styles.recieptTheme} key={food.item.name}>
                            <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
                                <Text>{food.quantity} </Text>
                                <Text> {food.item.name}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <Text>${(food.item.details.price * food.quantity)}</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image source={require('../assets/toro.png')} style={{height: 20, width: 20}} />
                                    <Text>  {food.item.details.toros * food.quantity}</Text>
                                </View>
                                <Text>{food.instruction ? food.instruction : null}</Text>
                                <TouchableOpacity>
                                    <Button title='Remove' onPress={() => props.removeFromCart(food)}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        )
                    })}

                    <View style={{padding: 20}}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text>Subtotal</Text>
                            <Text>${subtotal().toFixed(2)}</Text>
                        </View>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text>Delivery fee</Text>
                            <Text>{ deliveryFee() === 0 ? 'free' : '$' + 1.99 }</Text>
                        </View>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text>Tax</Text>
                            <Text>${salesTax().toFixed(2)}</Text>
                        </View>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text>Total</Text>
                            <Text>${total().toFixed(2)}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 5}}>
                            <Text>+ </Text>
                            <Image source={require('../assets/toro.png')} style={{height: 20, width: 20}} />
                            <Text> {toroTotal()}</Text>
                        </View>
                    </View>

                    <View style={styles.tipCheckout}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5}}>
                        <Text>Add Tip for Driver</Text>
                    </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            {tip/total() === 0.15 ? <Button title={'15%'} color='tomato' onPress={() => tipHandler(0.15)}/> : <Button title={'15%'} onPress={() => tipHandler(0.15)}/> }
                            {tip/total() === 0.20 ? <Button title={'20%'} color='tomato' onPress={() => tipHandler(0.20)}/> : <Button title={'20%'} onPress={() => tipHandler(0.20)}/> }
                            {tip/total() === 0.25 ? <Button title={'25%'} color='tomato' onPress={() => tipHandler(0.25)}/> : <Button title={'25%'} onPress={() => tipHandler(0.25)}/> }
                            {tip/total() === 0.30 ? <Button title={'30%'} color='tomato' onPress={() => tipHandler(0.30)}/> : <Button title={'30%'} onPress={() => tipHandler(0.30)}/> }
                            {tip === 0 ? <Button title={'Cash'} color='tomato' onPress={() => tipHandler(0)}/> : <Button title={'Cash'} onPress={() => tipHandler(0)}/> }
                        </View>

                        <TouchableOpacity onPress={() => checkoutButtonPress()}>
                        <View style={styles.checkoutButton}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>CHECKOUT ${(parseFloat(total()) + parseFloat(tip)).toFixed(2)}</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        : 
            <>
                <SafeAreaView>
                    <View style={styles.topContainer}>
                        <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
                    </View>
                    <View style={styles.empty}>
                        <Image source={require('../assets/empty.png')} style={styles.emptyImage} />
                    </View>
                </SafeAreaView>
            </>


}

export default Cart

const screen = Dimensions.get('window')
const styles = StyleSheet.create({
    topContainer: {
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 10
    },
    logo: {
        height: screen.width / 4,
        width: screen.width / 1.7,
    },
    recieptTheme: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 20, 
            height: 25
        }
    },
    tipCheckout: {
        padding: 10, 
        backgroundColor: 'white'
    },
    empty: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkoutButton: {
        margin: 10,
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'green'
    },
    selectedButton: {
        color: 'tomato'
    }
})