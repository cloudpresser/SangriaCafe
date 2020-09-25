import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  SafeAreaView,
} from 'react-native';

export default ModalCard = (props) => {
  const [qnt, onChangeQnt] = useState('1');
  const [inst, onChangeInst] = useState('');

  const throwinthebag = (food) => {
    let cartItem = {item: food, quantity: qnt, instruction: inst};
    props.addToCart(cartItem);
    props.setModalVisible(false);
  };

  return (
    <>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalView}>
            <KeyboardAvoidingView behavior="position">
              <View style={styles.modalMenuItems}>
                <View>
                  <Image
                    source={{uri: props.food.details.image}}
                    style={styles.modalMenuItemImage}
                  />
                </View>
                <View style={styles.modalDescription}>
                  <Text
                    style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                    {props.food.name}
                  </Text>
                  <Text style={{color: 'white'}}>
                    {props.food.details.description}
                  </Text>
                  <Text style={{color: 'white'}}>
                    ${props.food.details.price}
                  </Text>
                </View>
                <View style={styles.modalToroContainer}>
                  <Image
                    source={require('../assets/toro.png')}
                    style={{height: 35, width: 35}}
                  />
                  <Text style={{fontSize: 16}}>{props.food.details.toros}</Text>
                </View>
                <View style={styles.inputs}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder={'1'}
                    placeholderTextColor={'white'}
                    value={qnt}
                    onChangeText={onChangeQnt}
                    color="white"
                    borderColor="white"
                    borderWidth={0.25}
                    style={{width: 50, height: 50, padding: 10}}
                  />
                  <TextInput
                    value={inst}
                    placeholder={'Special Instructions'}
                    placeholderTextColor={'white'}
                    onChangeText={onChangeInst}
                    color="white"
                    borderColor="white"
                    borderWidth={0.25}
                    style={{width: screen.width / 1.7, height: 50, padding: 10}}
                  />
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity onPress={() => throwinthebag(props.food)}>
                    <Image
                      source={require('../assets/add.png')}
                      style={{margin: 25, height: 35, width: 35}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => props.setModalVisible(false)}>
                    <Image
                      source={require('../assets/close.png')}
                      style={{margin: 25, height: 35, width: 35}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  modalView: {
    width: screen.width,
    backgroundColor: 'white',
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalMenuItems: {
    alignItems: 'center',
    backgroundColor: 'tomato',
    margin: 5,
    borderRadius: 5,
    width: screen.width / 1.25,
  },
  modalDescription: {
    width: screen.width / 1.5,
  },
  modalMenuItemImage: {
    height: screen.height / 2.75,
    width: screen.width / 1.5,
    borderRadius: 5,
    margin: 15,
  },
  inputs: {
    flexDirection: 'row',
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  modalToroContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 25,
    marginBottom: 10,
  },
});
