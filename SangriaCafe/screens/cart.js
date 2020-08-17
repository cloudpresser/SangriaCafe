import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, Button, TouchableOpacity, ScrollView } from 'react-native'

const Cart = props => {

    const [tip, addTip] = useState(0)

    const subtotal = () => (props.foodCart.reduce((total, food) => total += parseInt(food.item.details.price * food.quantity), 0))
    const deliveryFee = () => (subtotal() < 50) ? 1.99 : 0
    const salesTax = () => subtotal() * 0.08875
    const total = () => subtotal() + deliveryFee() + salesTax()
    const toroTotal = () => (props.foodCart.reduce((total, food) => total += parseInt(food.item.details.toros * food.quantity), 0))

    tipHandler = select => {
        addTip((total() * select))
    }

    return props.foodCart.length > 0 ? 
            <>
                <SafeAreaView>
                    <View style={styles.topContainer}>
                        <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
                    </View>

                    <View style={{padding: 20}}>
                        <Text style={{}}>Delivery to 555 Broadway New York, NY 10017</Text>
                        <Text>ASAP (40 - 50 mins)</Text>
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
                                    <Text>  {food.item.details.toros}</Text>
                                </View>
                                <Text>{food.instruction}</Text>
                                <TouchableOpacity>
                                <Button title='Remove' style={{alignItems: 'flex-start'}} onPress={food => props.removeFromCart(food)}/>
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
                    </View>

                    <View style={styles.tipCheckout}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5}}>
                        <Text>Add Tip for Driver</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Text>+ </Text>
                            <Image source={require('../assets/toro.png')} style={{height: 20, width: 20}} />
                            <Text> {toroTotal()}</Text>
                        </View>
                    </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <Button title={'Cash'} onPress={() => tipHandler(0)} />
                            <Button title={'15%'} onPress={() => tipHandler(0.15)} />
                            <Button title={'20%'} onPress={() => tipHandler(0.2)} />
                            <Button title={'25%'} onPress={() => tipHandler(0.25)} />
                            <Button title={'30%'} onPress={() => tipHandler(0.3)} />
                        </View>

                        <TouchableOpacity>
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
    }
})