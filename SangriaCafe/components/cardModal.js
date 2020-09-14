import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore'

export default CardModal = props => {

    const [nameOnCard, changeName] = useState('')
    const [cardNum, changeCardNum] = useState()
    const [securityNum, changeSecurityNum] = useState()
    const [exp, changeExp] = useState('')

    useEffect(() => {
        detectBank()
        if (props.card.card_number) changeCardNum(props.card.card_number)
        if (props.card.expiration_date) changeExp(props.card.expiration_date)
        if (props.card.name_on_card) changeName(props.card.name_on_card)
        if (props.card.security_code) changeSecurityNum(props.card.security_code)
    })

    saveCard = async () => {
        if (!cardNum || !exp || !securityNum) alert('Missing Information!')
        props.cardRef === undefined || null ?
            await firestore().collection('cards').add({
                'name_on_card' : nameOnCard,
                "card_number" : cardNum,
                'expiration_date' : exp,
                'security_code' : securityNum,
                'user_id' : props.cloudUserId
            }) 
            : 
            await firestore().collection('cards').doc(props.cardRef).update({
                'name_on_card' : nameOnCard,
                "card_number" : cardNum,
                'expiration_date' : exp,
                'security_code' : securityNum,
                'user_id' : props.cloudUserId
            })
        closeModal()
    }

    closeModal = () => {
        props.setModalVisible(false)
    }

    detectBank = () => {
        if (cardNum === undefined) return 'BANK'
        bankNum = cardNum.split('')[0]
        if (bankNum === undefined) return 'BANK'
        if (bankNum == 3) return 'AMEX'
        if (bankNum == 4) return 'VISA'
        if (bankNum == 5) return 'MasterCard'
        if (bankNum == 6) return 'Discover'
    }
                     
    return (
        <View style={{flex:1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
            <SafeAreaView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.frontOfCard}>
                        <Text style={{alignSelf: 'flex-end', fontSize: 26}}>{detectBank()}</Text>
                        <Image source={require('../assets/cardChip.png')} style={{alignSelf: 'flex-start', height: 40, width: 68, marginBottom: 15, marginTop: 20}}/>
                        <TextInput value={cardNum} placeholder={cardNum ? cardNum : 'card number'} autoCompleteType='cc-number' keyboardType='numeric' placeholderTextColor={'white'} onChangeText={changeCardNum}  style={{fontSize: 30, height: 42, padding: 10, alignSelf: 'flex-start'  }} />
                        <TextInput value={exp} placeholder={exp ? exp:'expiration date: MM/DD'} autoCompleteType='cc-exp' placeholderTextColor={'white'} onChangeText={changeExp} keyboardType='numeric' style={{height: 35, padding: 10}} />
                        <TextInput value={nameOnCard} placeholder={nameOnCard ? nameOnCard:'name on card'} placeholderTextColor={'white'} onChangeText={changeName} style={{height: 34, padding: 10, alignSelf: 'flex-start' }} />

                    </View>
                    <View style={styles.backOfCard}> 
                        <View style={{backgroundColor: 'black', height: 35, width: '100%', marginTop: 15}}></View>
                        <Text style={{color: 'white', fontSize: 10, alignSelf: 'flex-start', margin: 5, marginLeft: 15, marginTop: 15}}>AUTHORIZED SIGNATURE</Text>
                        <View style={{flexDirection: 'row', width: screen.width / 1.1, marginLeft: 25}}>
                            <View style={{backgroundColor: 'white', height: 30, width: 200 }}>
                                <Image source={require('../assets/signature.png')} style={{ height: 30, width: 100}}/>
                            </View>
                            <View style={{ height: 30, width: 200, marginLeft: 15}}>
                                <TextInput value={securityNum} placeholder={securityNum ? securityNum:'CVC code'} onChangeText={changeSecurityNum} keyboardType='numeric' style={{width: 100, height: 30, padding: 10, backgroundColor: 'white' }} />
                            </View>
                        </View>
                        <View style={{height: 110}}></View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity>
                            <Button onPress={() => saveCard()} title='Save' />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Button onPress={() => closeModal()} title='Exit' />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView> 
            </View>
            </TouchableWithoutFeedback>     
            </SafeAreaView>
        </View>
    )
}

const screen = Dimensions.get('window')
const styles = StyleSheet.create({
    modalView: {
        alignItems: 'center',
        width: screen.width,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        }
    },
    frontOfCard: {
        alignItems: 'center',
        backgroundColor: 'cornflowerblue',
        borderRadius: 5,
        width: screen.width / 1.1,
        padding: 15,
    },
    backOfCard: {
        alignItems: 'center',
        backgroundColor: 'cornflowerblue',
        borderRadius: 5,
        width: screen.width / 1.1,
        marginTop: 20
    },
    text: {
        fontWeight: 'bold',
        margin: 5
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5
    }
})