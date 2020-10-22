import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default CardModal = (props) => {
  const [nameOnCard, changeName] = useState('');
  const [cardNum, changeCardNum] = useState();
  const [securityNum, changeSecurityNum] = useState();
  const [exp, changeExp] = useState('');

  useEffect(() => {
    detectBank();
  });

  saveCard = async () => {
    if (!cardNum || !exp || !securityNum) alert('Missing Information!');
    props.cardRef === undefined || null
      ? await firestore().collection('cards').add({
          name_on_card: nameOnCard,
          card_number: cardNum,
          expiration_date: exp,
          security_code: securityNum,
          user_id: props.cloudUserId,
        })
      : await firestore().collection('cards').doc(props.cardRef).update({
          name_on_card: nameOnCard,
          card_number: cardNum,
          expiration_date: exp,
          security_code: securityNum,
          user_id: props.cloudUserId,
        });
    closeModal();
  };

  closeModal = () => {
    props.setModalVisible(false);
  };

  detectBank = () => {
    if (cardNum === undefined) return 'BANK';
    bankNum = cardNum.split('')[0];
    if (bankNum === undefined) return 'BANK';
    if (bankNum == 3) return 'AMEX';
    if (bankNum == 4) return 'VISA';
    if (bankNum == 5) return 'MasterCard';
    if (bankNum == 6) return 'Discover';
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalView}>
            <KeyboardAvoidingView behavior="position">
              <View style={styles.frontOfCard}>
                <Text style={{alignSelf: 'flex-end', fontSize: 26, color: 'white'}}>
                  {detectBank()}
                </Text>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Name on Card</Text>
                <TextInput
                  value={nameOnCard}
                  placeholder={props.card ? props.card.name_on_card : null}
                  placeholderTextColor={'black'}
                  onChangeText={changeName}
                  style={styles.textBox}
                />
                <Text style={{color: 'white', fontWeight: 'bold'}}>Card Number</Text>
                <TextInput
                  value={cardNum}
                  placeholder={props.card ? props.card.card_number : null}
                  autoCompleteType="cc-number"
                  keyboardType="numeric"
                  placeholderTextColor={'black'}
                  onChangeText={changeCardNum}
                  style={styles.textBox}
                />
                <Text style={{color: 'white', fontWeight: 'bold'}}>Expiration Date</Text>
                <TextInput
                  value={exp}
                  placeholder={props.card ? props.card.expiration_date : null}
                  autoCompleteType="cc-exp"
                  placeholderTextColor={'black'}
                  onChangeText={changeExp}
                  style={styles.textBox}
                />
                <Text style={{color: 'white', fontWeight: 'bold'}}>CVC Code</Text>
                <TextInput
                  value={securityNum}
                  placeholder={props.card ? props.card.security_code : null}
                  onChangeText={changeSecurityNum}
                  placeholderTextColor={'black'}
                  keyboardType="numeric"
                  style={styles.textBox}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity>
                  <Button onPress={() => saveCard()} title="Save" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Button onPress={() => closeModal()} title="Exit" />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  modalView: {
    alignItems: 'center',
    width: screen.width,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  frontOfCard: {
    backgroundColor: 'cornflowerblue',
    borderRadius: 5,
    width: screen.width / 1.1,
    padding: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textBox: {
    height: 50,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 2,
    margin: 5,
  },
});
