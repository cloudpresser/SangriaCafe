import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions } from 'react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import { Button, TextInput } from 'react-native-paper'

const LoginApp = () => {

  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [loginIsVisible, toggleLogin] = useState(false)
  const [registerIsVisible, toggleRegister] = useState(false)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  onAuthStateChanged = (user) => {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  GoogleSignin.configure({
    webClientId: '256081369777-fsgdf80ojpi67pkj2pbv3o1coa7c6h55.apps.googleusercontent.com'
  })

  loginUser = (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
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
    auth()
      .createUserWithEmailAndPassword(email, password)
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

  logoff = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
  }

    onGoogleButtonPress = async () => {
      const { idToken } = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      return auth().signInWithCredential(googleCredential)
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
      } else {
      }
    }
  }

  if (initializing) return null

  chooseLogin = () => {
    toggleRegister(false)
    toggleLogin(true)
  }

  chooseSignIn = () => {
    toggleLogin(false)
    toggleRegister(true)
  }

  if (!user) {
    return (
      <SafeAreaView>
        <View style={styles.topContainer}>
          <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
        </View>
        <View style={styles.container}>

          <Button style={{textAlign: 'center', justifyContent: 'center', margin: 20}} onPress={() => chooseLogin()}>Sign In</Button>

          {loginIsVisible ? 
            <View style={styles.loginContainer}>
              <TextInput placeholder={'email'} autoCompleteType='email' onChangeText={changeEmail} value={email}/>
              <TextInput placeholder={'password'} onChangeText={changePassword} value={password}/>
              <Button mode="contained" style={{marginTop: 5}} onPress={() => loginUser(email, password)}>Submit</Button>
              <Button mode="contained" style={{marginTop: 5}} onPress={() => onGoogleButtonPress()}>Google Signin</Button>
            </View> : null }

          <Button style={{textAlign: 'center', justifyContent: 'center', margin: 20}} onPress={() => chooseSignIn()}>Register</Button>

          {registerIsVisible ? 
            <View style={styles.registerContainer}>
              <TextInput placeholder={'email'} autoCompleteType='email' onChangeText={changeEmail} value={email}/>
              <TextInput placeholder={'password'} onChangeText={changePassword} value={password}/>
              <Button mode="contained" style={{marginTop: 5}}onPress={() => createUser(email, password)}>Submit</Button>
              <Button mode="contained" style={{marginTop: 5}} onPress={() => onGoogleButtonPress()}>Google Signin</Button>
            </View> : null }

        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.topContainer}>
        <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
      </View>
      <View>
        <Text>Welcome {user.email}</Text>
        <Button style={{margin: 5}} mode="contained" onPress={() => logoff()}>Logoff</Button>
      </View>
    </SafeAreaView>
  )
}

const screen = Dimensions.get('window')
const styles = StyleSheet.create({
    topContainer: {
      alignItems: 'center',
      marginTop: 1,
      marginBottom: 10,
    },
    logo: {
      height: screen.width / 4,
      width: screen.width / 1.7,
    },
    container: {
      height: screen.height,
      margin: 20,
      borderRadius: 10,
      alignItems: 'center'
    },
    loginContainer: {
      height: screen.height / 4,
      width: screen.width / 1.3,
    },
    registerContainer: {
      height: screen.height / 4,
      width: screen.width / 1.3
    }
})

export default LoginApp