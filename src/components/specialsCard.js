import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native-paper';

export default Specials = () => {
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

  return menu.length ? (
    <>
      <View style={styles.cardContent}>
        <Text style={styles.heading}>SPECIALS</Text>
        <View style={styles.subCard}>
          <Image source={{uri: menu[0][0][1].image}} style={styles.image} />
          <View style={styles.textArea}>
            <Text style={styles.text}>{menu[0][0][0]}</Text>
            <Text style={styles.text}>BUY 2 GET 1 FREE</Text>
          </View>
        </View>
        <View style={styles.subCard}>
          <View style={styles.textArea}>
            <Text style={styles.text}>{menu[4][0][0]}</Text>
            <Text style={styles.text}>+25% TOROS</Text>
          </View>
          <Image source={{uri: menu[4][0][1].image}} style={styles.image} />
        </View>
        <View style={styles.subCard}>
          <Image source={{uri: menu[1][5][1].image}} style={styles.image} />
          <View style={styles.textArea}>
            <Text style={styles.text}>{menu[1][5][0]}</Text>
            <Text style={styles.text}>1 FREE SANGRIA</Text>
          </View>
        </View>
        <View style={styles.subCard}>
          <View style={styles.textArea}>
            <Text style={styles.text}>{menu[5][2][0]}</Text>
            <Text style={styles.text}>HOT NEW ITEM!</Text>
          </View>
          <Image source={{uri: menu[5][2][1].image}} style={styles.image} />
        </View>
      </View>
    </>
  ) : (
    <View
      style={{
        height: screen.height / 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  heading: {
    color: 'tomato',
    fontWeight: 'bold',
    fontSize: 34,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 1,
    alignSelf: 'center',
    margin: 5,
  },
  cardContent: {
    padding: 5,
    elevation: 10,
    shadowOffset: {width: 20, height: 25},
    shadowColor: 'black',
    backgroundColor: 'white',
  },
  image: {
    height: 80,
    width: 100,
    borderRadius: 10,
  },
  subCard: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    backgroundColor: 'tomato',
    borderRadius: 10,
  },
  textArea: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
