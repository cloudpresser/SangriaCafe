import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal
} from 'react-native';
import CheckOutModal from '../components/checkOutModal'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Cart = (props) => {
  const [tip, addTip] = useState(0);
  const [orderStatus, setOrderStatus] = useState();
  const [orderType, changeOrderType] = useState(5);
  const [authUser, setauthUser] = useState();
  const [refId, setRefId] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const taxRate = 0.08875;
  const subtotal = () =>
    props.foodCart.reduce(
      (total, food) => (total += parseInt(food.item[1].price * food.quantity)),
      0,
    );
  const deliveryFee = () => (subtotal() < 50 ? 1.99 : 0);
  const salesTax = () => subtotal() * taxRate;
  const total = () => subtotal() + deliveryFee() + salesTax();
  const toroTotal = () =>
    props.foodCart.reduce(
      (total, food) => (total += parseInt(food.item[1].toros * food.quantity)),
      0,
    );

  useEffect(() => {
    findUserInfo()
  }, []);

  findUserInfo = async () => {
    if (auth()._user && auth()._user.email) {
      let cloudUser = await firestore()
        .collection('users')
        .where('email', '==', auth()._user.email)
        .get();
      if (cloudUser && cloudUser._docs) {
        setauthUser(cloudUser._docs[0]._data);
        setRefId(cloudUser._docs[0]._ref._documentPath._parts[1]);
      }
    }
  };

  tipHandler = (select) => {
    addTip(total() * select);
  };

  flipOrderType = () => {
    orderType === 3 ? changeOrderType(5) : changeOrderType(3);
  };

  return props.foodCart.length > 0 ? (
    <>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <CheckOutModal
          setModalVisible={setModalVisible}
          authUser={authUser}
          refId={refId}
          total={total()}
          tip={tip}
          orderType={orderType}
        />
      </Modal>
      <SafeAreaView>
        <View style={styles.topContainer}>
          <Image
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fsangria_logo.png?alt=media&token=65d5bb98-bcfc-4599-bc4c-395ac130212a',
            }}
            style={styles.logo}
          />
        </View>

        <ScrollView
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          contentInset={{ bottom: 100 }}>
          <View style={{ padding: 10 }}>
            <Switch
              thumbColor={orderType === 3 ? '#767577' : 'tomato'}
              onValueChange={() => flipOrderType()}
              value={orderType}
            />
            {orderType === 5 ? <Text> Delivery</Text> : <Text> PickUp</Text>}
          </View>

          {props.foodCart.map((food) => {
            return (
              <View style={styles.recieptTheme} key={food.item[0] + food.instruction}>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text>{food.quantity} </Text>
                    <Text> {food.item[0]}</Text>
                  </View>
                  <Text style={styles.subText}>{food.instruction ? food.instruction : null}</Text>
                </View>
                <View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text>${food.item[1].price * food.quantity}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={{
                          uri:
                            'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Ftoro.png?alt=media&token=240fcdac-2e49-47e7-b3ea-8a2f93d4105e',
                        }}
                        style={{ height: 20, width: 20 }}
                      />
                      <Text> {food.item[1].toros * food.quantity}</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.removeFromCart(food)}>
                      <Text style={{ color: '#0645AD' }}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}

          <View style={{ padding: 20 }}>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text>Subtotal</Text>
              <Text>${subtotal().toFixed(2)}</Text>
            </View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text>Delivery fee</Text>
              <Text>{deliveryFee() === 0 ? 'free' : '$' + 1.99}</Text>
            </View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text>Tax</Text>
              <Text>${salesTax().toFixed(2)}</Text>
            </View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text>Total</Text>
              <Text>${total().toFixed(2)}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginTop: 5,
              }}>
              <Text>+ </Text>
              <Image
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Ftoro.png?alt=media&token=240fcdac-2e49-47e7-b3ea-8a2f93d4105e',
                }}
                style={{ height: 20, width: 20 }}
              />
              <Text> {toroTotal()}</Text>
            </View>
          </View>

          <View style={styles.tipCheckout}>
            {orderType === 5 ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 5,
                  }}>
                  <Text>Add Tip for Driver</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  {tip / total() === 0.15 ? (
                    <Button
                      title={'15%'}
                      color="tomato"
                      onPress={() => tipHandler(0.15)}
                    />
                  ) : (
                      <Button title={'15%'} onPress={() => tipHandler(0.15)} />
                    )}
                  {tip / total() === 0.2 ? (
                    <Button
                      title={'20%'}
                      color="tomato"
                      onPress={() => tipHandler(0.2)}
                    />
                  ) : (
                      <Button title={'20%'} onPress={() => tipHandler(0.2)} />
                    )}
                  {tip / total() === 0.25 ? (
                    <Button
                      title={'25%'}
                      color="tomato"
                      onPress={() => tipHandler(0.25)}
                    />
                  ) : (
                      <Button title={'25%'} onPress={() => tipHandler(0.25)} />
                    )}
                  {tip / total() === 0.3 ? (
                    <Button
                      title={'30%'}
                      color="tomato"
                      onPress={() => tipHandler(0.3)}
                    />
                  ) : (
                      <Button title={'30%'} onPress={() => tipHandler(0.3)} />
                    )}
                  {tip === 0 ? (
                    <Button
                      title={'Cash'}
                      color="tomato"
                      onPress={() => tipHandler(0)}
                    />
                  ) : (
                      <Button title={'Cash'} onPress={() => tipHandler(0)} />
                    )}
                </View>
              </>
            ) : null}

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.checkoutButton}>
                <Text
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>
                  CHECKOUT ${(parseFloat(total()) + parseFloat(tip)).toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  ) : (
      // RENDERS IF CART IS EMPTY
      <>
        <SafeAreaView>
          <View style={styles.topContainer}>
            <Image
              source={{
                uri:
                  'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fsangria_logo.png?alt=media&token=65d5bb98-bcfc-4599-bc4c-395ac130212a',
              }}
              style={styles.logo}
            />
          </View>
          <View style={styles.empty}>
            <Image
              source={{
                uri:
                  'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fempty.png?alt=media&token=b86c1d0b-45df-4931-84bb-9299f68bc7f7',
              }}
              style={styles.emptyImage}
            />
          </View>
        </SafeAreaView>
      </>
    );
};

export default Cart;

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 10,
  },
  logo: {
    height: screen.width / 4,
    width: screen.width / 1.7,
  },
  recieptTheme: {
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 20,
      height: 25,
    },
  },
  tipCheckout: {
    padding: 10,
    backgroundColor: 'white',
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: screen.width,
    height: screen.height / 1.5,
  },
  checkoutButton: {
    margin: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'green',
  },
  selectedButton: {
    color: 'tomato',
  },
  subText: {
    fontSize: 11,
    fontStyle: 'italic'
  }
});
