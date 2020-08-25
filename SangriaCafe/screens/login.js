import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { Button, TextInput } from 'react-native-paper'

const LoginApp = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  // Handle user state changes
  onAuthStateChanged = (user) => {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  GoogleSignin.configure({
    webClientId: '256081369777-7ggtcqah231jts00g6f2gnak4359b34h.apps.googleusercontent.com',
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

  logoff = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  if (initializing) return null

  if (!user) {
    return (
      <SafeAreaView>
        <View style={styles.topContainer}>
          <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
        </View>
        <View style={styles.container}>
          <Text>Log In</Text>
          <TextInput placeholder={'email'} autoCompleteType='email' onChangeText={changeEmail} value={email}/>
          <TextInput placeholder={'password'} onChangeText={changePassword} value={password}/>
          <Button style={{margin: 5}} mode="contained" onPress={() => loginUser(email, password)}>Submit</Button>
          <TouchableOpacity onPress={() => console.log('pressed')}>
            <Text style={{textAlign: 'center', justifyContent: 'center', margin: 20}}>Sign In</Text>
          </TouchableOpacity>
          <Button
            title="Google Sign-In"
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
          />
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
      height: screen.height /1.5,
      margin: 20,
      justifyContent: 'center',
      borderRadius: 10
    }
})

export default LoginApp