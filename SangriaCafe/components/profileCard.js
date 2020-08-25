import React from 'react'
import { Button, StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'

export default ProfileCard = props => {
    return props.user ?
    <View style={styles.userBar}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <View style={styles.userInfo}>
            <TouchableOpacity onPress={() => console.log('upload image')}>
                <Image source={{uri : props.user.image}} style={{height: 70, width: 70, borderRadius: 35}}/>
            </TouchableOpacity>
                <Text style={{fontSize:20}}>{props.user.name}</Text>
            </View>
            <View>
                <View style={styles.detailSection}>
                    <Text style={{fontSize:20}}>{props.user.title}</Text>
                    <Text>Toros Redeemed: {props.user.toros_spent}</Text>
                </View>
                <View style={styles.toroSection}>
                    <Text style={{fontSize:20}}>{props.user.toros} </Text>
                    <Image source={require('../assets/toro.png')} style={styles.toro}/>
                </View>
            </View>
        </View>
    </View>
    :
    <View style={styles.userBar}>
        <Button title='Sign In' onPress={() => console.log('pressed')}/>
    </View>
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