import React from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, ScrollView } from 'react-native'
import Card from '../components/instaCard'
import Map from '../components/map'

export default class Home extends React.Component {

  render(){
    return (
    <>
      <SafeAreaView style={styles.homePageContainer}>
        <View style={styles.topContainer}>
          <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
        </View>
        <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false} contentInset={{top: 0, left: 0, bottom: 110, right: 0}}>
          <View>
            <Card/>
          </View>
          <View style={styles.map}> 
            <Map/> 
          </View>
          <View style={styles.storeHours}>
            <Text>LUNCH 12PM - 4PM | DINNER 4PM - 11PM</Text>
            <Text>Bar: 12PM - 2AM | HH: 3PM-7PM</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </> )
  }
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
  storeHours: {
    alignItems: 'center'
  },
  map: {
    alignItems: 'center',
    margin: 5
  }
})