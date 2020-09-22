import React from 'react'
import App from './App'
import firebase from '@react-native-firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyCWrz16D7gqe7fJNtT8iqs4sa3JdAcU5xA',
    webClientId: '256081369777-fsgdf80ojpi67pkj2pbv3o1coa7c6h55.apps.googleusercontent.com',
    authDomain: 'sangriacafe.firebaseapp.com',
    databaseURL: 'https://sangriacafe.firebaseio.com',
    projectId: 'sangriacafe',
    storageBucket: 'sangriacafe.appspot.com',
    appId: '1:256081369777:ios:2df817ec6b031c17ea2090',
    offlineAccess: true,
    forceCodeForRefreshToken: true
}

const instaToken = 'IGQVJWWjJldEhjVWZAsV1ZADd0ZAZAQmN1T0FmUFkwWmZAvTFFZAX3E2Uzgtd1cxRURjcDdwdkh6TmNRcWlnekpxSXBTQ1NCbFZAXdGhmbUllOXRsNVQyQVdFNEwzd1ZAXYjd5QjBvYWdhOVM1Q29VZAXRyRlo3ZAQZDZD'

const mapApi = 'AIzaSyCWrz16D7gqe7fJNtT8iqs4sa3JdAcU5xA'

export {firebaseConfig, instaToken, mapApi}

const Setup = () => {
    {firebase.initializeApp(firebaseConfig)}
    return <App/>
}

export default Setup