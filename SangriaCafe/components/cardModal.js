import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, SafeAreaView } from 'react-native'
import Button from 'react-native-paper'

export default CardModal = props => {

    const [nameOnCard, changeName] = useState('')
    const [cardNum, changeCardNum] = useState()
    const [securityNum, changeSecurityNum] = useState()
    const [exp, changeExp] = useState('')

    saveCard = async () => {
        const currentCard = firestore().collection('cards')
            .where('user_id', '==', props.cloudUserId).get()
        currentCard === undefined ?
            await firestore().collection('cards').add({
                "card_number" : cardNum,
                'expiration_date' : exp,
                'security_code' : securityNum,
                'user_id' : props.cloudUserId
            }) 
            : 
            await firestore().collection('cards').update({
                "card_number" : cardNum,
                'expiration_date' : exp,
                'security_code' : securityNum,
                'user_id' : props.cloudUserId
            })
        props.setModalVisible(false)
    }

    closeModal = () => {
        props.setModalVisible(false)
    }
                     
    return (
        <>
            <SafeAreaView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.modalMenuItems}> 
                        <TextInput value={nameOnCard} placeholder={'name on card'} placeholderTextColor={'white'} onChangeText={changeName} color='white' borderColor='white' borderWidth={0.25} style={{width: screen.width / 1.7, height: 50, padding: 10 }} />
                        <TextInput value={cardNum} placeholder={'card number'} placeholderTextColor={'white'} onChangeText={changeCardNum} color='white' borderColor='white' borderWidth={0.25} style={{width: screen.width / 1.7, height: 50, padding: 10 }} />
                        <TextInput value={securityNum} placeholder={'security number'} placeholderTextColor={'white'} onChangeText={changeSecurityNum} color='white' borderColor='white' borderWidth={0.25} style={{width: screen.width / 1.7, height: 50, padding: 10 }} />
                        <TextInput value={exp} placeholder={'expiration date: MM/DD'} placeholderTextColor={'white'} onChangeText={changeExp} color='white' borderColor='white' borderWidth={0.25} style={{width: screen.width / 1.7, height: 50, padding: 10 }} />
                    </View>
                </KeyboardAvoidingView> 
            </View>
            </TouchableWithoutFeedback>     
            </SafeAreaView>
        </>
    )
}

const screen = Dimensions.get('window')
const styles = StyleSheet.create({
    modalView: {
        alignItems: 'center',
        width: screen.width,
        backgroundColor: "white",
        padding: 5,
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
        borderRadius: 5,
        width: screen.width / 1.25,
        padding: 20
    },
    text: {
        fontWeight: 'bold',
        margin: 5
    },
})