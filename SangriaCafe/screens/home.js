import React from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Button, Text } from 'react-native';

export default class Home extends React.Component {
  
  render(){
    return (
      <View>
        <SafeAreaView>
          <View style={styles.topContainer}>
            <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
          </View>
          <View style={styles.userBar}>
            <View style={styles.userIcon}>
              <Text style={{fontSize:20}}>PardiHardi</Text>
            </View>
            <View style={styles.userIcon}>
              <Text style={{fontSize:20}}>750 </Text>
              <Image source={require('../assets/toro.png')} style={styles.toro}/>
            </View>
          </View>
        </SafeAreaView>
      </View>
    )
  }

}

const screen = Dimensions.get('window')
const styles = StyleSheet.create({
    topContainer: {
      alignItems: 'center',
      paddingTop: 2,
    },
    logo: {
        height: screen.width / 4,
        width: screen.width / 1.7,
    },
    toro: {
      height: 25,
      width: 25
    },
    userBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    userIcon: {
      flexDirection: 'row',
      padding: 10
    },
    nav: {
      width: '100%',
      height: 70,
      backgroundColor: '#EE5300',
      justifyContent: 'center',
      top: screen.height / 2
    }
})