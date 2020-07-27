import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'

export default ProfileCard = () => {
    return (
        <View style={styles.userBar}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <View style={styles.userInfo}>
                    <Image source={require('../assets/toro_front.jpg')} style={{height: 70, width: 70, borderRadius: 35}}/>
                    <Text style={{fontSize:20}}>PardiHardi</Text>
                </View>
                <View>
                    <View style={styles.detailSection}>
                        <Text style={{fontSize:20}}>Matador</Text>
                        <Text>Toros Redeemed: 425</Text>
                        <Text>Last Order: Yesterday</Text>
                    </View>
                    <View style={styles.toroSection}>
                        <Text style={{fontSize:20}}>750 </Text>
                        <Image source={require('../assets/toro.png')} style={styles.toro}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const screen = Dimensions.get('window')
const styles = StyleSheet.create({
    userBar: {
        padding: 5,
        backgroundColor: 'white'
      },
      toroSection: {
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        flexDirection: 'row'
      },
      toro: {
        height: 28,
        width: 28
      },
      userInfo: {
        alignItems: 'center'
      },
      detailSection: {
          alignItems: 'flex-end',
          padding: 5
      }
})