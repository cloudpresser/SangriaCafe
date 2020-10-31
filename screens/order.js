import React, {useState, useEffect} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ModalCard from '../components/modalCard';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native-paper';

const Order = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [foodSelected, selectFood] = useState({});
  const [menu, fullMenu] = useState([]);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    let cloudMenu = await firestore().collection('menu').get();
    let steaks = Object.entries(cloudMenu._docs[0]._data);
    let appetizers = Object.entries(cloudMenu._docs[1]._data);
    let sides = Object.entries(cloudMenu._docs[2]._data);
    let salads = Object.entries(cloudMenu._docs[3]._data);
    let rices = Object.entries(cloudMenu._docs[4]._data);
    let mainCourse = Object.entries(cloudMenu._docs[5]._data);
    let sandwiches = Object.entries(cloudMenu._docs[6]._data);
    const menuArray = [
      appetizers,
      mainCourse,
      steaks,
      rices,
      sandwiches,
      salads,
    ];
    fullMenu(menuArray);
  };

  const handleItemSelect = (food) => {
    return (
      selectFood(food),
      (
        <ModalCard
          setModalVisible={setModalVisible(true)}
          food={foodSelected}
          addToCart={props.addToCart}
        />
      )
    );
  };

  const courseTitles = (key) => {
    if (key === 0) return 'APPERTIVOS';
    if (key === 1) return 'PLATOS FUERTES';
    if (key === 2) return 'ADASO';
    if (key === 3) return 'ARROCES';
    if (key === 4) return 'SANDWICHES';
    if (key === 5) return 'ENSALADAS';
  };

  return (
    <>
      <SafeAreaView>
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <ModalCard
            setModalVisible={setModalVisible}
            food={foodSelected}
            addToCart={props.addToCart}
          />
        </Modal>

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
          contentInset={{top: 0, left: 0, bottom: 110, right: 0}}>
          {menu.length ? (
            <View style={styles.card}>
              {menu.map((course) => {
                return (
                  <View key={course} style={{marginBottom: 10}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      {courseTitles(menu.indexOf(course))}
                    </Text>
                    <View style={styles.cardContent}>
                      {course.map((food) => {
                        return (
                          <View key={food[0]}>
                            <TouchableOpacity
                              onPress={() => {
                                handleItemSelect(food);
                              }}>
                              <View style={styles.menuItems}>
                                <View style={styles.menuItemImageContainer}>
                                  <Image
                                    source={{uri: food[1].image}}
                                    style={styles.menuItemImage}
                                  />
                                </View>
                                <View style={styles.menuItemDescription}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontWeight: 'bold',
                                      fontSize: 15,
                                    }}>
                                    {food[0]}
                                  </Text>
                                  <Text style={{color: 'white'}}>
                                    {food[1].description}
                                  </Text>
                                </View>
                                <View style={styles.toroContainer}>
                                  <Image
                                    source={{
                                      uri:
                                        'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Ftoro.png?alt=media&token=240fcdac-2e49-47e7-b3ea-8a2f93d4105e',
                                    }}
                                    style={{height: 35, width: 35}}
                                  />
                                  <Text style={{fontSize: 16}}>
                                    {food[1].toros}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View
              style={{
                height: screen.height / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="tomato" />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

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
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
  },
  cardContent: {
    justifyContent: 'center',
  },
  menuItems: {
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 10,
    backgroundColor: 'tomato',
    shadowOffset: {width: 20, height: 25},
    shadowColor: 'black',
    margin: 2,
    padding: 2,
  },
  menuItemImage: {
    height: 65,
    width: 65,
    borderRadius: 45,
  },
  menuItemImageContainer: {
    justifyContent: 'center',
    margin: 5,
  },
  menuItemDescription: {
    margin: 8,
    width: '58%',
  },
  toroContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    margin: 50,
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
    margin: 50,
    padding: 20,
    borderRadius: 5,
  },
  modalDescription: {
    width: 300,
    margin: 15,
  },
  modalMenuItemImage: {
    height: 250,
    width: 300,
    borderRadius: 5,
    margin: 15,
  },
  modalToroContainer: {
    alignSelf: 'flex-end',
  },
});

export default Order;
