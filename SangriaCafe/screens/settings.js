import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { TextInput, Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin'

const Settings = () => {

    const [initializing, setInitializing] = useState(true)
    const [authOptionsVisible, toggleOptions] = useState(false)
    const [loginIsVisible, toggleLogin] = useState(false)
    const [registerIsVisible, toggleRegister] = useState(false)
    const [updateVisible, toggleUpdate] = useState(false)
    const [user, setUser] = useState({})
    const [email, changeEmail] = useState('')
    const [password, changePassword] = useState()
    const [name, changeName] = useState('')
    const [phone, changePhone] = useState('')
    const [address, changeAddress] = useState('')
    const [date, changeDate] = useState('')

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [])
    
    onAuthStateChanged = (user) => {
        setUser(user)
        if (initializing) setInitializing(false)
    }

    GoogleSignin.configure({
        webClientId:'256081369777-fsgdf80ojpi67pkj2pbv3o1coa7c6h55.apps.googleusercontent.com',
        offlineAccess: true,
        hostedDomain: 'sangriacafe.firebaseapp.com',
        databaseURL: 'https://sangriacafe.firebaseio.com',
        projectId: 'sangriacafe',
        storageBucket: 'sangriacafe.appspot.com',
        forceCodeForRefreshToken: true
    })

    onGoogleButtonPress = async () => {
        const { idToken } = await GoogleSignin.signIn()
        const googleCredential = auth.GoogleAuthProvider.credential(idToken)
        return auth().signInWithCredential(googleCredential)
    }

    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          this.setState({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
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
            if (error.code === 'auth/weak-password') {
                alert('Missing or Weak Password')
            }
        })
    }

    updateProfile = () => {
        auth().currentUser.updateProfile({
            displayName: name,
            email: email,
            phoneNumber: phone
        })
        console.log(auth().currentUser)
    }

    onGoogleButtonPress = async () => {
        const { idToken } = await GoogleSignin.signIn()
        const googleCredential = auth.GoogleAuthProvider.credential(idToken)
        return auth().signInWithCredential(googleCredential)
    }

    postNewUser = () => {

    }

    logoff = () => { auth().signOut() }

    if (initializing) return null

    return(
        <>
        <SafeAreaView>
            <View style={styles.topContainer}>
                <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
            </View>
        <ScrollView>

        { user ?
            <View>
                <View style={styles.loggedInUserBar}>
                    <View style={{flexDirection: 'row', justifyContent:'space-around', alignItems: 'center'}}>
                        <View style={styles.userInfo}>
                        <TouchableOpacity onPress={() => console.log('upload image')}>
                            <Image source={{uri : user.image}} style={{height: 70, width: 70, borderRadius: 35}}/>
                        </TouchableOpacity>
                            <Text style={{fontSize:20}}>{user.displayName}</Text>
                        </View>
                        <View>
                            <View style={styles.detailSection}>
                                <Text style={{fontSize:20}}>{user.title}</Text>
                                <Text>{user.toros ? user.toros : 0}</Text>
                            </View>
                            <View style={styles.toroSection}>
                                <Text style={{fontSize:20}}>{user.toros} </Text>
                                <Image source={require('../assets/toro.png')} style={styles.toro}/>
                            </View>
                        </View>
                    </View>
                </View>
                { updateVisible ? 
                    <View style={styles.container}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput placeholder={user.email} autoCompleteType='email' onChangeText={changeEmail} value={email}/>
                        <Text style={styles.text}>Name</Text>
                        <TextInput placeholder={user.displayName} autoCompleteType='name' onChangeText={changeName} value={name}/>
                        <Text style={styles.text}>Phone</Text>
                        <TextInput placeholder={user.phoneNumber} onChangeText={changePhone} value={phone}/>
                        <Text style={styles.text}>Address</Text>
                        <TextInput placeholder={user.address} autoCompleteType='street-address' onChangeText={changeAddress} value={address}/>
                        <Text style={styles.text}>Birthday</Text>
                        <DatePicker
                            style={{width: 200}}
                            date={date}
                            mode="date"
                            placeholder={user.birthday ? user.birthday : '01-01-1920'}
                            format="DD-MM-YYYY"
                            minDate="01-01-1920"
                            maxDate="01-01-2021"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={changeDate} />
                        <Button mode='contained' color='tomato' style={{margin:10}} onPress={() => updateProfile(email, password)}>Update</Button>
                    </View>: null }
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <Button style={{margin: 5, width: screen.width / 4}} color='tomato' mode="contained" onPress={() => console.log('Pressed')}>Card</Button>
                    <Button style={{margin: 5, width: screen.width / 4}} color='tomato' mode="contained" onPress={updateVisible ? () => toggleUpdate(false):() => toggleUpdate(true)}>Info</Button>
                    <Button style={{margin: 5, width: screen.width / 4}} color='tomato' mode="contained" onPress={() => logoff()}>Logoff</Button> 
                </View>
            </View>
                : 
            <View style={styles.userBar}>
                <Button onPress={() => openAuthOptions()}> {loginIsVisible || registerIsVisible ? 'Back':'Sign In'} </Button>
                { authOptionsVisible ? 
                    <View>
                        <Button onPress={() => chooseLogin()}> Already have an account? </Button>
                        <Button onPress={() => chooseSignIn()}> New account </Button>
                    </View> : null }
                { loginIsVisible ? 
                    <View style={styles.container}>
                        <TextInput placeholder={'email'} autoCompleteType='email' onChangeText={changeEmail} value={email}/>
                        <TextInput placeholder={'password'} secureTextEntry={true} onChangeText={changePassword} value={password}/>
                        <Button style={{marginTop: 5}} onPress={() => loginUser(email, password)}>Login</Button>
                        <GoogleSigninButton style={{ width: 192, height: 48, alignSelf
                    : 'center' }} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={() => signIn()} />
                    </View> : null }
                
                { registerIsVisible ? 
                    <View style={styles.container}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput placeholder={'email'} autoCompleteType='email' onChangeText={changeEmail} value={email}/>
                        <Text style={styles.text}>Password</Text>
                        <TextInput placeholder={'password'} secureTextEntry={true} onChangeText={changePassword} value={password}/>
                        <Text style={styles.text}>Name</Text>
                        <TextInput placeholder={'name'} autoCompleteType='name' onChangeText={changeName} value={name}/>
                        <Text style={styles.text}>Phone</Text>
                        <TextInput placeholder={'phone number'} autoCompleteType='tel' onChangeText={changePhone} value={phone}/>
                        <Text style={styles.text}>Address</Text>
                        <TextInput placeholder={'address'} autoCompleteType='street-address' onChangeText={changeAddress} value={address}/>
                        <Text style={styles.text}>Birthday</Text>
                        <DatePicker
                            style={{width: 200}}
                            date={date}
                            mode="date"
                            placeholder={'your birthday'}
                            format="DD-MM-YYYY"
                            minDate="01-01-1920"
                            maxDate="01-01-2021"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={changeDate} />
                            <Button mode='contained' color='tomato' style={{margin: 10}} onPress={() => createUser(email, password)}>Create New Account</Button>
                            <GoogleSigninButton style={{ width: 192, height: 48, alignSelf: 'center' }} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={() => signIn()} />
                    </View>  : null }
                </View> 
        }
        </ScrollView>
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
    toroSection: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
    },
    toro: {
        height: 28,
        width: 28
    },
    container: {
        margin: 10
    },
    text: {
        fontWeight: 'bold',
        margin: 5
    },
    userBar: {
        height: screen.height / 1.3,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    loggedInUserBar: {
        margin: 20,      
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

export default Settings