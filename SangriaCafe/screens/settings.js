import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native'
import { firebaseConfig } from '../Setup'
import { TextInput, Button } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'

const Settings = () => {

    const [initializing, setInitializing] = useState(true)
    const [authOptionsVisible, toggleOptions] = useState(false)
    const [loginIsVisible, toggleLogin] = useState(false)
    const [registerIsVisible, toggleRegister] = useState(false)
    const [updateVisible, toggleUpdate] = useState(false)
    const [userAuth, setUser] = useState({})
    const [userCloud, setCloudUser] = useState({})
    const [email, changeEmail] = useState('')
    const [password, changePassword] = useState()
    const [name, changeName] = useState('')
    const [phone, changePhone] = useState('')
    const [address, changeAddress] = useState('')

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [])
    
    onAuthStateChanged = async (user) => {
        setUser(user)
        if (user) { 
            const cloudUser = await firestore()
            .collection("users")
            .where('email', '==', user.email)
            .get()
            console.log('currentUser', user)
            console.log('CLOUD USER QUERY', cloudUser)
            console.log('AUTH USER', userAuth)
            console.log('CLOUD USER', userCloud._docs[0]._data)
            setCloudUser(cloudUser._docs[0]._data)
        }
        if (initializing) setInitializing(false)
    }

    GoogleSignin.configure({
        webClientId: firebaseConfig.webClientId
    })

    onGoogleButtonPress = async () => {
        const { idToken } = await GoogleSignin.signIn()
        const googleCredential = auth.GoogleAuthProvider.credential(idToken)
        return auth().signInWithCredential(googleCredential)
    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            setUser({ userInfo })
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert(error)
            } else {
                console.log(error)
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

    createUser = async (email, password) => {
        await auth().createUserWithEmailAndPassword(email, password)
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
        }).then( addNewUserToCloud() )
    }

    addNewUserToCloud = () => {
        firestore().collection('users').add({
            'email': email,
            'name': name,
            'phoneNumber': phone,
            'toros': 0,
            'toros_spent': 0
        })
    }

    updateUser = async () => {
        await firestore()
        .collection('users')
        .where('name', '==', [userAuth.displayName])
        .update({
            'email': email,
            'name': name,
            'phoneNumber': phone,
        })
    }

    logoff = () => { 
        setUser({})
        setCloudUser({})
        auth().signOut() 
    }

    if (initializing) return null

    return(
        <>
        <SafeAreaView>
            <View style={styles.topContainer}>
                <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
            </View>

        { userAuth ?
            <View>
                <View style={styles.loggedInUserBar}>
                    <View style={{flexDirection: 'row', justifyContent:'space-around', alignItems: 'center'}}>
                        <View style={styles.userInfo}>
                        <TouchableOpacity onPress={() => console.log('upload image')}>
                            <Image source={{uri : 'https://www.meme-arsenal.com/memes/2f4dac5a8fc9ac9e24d7ceb1cf24e334.jpg'}} style={{height: 70, width: 70, borderRadius: 35}}/>
                        </TouchableOpacity>
                            <Text style={{fontSize:20}}>{'name'}</Text>
                        </View>
                        <View>
                            <View style={styles.detailSection}>
                                <Text style={{fontSize:20}}>{'title'}</Text>
                                <Text>{'toros'}</Text>
                            </View>
                            <View style={styles.toroSection}>
                                <Text style={{fontSize:20}}>{'toros_spent'} </Text>
                                <Image source={require('../assets/toro.png')} style={styles.toro}/>
                            </View>
                        </View>
                    </View>
                </View>
                { updateVisible ? 
                    <View style={styles.container}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput placeholder={userAuth.email} autoCompleteType='email' onChangeText={changeEmail} value={email}/>
                        <Text style={styles.text}>Name</Text>
                        <TextInput placeholder={userAuth.displayName} autoCompleteType='name' onChangeText={changeName} value={name}/>
                        <Text style={styles.text}>Phone</Text>
                        <TextInput placeholder={userCloud.phoneNumber} onChangeText={changePhone} value={phone}/>
                        <Text style={styles.text}>Address</Text>
                        <TextInput placeholder={userCloud.address} autoCompleteType='street-address' onChangeText={changeAddress} value={address}/>
                        <Button mode='contained' color='tomato' style={{margin:10}} onPress={() => updateUser()}>Update</Button>
                    </View> : null }
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <Button style={{margin: 5, width: screen.width / 4}} color='tomato' mode="contained" onPress={() => console.log('Pressed')}>Card</Button>
                    <Button style={{margin: 5, width: screen.width / 4}} color='tomato' mode="contained" onPress={updateVisible ? () => toggleUpdate(false):() => toggleUpdate(true)}>Info</Button>
                    <Button style={{margin: 5, width: screen.width / 4}} color='tomato' mode="contained" onPress={() => logoff()}>Logoff</Button> 
                </View>
            </View>
                : 
            <View style={styles.userBar}>
                <Button onPress={() => openAuthOptions()} mode='contained' color='tomato'> {loginIsVisible || registerIsVisible ? 'Back':'Sign In'} </Button>
                { authOptionsVisible ? 
                    <View>
                        <Button onPress={() => chooseLogin()} color='tomato'> Already have an account? </Button>
                        <Button onPress={() => chooseSignIn()} color='tomato'> New account </Button>
                    </View> : null }
                { loginIsVisible ? 
                    <View style={styles.container}>
                        <TextInput placeholder={'email'} autoCompleteType='email' onChangeText={changeEmail} value={email}/>
                        <TextInput placeholder={'password'} secureTextEntry={true} onChangeText={changePassword} value={password}/>
                        <Button style={{marginTop: 5}} onPress={() => loginUser(email, password)} color='tomato'>Login</Button>
                        <GoogleSigninButton style={{ width: 192, height: 48, alignSelf: 'center' }} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={() => signIn()} />
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
                        <Button mode='contained' color='tomato' style={{margin: 10}} onPress={() => createUser(email, password)}>Create New Account</Button>
                        <GoogleSigninButton style={{ width: 192, height: 48, alignSelf: 'center' }} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={() => signIn()} />
                    </View>  : null }
            </View> 
        }
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
        alignItems: 'center'
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
        padding: 10,
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