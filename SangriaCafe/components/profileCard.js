import React, { useState, useEffect } from 'react'
import { Button, TextInput, StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'

export default ProfileCard = () => {

    const [initializing, setInitializing] = useState(true)
    const [authOptionsVisible, toggleOptions] = useState(false)
    const [loginIsVisible, toggleLogin] = useState(false)
    const [registerIsVisible, toggleRegister] = useState(false)
    const [user, setUser] = useState()
    const [email, changeEmail] = useState('')
    const [password, changePassword] = useState('')

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [])

    GoogleSignin.configure({
        webClientId:'256081369777-fsgdf80ojpi67pkj2pbv3o1coa7c6h55.apps.googleusercontent.com'
    })

    onAuthStateChanged = (user) => {
        setUser(user)
        if (initializing) setInitializing(false)
    }

    openAuthOptions = () => { 
        toggleLogin(false)
        toggleRegister(false)
        toggleOptions(true) 
    }

    chooseLogin = () => {
        toggleOptions(false)
        toggleRegister(false)
        toggleLogin(true)
    }
    
    chooseSignIn = () => {
        toggleOptions(false)
        toggleLogin(false)
        toggleRegister(true)
    }

    loginUser = (email, password) => {
        auth().signInWithEmailAndPassword(email, password)
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!')
                }
                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!')
                }
                if (error.code === 'auth/user-not-found') {
                    alert('No Account Found')
                }
                if (error.code === 'auth/wrong-password') {
                    alert('Incorrect Account Information Try Again')
                }
            })
    }   

    createUser = (email, password) => {
        auth().createUserWithEmailAndPassword(email, password)
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!')
                }
                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!')
                }
                if (error.code === 'auth/user-not-found') {
                    alert('No Account Found')
                }
                if (error.code === 'auth/wrong-password') {
                    alert('Incorrect Account Information Try Again')
                }
        })
    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            setUser(userInfo)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            } else if (error.code === statusCodes.IN_PROGRESS) {
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            } else { }
        }
    }

    onGoogleButtonPress = async () => {
        const { idToken } = await GoogleSignin.signIn()
        const googleCredential = auth.GoogleAuthProvider.credential(idToken)
        return auth().signInWithCredential(googleCredential)
    }

    return user ?
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
    :
    <View style={styles.userBar}>
        <Button title='Sign In' onPress={() => openAuthOptions()}/>
            { authOptionsVisible ? 
                <View>
                    <Button title='Login existing account' onPress={() => chooseLogin()}/>
                    <Button title='Register new account' onPress={() => chooseSignIn()}/>
                </View> : null }

            { loginIsVisible ? 
                <View style={styles.loginContainer}>
                    <TextInput style={styles.textInput}placeholder={'email'} autoCompleteType='email' onChangeText={changeEmail} value={email}/>
                    <TextInput style={styles.textInput} placeholder={'password'} onChangeText={changePassword} value={password}/>
                    <Button title='Login' style={{marginTop: 5}} onPress={() => loginUser(email, password)}/>
                    <Button title='SignIn with Google' style={{marginTop: 5}} onPress={() => onGoogleButtonPress()}/>
                </View> : null }
            
            { registerIsVisible ? 
                <View style={styles.registerContainer}>
                    <TextInput style={styles.textInput} placeholder={'email'} autoCompleteType='email' onChangeText={changeEmail} value={email}/>
                    <TextInput style={styles.textInput} placeholder={'password'} onChangeText={changePassword} value={password}/>
                    <Button title='Create new account' style={{marginTop: 5}} onPress={() => createUser(email, password)}/>
                    <Button title='Register with Google' style={{marginTop: 5}} onPress={() => onGoogleButtonPress()}/>
                </View> : null }

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
      },
      textInput: {
          justifyContent: 'center',
          alignItems: 'center',
          width: screen.width / 2,
          padding: 15
      }
})