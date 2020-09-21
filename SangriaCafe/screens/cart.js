import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, Button, TouchableOpacity, ScrollView } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const Cart = props => {

    const [tip, addTip] = useState(0)
    const [orderType, changeOrderType] = useState(5)
    const [currentUser, setCurrentUser] = useState({})
    
    const taxRate = 0.08875
    const subtotal = () => (props.foodCart.reduce((total, food) => total += parseInt(food.item.details.price * food.quantity), 0))
    const deliveryFee = () => (subtotal() < 50) ? 1.99 : 0
    const salesTax = () => subtotal() * taxRate
    const total = () => subtotal() + deliveryFee() + salesTax()
    const toroTotal = () => (props.foodCart.reduce((total, food) => total += parseInt(food.item.details.toros * food.quantity), 0))

    useEffect(() => {
        tipHandler(0.15)
        setCurrentUser(firestore().collection("users")
                .where('email', '==', auth()._user.email).get())
    }, [])

    tipHandler = select => {
        addTip((total() * select))
    }

    checkoutButtonPress = async () => {
        const sandboxHeaders = {
            'Content-Type':"application/json",
            'ISV-ID':"D-181207-0001",
            'ISV-Key':"480a31cb-03e6-4718-9e16-2d7a27e7af8f",
            'App-Key':"6eeeccfb-dd19-41a3-b2fa-a15586c23e64",
            'App-Version':"1.0.0.0",
            'Store-Sub-ID':"2296-1C2A"
        }
        
        const postOrderBody =
            `{\n	\"EmployeeID\": 1000000000000000001, // bigint, not null\n	\"OrderType\": ${orderType}, // int, not null, 1=DineIn, 2=Bar, 3=TakeOut, 4=DriveThru, 5=Delivery, 6=Retail\n    \"GuestCount\": 1, // int, not null, 1 ~ 99\n	\"SeatingID\": null, // bigint, null\n	\"BarTabName\": null, // string, null, up to 100 char, bar tab order type only\n	\"CustomerID\": null, // bigint, null\n	\"CustomerName\": ${currentUser.name}, // string, null, up to 100 char, CustomerName for customer\n	\"Telephone\": ${currentUser.phoneNumber}, // string, null, up to 20 char, numbers and dash '-' only, valid formats: ###-###-####, ########, Telephone for customer\n    \"Email\": null, // string, null, up to 100 char, Email for customer\n	\"Address\": ${currentUser.address}, // string, null, up to 100 char, address for customer\n	\"PostalCode\": ${currentUser.postalCode}, // string, null, up to 10 char, PostalCode for customer\n	\"City\": Bronx, // string, null, up to 80 char, City for PostalCode\n    \"State\": New York, // string, null, up to 20 char, State for PostalCode\n    \"CustomerPickupName\": null, // string, null, up to 100 char\n    \"OrderDiscountID\": null,  // [bigint] NULL\n    \"CashPromoEmployeeID\": null, // bigint, null, a cash promotional discount applied by an employee, this field indicates the employee who applied it\n    \"CashPromoAmountApplied\": null, // float, null, cash promotional discount applied to this order\n    \"OrderSurchargeID\": null,  // bigint, null\n    \"DeliveryCharge\": ${deliveryFee()}, // float, null, delivery charge assessed to customer for this order\n    \"OrderGratuityPercent\": ${(tip/total())*100}, // float, null, order gratuity applied toward this order\n    \"CashGratuityAmountUsed\": null, // float, null, cash gratuity applied toward this order\n    \"OrderNote\": null, // string, null, up to 40 char, order level note or comment\n    \"AutoPrint\": false, // bool, if true = order will auto print to kitchen but a notification is sent; if false = order will not auto print to kitchen\n    \"SystemPrint\": false, // bool, if true = order will print to kitchen based on pos config AutoPrintNonPaidISVOrdersToKitchen; if false = order will not print to kitchen\n    \"FutureDateHoldUntilTime\": \"2018-12-10 20:00\", // datetime, null, Future Date Used Only, order is held until this date and time, format is yyyy-mm-dd hh:mm with hh in 24 hour notation\n \n    \"OrderDetails\": [\n   ${props.foodCart.map( food => {
            return `{\n    	\"ItemID\": ${food.item.name}, // bigint, not null\n        \"SeatNumber\": null, // int, null\n        \"Qty\": ${food.quantity}, // float, not null, only weighted item can have fractions, 3 decimal places for weighted item, non weighted item must be integer\n        \"UnitPrice\": ${food.item.details.price}, // float, null\n        \"LineDiscountID\": null, // bigint, null\n        \"LineNote\": ${food.instruction}, // string, null, up to 100 char\n        \"CreatedByEmployeeID\": 1000000000000000001, // bigint, not null, order detail created by this employee\n        \"SameDateHoldUntilTime\": \"2018-12-10 20:00\", // datetime, null, Same Date Hold Used Only, order item is held until this date and time, format is yyyy-mm-dd hh:mm with hh in 24 hour notation\n\n \"OrderDetailModifiers\": [\n          {\n            \"ModifierID\": 1000000000000000001, // bigint, not null\n            \"ModifierPrice\": 0.25, // float, null, modifier price to add on\n            \"PortionType\": null, // int, null, valid values are: null or 0 means no portion type; 1 = for whole portion; 2 = for halves portion; 3 = for thirds portion (portion is used in pizza ordering)\n            \"PortionSection\": null, // int, null, conditionally required if PortionType is 2 or 3; indicates portion section: 1=Whole, 2=FirstHalf, 3=SecondHalf, 4=FirstThirds, 5=SecondThirds, 6=ThirdThirds\n            \"ModifierType\": null, // int, null, null means 1, valid values are: null or 1 = for forced modifier; 2 = for advanced modifiers; 3 = for pizza modifier\n            \"ModifierGroupNumber\": null, // int, null, null means group 1, valid values 1 to 10\n          },\n          ... // more order detail modifiers\n        ],\n        \"TagAlongItems\": [ // If menu item includes tag along items, then ISV app must include tag along items along with associated modifiers during order entry and order submit\n          {\n            \"ItemID\": 1000000000000000004, // bigint, not null\n            \"OrderDetailModifiers\": [\n              {\n                \"ModifierID\": 1000000000000000291, // bigint, not null\n                \"ModifierPrice\":5, // float, null, modifier price to add on\n                \"PortionType\": null, // int, null, valid values are: null or 0 means no portion type; 1 = for whole portion; 2 = for halves portion; 3 = for thirds portion (portion is used in pizza ordering)\n                \"PortionSection\": null, // int, null, conditionally required if PortionType is 2 or 3; indicates portion section: 1=Whole, 2=FirstHalf, 3=SecondHalf, 4=FirstThirds, 5=SecondThirds, 6=ThirdThirds\n                \"ModifierType\": 1, // int, null, null means 1, valid values are: null or 1 = for forced modifier; 2 = for advanced modifiers; 3 = for pizza modifier\n                \"ModifierGroupNumber\": 1, // int, null, null means group 1, valid values 1 to 10\n              },\n            ]\n          },\n        ]\n      },\n      ... // more order detail records for this order\n    ]\n}`
        })}`

        // valid formats: ###-###-####, ######## !!! NEED FUUNCTION TO REFORMAT
        // add POSTAL CODE TO SETTINGS FORM

        const requestOptions = {
            method: 'POST',
            headers: sandboxHeaders,
            body: postOrderBody,
            redirect: 'follow'
        }

        await fetch("https://sandbox.aldelo.io/v1/order", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error))
    }

    return props.foodCart.length > 0 ?
            <>
                <SafeAreaView>
                    <View style={styles.topContainer}>
                        <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
                    </View>

                    <View style={{padding: 20, flexDirection: 'row'}}>
                        {orderType === 5 ? <Button title={'Delivery'} color='tomato' onPress={() => changeOrderType(3)}/> : <Button title={'PickUp'} onPress={() => changeOrderType(5)}/> }
                    </View>

                    <ScrollView  alwaysBounceVertical={true} showsVerticalScrollIndicator={false} contentInset={{bottom: 130}} >

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