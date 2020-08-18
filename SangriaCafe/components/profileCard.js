import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'

export default ProfileCard = () => {

    const [ user, setUser ] = useState({})

    useEffect( () => {
        getUser()
    })

    getUser = async () => {
        firestore().collection("users").doc("LGUWyTrTyT4Fgqhs7AsJ").onSnapshot(doc => {
            setUser( doc.data() )
        }) 
    }

    return (
        <View style={styles.userBar}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <View style={styles.userInfo}>
                <TouchableOpacity onPress={() => console.log('upload image')}>
                    <Image source={{uri : user.image}} style={{height: 70, width: 70, borderRadius: 35}}/>
                </TouchableOpacity>
                    <Text style={{fontSize:20}}>{user.name}</Text>
                </View>
                <View>
                    <View style={styles.detailSection}>
                        <Text style={{fontSize:20}}>{user.title}</Text>
                        <Text>Toros Redeemed: {user.toros_spent}</Text>
                    </View>
                    <View style={styles.toroSection}>
                        <Text style={{fontSize:20}}>{user.toros} </Text>
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