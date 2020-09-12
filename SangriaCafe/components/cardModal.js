import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, SafeAreaView } from 'react-native'
import Button from 'react-native-paper'

export default CardModal = props => {

    const [name, changeName] = useState('')
    const [exp, changeExp] = useState('')
    const [cardNum, changeCardNum] = useState()
    const [securityNum, changeSecurityNum] = useState()

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
                        <Text style={styles.text}>Main Card</Text>                        
                        <Text style={styles.text}>Name</Text>
                        <TextInput placeholder={'name on card'} onChangeText={changeName} value={name}/>
                        <Text style={styles.text}>Expiration Date</Text>
                        <TextInput placeholder={'MM/DD'} onChangeText={changeExp} value={exp}/>
                        <Text style={styles.text}>Card Number</Text>
                        <TextInput placeholder={'000-0000-0000-000'} onChangeText={changeCardNum} value={cardNum}/>
                        <Text style={styles.text}>Security Code</Text>
                        <TextInput placeholder={'3-4 digit code on back of card'} onChangeText={changeSecurityNum} value={securityNum}/>
                        <Button mode='contained' color='tomato' style={{margin:10}} onPress={() => saveCard()}>Save</Button>
                        <Button mode='contained' color='tomato' style={{margin:10}} onPress={() => closeModal()}>Exit</Button>
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
        margin: 5,
        borderRadius: 5,
        width: screen.width / 1.25
    },
    text: {
        fontWeight: 'bold',
        margin: 5
    },
})