import React from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, Image, Dimensions, Button, Text } from 'react-native';
import TabNav from '../components/TabNav.js'

class Home extends React.Component {
  
  render(){
    return (
      <>
        <SafeAreaView>
          <View style={styles.topBar}>
            <Image source={ require('../assets/sangria_logo.png')} style={styles.logo}/>
          </View>
          <View style={styles.userBar}>
          </View>
        </SafeAreaView>
      </>
    );
  };

  }

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 10
    },
    userBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10
    },
    userName: {
      fontSize: 14,
      color: '#2f354b',
      textAlign: 'center'
    },
    logo: {
        height: screen.width / 4,
        width: screen.width / 1.7
    }
});

export default Home;