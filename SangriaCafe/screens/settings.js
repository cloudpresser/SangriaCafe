import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
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
            const cloudUser = await firestore()
                .collection("users")
                .where('email', '==', user.email)
                .get()
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
            'address': address,
            'toros': 0,
            'toros_spent': 0,
            'image': 'https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png'
        })
    }

    updateUser = async () => {
        await firestore()
        .collection('users')
        .doc(userCloudRefId)
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
        const image = {
            uri: response.uri,
            type: 'image/jpeg',
            name: 'myImage' + '-' + Date.now() + '.jpg'
        }

        const imagePickerOptions = {
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        }

        const imgBody = new FormData()

        const url = `http://your-api.com/image-upload`

        fetch(url, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: imgBody
        }).then(res => res.json()).then(results => {
            const source = { uri: res.imageUrl, isStatic: true }
            const images = this.state.images
            images[index] = source
            this.setState({ images })
        }).catch(error => {
            console.error(error)
        })

        ImagePicker.showImagePicker(imagePickerOptions, (response) => {
            console.log('Response = ', response)
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else {
                const source = response.data
                setImageSource( source )
            }
        })
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
                    <View style={{flexDirection: 'row', justifyContent:'space-around', alignItems: 'center'}}>
                        <View>
                            <View style={styles.detailSection}>
                            <Text style={{fontSize:20}}>{userCloud.name}</Text>
                                <Text>{userCloud.toros == 0 ?'Welcome to Sangria Cafe App' : userCloud.toros }</Text>
                            </View>
                            <View style={styles.toroSection}>
                                <Image source={require('../assets/toro.png')} style={styles.toro}/>
                                <Text style={{fontSize:20}}>  {userCloud.toros_spent}</Text>
                            </View>
                        </View>
                        <View style={styles.userInfo}>
                        <TouchableOpacity onPress={() => getImage()}>
                            <Image source={{uri : userCloud.image}} style={{height: 90, width: 90, borderRadius: 45}}/>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
                { updateVisible ? 
                    <View style={styles.container}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput placeholder={userAuth.email} autoCompleteType='email' autoCapitalize='none' onChangeText={changeEmail} value={email}/>
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
                    <Button style={{margin: 5, width: screen.width / 4}} color='tomato' mode="contained" onPress={updateVisible ? () => toggleUpdate(false):() => toggleUpdate(true)}>{updateVisible ? 'Close' : 'Info'}</Button>
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