import React from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, ScrollView, Linking } from 'react-native'
import { Button } from 'react-native-paper'
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
        <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false} contentInset={{top: 0, left: 0, bottom: 115, right: 0}}>
          <View style={styles.infoContainer}>
            <Image source={require('../assets/toro_front.jpg')} style={styles.welcomPic}/>
            <View>
              <Text style={styles.storeHours}>LUNCH: 12PM - 4PM</Text>
              <Text style={styles.storeHours}>DINNER: 4PM - 11PM</Text>
              <Text style={styles.storeHours}>Bar: 12PM - 2AM</Text>
              <Text style={styles.storeHours}>HH: 3PM-7PM</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'tomato'}}>
            <Button color='white' onPress={() => Linking.openURL('tel:3478436486')}>Call</Button>
            <Button color='white' onPress={() => Linking.openURL('https://www.google.com/maps/place/2085+Bartow+Ave,+The+Bronx,+NY+10475/@40.8697287,-73.8299331,17z/data=!3m1!4b1!4m5!3m4!1s0x89c28cb85da85129:0xf447e9e1854d3292!8m2!3d40.8697287!4d-73.8277444')}>Maps</Button>
          </View>
          <View style={{margin:5}}>
            <Card/>
          </View>
          <View style={styles.map}> 
            <Map/> 
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  infoContainer: {
    justifyContent: 'center',
    width: screen.width,
    height: screen.width / 2,
    padding: 20
  },
  welcomPic: {
    height: screen.width / 2,
    width: screen.width,
    position: 'absolute',
    opacity: 0.90
  },

})