import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default Specials = () => {

  useEffect(() => {
    firestore().collection('menu').get()
  },[])

  return (
    <>
      <View style={styles.cardContent}>
        <Text style={styles.heading}>SPECIALS</Text>
        <View style={styles.subCard}>
          <Image
            // source={{uri: Menu[0].appetizers.items[4].details.image}}
            style={styles.image}
          />
          <View style={styles.textArea}>
            {/* <Text style={styles.text}>{Menu[0].appetizers.items[4].name}</Text> */}
            <Text style={styles.text}>BUY 2 GET 1 FREE</Text>
          </View>
        </View>
        <View style={styles.subCard}>
          <View style={styles.textArea}>
            {/* <Text style={styles.text}>{Menu[1].mainCourses.items[2].name}</Text> */}
            <Text style={styles.text}>+25% TOROS</Text>
          </View>
          <Image
            // source={{uri: Menu[1].mainCourses.items[2].details.image}}
            style={styles.image}
          />
        </View>
        <View style={styles.subCard}>
          <Image
            // source={{uri: Menu[4].sandwiches.items[0].details.image}}
            style={styles.image}
          />
          <View style={styles.textArea}>
            {/* <Text style={styles.text}>{Menu[4].sandwiches.items[0].name}</Text> */}
            <Text style={styles.text}>1 FREE SANGRIA</Text>
          </View>
        </View>
        <View style={styles.subCard}>
          <View style={styles.textArea}>
            {/* <Text style={styles.text}>{Menu[3].rices.items[2].name}</Text> */}
            <Text style={styles.text}>HOT NEW ITEM!</Text>
          </View>
          <Image
            // source={{uri: Menu[3].rices.items[2].details.image}}
            style={styles.image}
          />
        </View>
      </View>
    </>
  );
};

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
    margin: 10,
  },
  cardContent: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    elevation: 10,
    shadowOffset: {width: 20, height: 25},
    shadowColor: 'black',
    backgroundColor: 'white',
  },
  image: {
    height: 80,
    width: 80,
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
