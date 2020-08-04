import React, { useState } from 'react'
import { Button, View, Image, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

export default ModalCard = props => {

    const [qnt, onChangeQnt] = useState('1')
    const [inst, onChangeInst] = useState('')

    const throwinthebag = food => {
        props.addToCart(({ item : food, quantity : qnt, instruction : inst }))
        props.setModalVisible(false)
    }

    return (
        <View>
            <View style={styles.modalView}>
            <View style={styles.modalMenuItems}>
                <View>
                    <Image source={{uri : props.food.details.image}} style={styles.modalMenuItemImage} />
                </View>
                <View style={styles.modalDescription}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>{props.food.name}</Text>
                    <Text style={{color: 'white'}}>{props.food.details.description}</Text>
                    <Text style={{color: 'white'}}>${props.food.details.price}</Text>
                </View>
                <View style={styles.modalToroContainer}>
                    <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                    <Text style={{fontSize:16}}>{props.food.details.toros}</Text>
                </View>
            </View>
                    <TextInput value={inst} placeholder={'Special Instructions'} onChangeText={onChangeInst} borderColor='gray' borderWidth={1} style={{height: 50, width: 300, padding: 10}}/>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 17}}>How Many?  </Text>
                    <TextInput keyboardType='number-pad' placeholder={'1'} value={qnt} onChangeText={onChangeQnt} borderColor='gray' borderWidth={1} style={{width: 50, padding: 5}}/>
                    <Button title='Add to Cart' onPress={() => throwinthebag(props.food)}/>
                </View>
                <TouchableOpacity onPress={() => props.setModalVisible(false)}>
                    <Image source={{uri: 'https://www.freeiconspng.com/thumbs/close-button-png/black-circle-close-button-png-5.png'}} style={{margin: 20, height: 20, width: 20, alignItems: 'center'}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "white",
        padding: 20,
        margin: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        }
    },
    modalMenuItems: {
        alignItems: 'center',
        backgroundColor: 'tomato',
        margin: 50,
        padding: 20,
        borderRadius: 5
    },
    modalDescription: {
        width: 300,
        margin: 15
    },
    modalMenuItemImage: {
        height: 250,
        width: 300,
        borderRadius: 5,
        margin: 15
    },
    modalToroContainer: {
        alignSelf: 'flex-end',
        alignItems: 'center'
    }
})