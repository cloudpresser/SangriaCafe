import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native'
import auth from '@react-native-firebase/auth'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) return null

  if (!user) {
    return (
        <SafeAreaView>
        <View>
          <Text> Welcome back </Text>
    
          <TextInput
            placeholder='email'
            returnKeyType="next"
            value={''}
            onChangeText={text => console.log(text)}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
    
          <TextInput
            placeholder='password'
            returnKeyType="done"
            value={''}
            onChangeText={text => setPassword({ value: text, error: '' })}
            secureTextEntry
          />
    
          <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => console.log('pressed')}>
              <Text style={styles.label}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
    
          <Button mode="contained" onPress={() => console.log('pressed')} title='Login'/>
    
          <View style={styles.row}>
            <Text style={styles.label}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>
      )
  }

  return (
    <View>
        <Home user={user}/>
    </View>
  )
}

const styles = StyleSheet.create({

  })

export default Login