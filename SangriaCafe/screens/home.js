import React from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text } from 'react-native'
import Card from '../components/instaCard'
export default class Home extends React.Component {

  render(){
    return (
      <>
        <SafeAreaView>
          <View style={styles.topContainer}>
            <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
          </View>

          <View style={styles.userBar}>
            <Text style={{fontSize:20}}>PardiHardi</Text>
            <View style={styles.toroSection}>
              <Text style={{fontSize:20}}>750 </Text>
              <Image source={require('../assets/toro.png')} style={styles.toro}/>
            </View>
          </View>

          <View>
            <Card />
          </View>

          <View style={styles.storeHours}>
            <Text>LUNCH 11AM - 4PM | DINNER 4PM - 11PM</Text>
            <Text>Bar: 11AM - 2AM | HH: 3PM-7PM</Text>
          </View>

        </SafeAreaView>
      </>
    )}

}

const screen = Dimensions.get('window')
const styles = StyleSheet.create({
    topContainer: {
      alignItems: 'center',
      marginTop: 1,
      marginBottom: 10
    },
    logo: {
        height: screen.width / 4,
        width: screen.width / 1.7,
    },
    toro: {
      height: 28,
      width: 28
    },
    userBar: {
      backgroundColor: 'tomato',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 10,
      padding: 5,
      borderRadius: 10
    },
    toroSection: {
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'row'
    },
    frontImage: {
      height: screen.height / 3,
      width: screen.width
    },
    storeHours: {
      alignItems: 'center'
    }
})