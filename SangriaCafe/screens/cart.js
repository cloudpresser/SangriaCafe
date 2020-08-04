import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text } from 'react-native'

const Cart = () => {

    const [foodCart, addToCart] = useState([])
    
    useEffect( () => {
        addToCart(
            [
                {
                    name: 'chicken',
                    price: '12',
                    toros: '60',
                    quantity: '1',
                    instruction: ''
                },
                {
                    name: 'steak',
                    price: '24',
                    toros: '120',
                    quantity: '2',
                    instruction: 'medium cooked'
                }
            ]
        )
    }, [] )

    const subtotal = (foodCart.reduce((total, item) => total += parseInt(item.price * item.quantity), 0))
    const deliveryFee = foodCart.reduce((total, item) => total += parseInt(item.price), 0) > 50 ? 1.99 : 0
    const salesTax = (foodCart.reduce((total, item) => total += parseInt(item.price), 0) * 0.08875)
    const total = (subtotal + deliveryFee + salesTax)

    return foodCart.length > 0 ? 
            <>
                <SafeAreaView>
                    <View style={styles.topContainer}>
                        <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
                    </View>

                    <View style={{padding: 20}}>
                        <Text style={{}}>Delivery to 555 Broadway New York, NY 10017</Text>
                        <Text>ASAP (40 - 50 mins)</Text>
                    </View>

                    {foodCart.map( item => {
                        return (
                        <View style={styles.recieptTheme}>
                            <View style={{alignItems: 'flex-start'}}>
                                <Text>{item.quantity}</Text>
                                <Text>{item.name}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <Text>${(item.price * item.quantity)}</Text>
                                <Text>{item.toros}</Text>
                            </View>
                        </View>
                        )
                    })}

                    <View style={{padding: 20}}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text>Subtotal</Text>
                            <Text>{subtotal.toFixed(2)}</Text>
                        </View>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text>Delivery fee</Text>
                            <Text>{ deliveryFee === 0 ? 'free' : 1.99 }</Text>
                        </View>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text>Tax</Text>
                            <Text>{salesTax.toFixed(2)}</Text>
                        </View>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text>Total</Text>
                            <Text>{total.toFixed(2)}</Text>
                        </View>
                    </View>

                    <View>

                    </View>
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20,
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 20, 
            height: 25
        }
     },
     empty: {
         marginTop: 50,
         justifyContent: 'center',
         alignItems: 'center'
     },
})