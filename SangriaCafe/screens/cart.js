import React from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text } from 'react-native'

export default class Cart extends React.Component {

    render(){
        return(
            <>
                <SafeAreaView>
                    <Text>THIS IS THE CART</Text>
                </SafeAreaView>
            </>
        )
    }

}

const screen = Dimensions.get('window')
const styles = StyleSheet.create({})