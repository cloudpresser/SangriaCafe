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
import CheckBox from '@react-native-community/checkbox';

export default ModalCard = (props) => {
  const [qnt, onChangeQnt] = useState('1');
  const [inst, onChangeInst] = useState('');
  const [Ketchup, pickKetchup] = useState(false);
  const [Mustard, pickMustard] = useState(false);
  const [Mayo, pickMayo] = useState(false);
  const [Aioli, pickAioli] = useState(false);
  const [Coke, pickCoke] = useState(false);
  const [Sprite, pickSprite] = useState(false);
  const [FruitPunch, pickFruitPunch] = useState(false);
  const [Water, pickWater] = useState(false);

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
                    source={{
                      uri:
                        'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Ftoro.png?alt=media&token=240fcdac-2e49-47e7-b3ea-8a2f93d4105e',
                    }}
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
                <View
                  style={{
                    margin: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: screen.width / 1.25,
                  }}>
                  <Text style={{color: 'white'}}>Add Drink..</Text>
                  <View style={{alignItems: 'center'}}>
                    <CheckBox
                      boxType="square"
                      value={Coke}
                      onValueChange={(newValue) => pickCoke(newValue)}
                    />
                    <Text style={{color: 'white'}}>Coke</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <CheckBox
                      boxType="square"
                      value={Sprite}
                      onValueChange={(newValue) => pickSprite(newValue)}
                    />
                    <Text style={{color: 'white'}}>Sprite</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <CheckBox
                      boxType="square"
                      value={FruitPunch}
                      onValueChange={(newValue) => pickFruitPunch(newValue)}
                    />
                    <Text style={{color: 'white'}}>Juice</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <CheckBox
                      boxType="square"
                      value={Water}
                      onValueChange={(newValue) => pickWater(newValue)}
                    />
                    <Text style={{color: 'white'}}>Water</Text>
                  </View>
                </View>
                <View
                  style={{
                    margin: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: screen.width / 1.25,
                  }}>
                  <Text style={{color: 'white'}}>Add Sauce..</Text>
                  <View style={{alignItems: 'center'}}>
                    <CheckBox
                      boxType="square"
                      value={Ketchup}
                      onValueChange={(newValue) => pickKetchup(newValue)}
                    />
                    <Text style={{color: 'white'}}>Ketchup</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <CheckBox
                      boxType="square"
                      value={Mustard}
                      onValueChange={(newValue) => pickMustard(newValue)}
                    />
                    <Text style={{color: 'white'}}>Mustard</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <CheckBox
                      boxType="square"
                      value={Mayo}
                      onValueChange={(newValue) => pickMayo(newValue)}
                    />
                    <Text style={{color: 'white'}}>Mayo</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <CheckBox
                      boxType="square"
                      value={Aioli}
                      onValueChange={(newValue) => pickAioli(newValue)}
                    />
                    <Text style={{color: 'white'}}>Aioli</Text>
                  </View>
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity onPress={() => throwinthebag(props.food)}>
                    <Image
                      source={{
                        uri:
                          'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fadd.png?alt=media&token=f165dd3d-4263-4598-86a9-7a6ee4c0ce9e',
                      }}
                      style={{margin: 25, height: 35, width: 35}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => props.setModalVisible(false)}>
                    <Image
                      source={{
                        uri:
                          'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fclose.png?alt=media&token=8bca3fdf-2f65-4fc8-a8a4-f5eccb3df648',
                      }}
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
