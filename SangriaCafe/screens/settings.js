import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import { firebaseConfig } from '../Setup'
import { TextInput, Button } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'
import Specials from '../components/specialsCard'

const Settings = () => {

    const [initializing, setInitializing] = useState(true)
    const [authOptionsVisible, toggleOptions] = useState(false)
    const [loginIsVisible, toggleLogin] = useState(false)
    const [registerIsVisible, toggleRegister] = useState(false)
    const [updateVisible, toggleUpdate] = useState(false)
    const [userAuth, setUser] = useState({})
    const [userCloud, setCloudUser] = useState({})
    const [userCloudRefId, setCloudID] = useState()
    const [email, changeEmail] = useState('')
    const [password, changePassword] = useState()
    const [name, changeName] = useState('')
    const [phone, changePhone] = useState('')
    const [address, changeAddress] = useState('')
    const [imageSource, setImageSource] = useState()

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [])
    
    onAuthStateChanged = async (user) => {
        setUser(user)
        if (user) { 
            const cloudUser = await firestore().collection("users")
                .where('email', '==', user.email).get()
            setCloudUser(cloudUser._docs[0]._data)
            setCloudID(cloudUser._docs[0]._ref._documentPath._parts[1])
            changeEmail(cloudUser._docs[0]._data.email)
            changeName(cloudUser._docs[0]._data.name)
            changePhone(cloudUser._docs[0]._data.phoneNumber)
            changeAddress(cloudUser._docs[0]._data.address)
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
            const cloudUser = firestore().collection('users')
                .where('email', '==', userInfo.user.email).get()
            cloudUser === undefined ? 
                await auth().createUserWithEmailAndPassword(userInfo.user.email, 'password123').then(
                    firestore().collection('users').add({
                    'email': userInfo.user.email,
                    'name': userInfo.user.name,
                    'phoneNumber': '',
                    'address': '',
                    'toros': 0,
                    'toros_spent': 0,
                    'image': userInfo.user.photo })
                ) : loginUser(userInfo.user.email, 'password123')
            onAuthStateChanged(userInfo.user)
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

    loginUser = (email, password) => {
        let lowerEmail = email.toLowerCase()
        auth().signInWithEmailAndPassword(lowerEmail, password)
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
        addNewUserToCloud()
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
        })
    }

    addNewUserToCloud = async () => {
        await firestore().collection('users').add({
            'email': email,
            'name': name,
            'phoneNumber': phone,
            'address': address,
            'toros': 0,
            'toros_spent': 0,
            'image': 'https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png'
        })
    }

    updateImage = async () => {
        await firestore().collection('users')
            .doc(userCloudRefId).update({ 'image': imageSource })
        onAuthStateChanged(userAuth)
    }

    updateUser = async () => {
        await firestore().collection('users')
            .doc(userCloudRefId).update({
                'email': email,
                'name': name,
                'phoneNumber': phone,
                'address': address
            })
        onAuthStateChanged(userAuth)
    }

    logoff = () => { 
        auth().signOut() 
        setUser({})
        setCloudUser({})
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
    const getImage = () => {
        const imagePickerOptions = {
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        }

        ImagePicker.showImagePicker(imagePickerOptions, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else {
                const source = decodeURI(response.uri)
                const reference = storage().ref(source)
                const pathToFile = source
                await reference.putFile(pathToFile)
                const url = await storage()
                    .ref(source)
                    .getDownloadURL()
                setImageSource( url )
                updateImage()
            }
        })
    }

    const title = toros => { 
        if (toros >= 90880) return 'Matador 🥇'
        if (toros >= 22720) return 'Picador 🥈'
        if (toros >= 5680) return 'Banderillero 🥉'
        if (toros >= 1420) return 'Mozo de Espada ⚔️'
        if (toros < 1420) return 'Ayuda'
    }

    return(
        <>
        <SafeAreaView>
            <View style={styles.topContainer}>
                <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
            </View>

        { userAuth ?
            <View>
                <View style={styles.loggedInUserBar}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <TouchableOpacity onPress={() => getImage()}>
                                <Image source={{uri : userCloud.image}} style={{height: 90, width: 90, borderRadius: 45}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.detailSection}>
                            <Text>{title(userCloud.toros_spent)}</Text>
                            <Text style={{fontSize:24, textAlign: 'center'}}>{userCloud.name}</Text>
                            <View style={styles.toroSection}>
                                <Image source={require('../assets/toro.png')} style={styles.toro}/>
                                <Text style={{fontSize:24, textAlign: 'center'}}>{userCloud.toros}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            
                <KeyboardAvoidingView behavior="position">
                { updateVisible ? 
                    <View style={styles.container}>
                        <Text style={styles.text}>Total Toros Used: {userCloud.toros_spent}</Text>                        
                        <Text style={styles.text}>Email</Text>
                        <TextInput placeholder={userAuth.email} autoCompleteType='email' autoCapitalize='none' onChangeText={changeEmail} value={email}/>
                        <Text style={styles.text}>Name</Text>
                        <TextInput placeholder={userAuth.displayName} autoCompleteType='name' onChangeText={changeName} value={name}/>
                        <Text style={styles.text}>Phone</Text>
                        <TextInput placeholder={userCloud.phoneNumber} onChangeText={changePhone} value={phone}/>
                        <Text style={styles.text}>Address</Text>
                        <TextInput placeholder={userCloud.address} autoCompleteType='street-address' onChangeText={changeAddress} value={address}/>
                        <Button mode='contained' color='tomato' style={{margin:10}} onPress={() => updateUser()}>Update</Button>
                    </View> : null}

                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <Button style={{margin: 5, width: screen.width / 4}} color='tomato' onPress={() => console.log('Pressed')}>Card</Button>
                    <Button style={{margin: 5, width: screen.width / 4}} color='tomato' onPress={updateVisible ? () => toggleUpdate(false):() => toggleUpdate(true)}>{updateVisible ? 'Close' : 'Info'}</Button>
                    <Button style={{margin: 5, width: screen.width / 4}} color='tomato' onPress={() => logoff()}>Logoff</Button> 
                </View>
                { updateVisible ? null :
                    <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false} contentInset={{top: 0, left: 0, bottom: 108, right: 0}}> 
                        <Specials/>
                    </ScrollView> } 
                </KeyboardAvoidingView>
            </View>
                : 
            <View style={styles.userBar}>
                <Button onPress={() => openAuthOptions()} mode='contained' color='tomato'> {loginIsVisible || registerIsVisible ? 'Back':'Sign In'} </Button>

                { authOptionsVisible ? 
                    <View>
                        <Button onPress={() => chooseLogin()} color='tomato'> Already have an account? </Button>
                        <Button onPress={() => chooseSignIn()} color='tomato'> New account </Button>
                    </View> : null }

                { loginIsVisible || registerIsVisible ? null :
                    <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false} contentInset={{top: 0, left: 0, bottom: 108, right: 0}}> 
                        <Specials/>
                    </ScrollView> } 

                { loginIsVisible ? 
                    <View style={styles.container}>
                        <TextInput placeholder={'email'} autoCompleteType='email' onChangeText={changeEmail} value={email}/>
                        <TextInput placeholder={'password'} secureTextEntry={true} onChangeText={changePassword} value={password}/>
                        <Button style={{marginTop: 5}} onPress={() => loginUser(email, password)} color='tomato'>Login</Button>
                        <GoogleSigninButton style={{ width: 192, height: 48, alignSelf: 'center' }} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={() => signIn()} />
                    </View> : null }
                
                <KeyboardAvoidingView behavior="position">
                { registerIsVisible ? 
                    <View style={styles.container}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput placeholder={'email'} autoCompleteType='email' onChangeText={changeEmail} autoCapitalize='none' value={email}/>
                        <Text style={styles.text}>Password</Text>
                        <TextInput placeholder={'password'} secureTextEntry={true} onChangeText={changePassword} value={password}/>
                        <Text style={styles.text}>Name</Text>
                        <TextInput placeholder={'name'} autoCompleteType='name' onChangeText={changeName} value={name}/>
                        <Text style={styles.text}>Phone</Text>
                        <TextInput placeholder={'phone number'} autoCompleteType='tel' onChangeText={changePhone} value={phone}/>
                        <Text style={styles.text}>Address</Text>
                        <TextInput placeholder={'address'} autoCompleteType='street-address' onChangeText={changeAddress} value={address}/>
                        <Button mode='contained' color='tomato' style={{margin: 10}} onPress={() => createUser(email, password)}>Create New Account</Button>
                        <GoogleSigninButton style={{ width: 192, height: 48, alignSelf: 'center' }} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={() => signIn()} />
                    </View>  : null }
                </KeyboardAvoidingView>
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
        alignItems: 'center',
        flexDirection: 'row'
    },
    toro: {
        height: 22,
        width: 22,
        margin: 5
    },
    container: {
        margin: 5
    },
    text: {
        fontWeight: 'bold',
        margin: 5
    },
    userBar: {
        padding: 10,
    },
    loggedInUserBar: {
        marginTop: 10,
        marginBottom: 10,
    },
    detailSection: {
        padding: 10,
        alignItems: 'center'
    },
    textInput: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 2,
        padding: 15
    }
})

export default Settings