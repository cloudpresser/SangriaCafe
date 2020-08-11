import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, Button, TouchableOpacity } from 'react-native'
import ProfileCard from '../components/profileCard'

const Settings = props => {
    return(
        <>
        <SafeAreaView>
            <View style={styles.topContainer}>
                <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
            </View>

            <View>
                <ProfileCard />
          </View>
        </SafeAreaView>
        </>
    )
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
})

export default Settings