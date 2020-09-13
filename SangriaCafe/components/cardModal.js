import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native'

export default CardModal = props => {

    const [nameOnCard, changeName] = useState('')
    const [cardNum, changeCardNum] = useState()
    const [securityNum, changeSecurityNum] = useState()
    const [exp, changeExp] = useState('')
    const [bank, changeBank] = useState('')

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
        <View style={{flex:1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
            <SafeAreaView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.frontOfCard}>
                        <Text style={{alignSelf: 'flex-end', fontSize: 26}}>BANK</Text>
                        <Image source={require('../assets/cardChip.png')} style={{alignSelf: 'flex-start', height: 50, width: 80, marginBottom: 15, marginTop: 20}}/>
                        <TextInput value={cardNum} placeholder={'card number'} keyboardType='numeric' placeholderTextColor={'white'} autoCompleteType='cc-number' maxLength={16} onChangeText={changeCardNum}  style={{fontSize: 26, width: screen.width / 1.25, height: 40, padding: 10, }} />
                        <TextInput value={exp} placeholder={'expiration date: MM/DD'} placeholderTextColor={'white'} onChangeText={changeExp} keyboardType='numeric' autoCompleteType='cc-exp' maxLength={5} style={{width: screen.width / 1.25, height: 35, padding: 10, paddingLeft: 50 }} />
                        <TextInput value={nameOnCard} placeholder={'name on card'} placeholderTextColor={'white'} onChangeText={changeName} style={{width: screen.width / 1.25, height: 35, padding: 10 }} />

                    </View>
                    <View style={styles.backOfCard}> 
                        <View style={{backgroundColor: 'black', height: 35, width: '100%', marginTop: 15}}></View>
                        <Text style={{color: 'white', fontSize: 10, alignSelf: 'flex-start', margin: 5, marginLeft: 15}}>AUTHORIZED SIGNATURE</Text>
                        <View style={{flexDirection: 'row', width: screen.width / 1.1, marginLeft: 25}}>
                            <View style={{backgroundColor: 'white', height: 30, width: 200 }}>
                                <Image source={require('../assets/signature.png')} style={{ height: 30, width: 100}}/>
                            </View>
                            <View style={{ height: 30, width: 200, marginLeft: 15}}>
                                <TextInput value={exp} placeholder={'CVC code'} onChangeText={changeSecurityNum} keyboardType='numeric' style={{width: 100, height: 30, padding: 10, backgroundColor: 'white' }} />
                            </View>
                        </View>
                        <View style={{height: 130}}></View>
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