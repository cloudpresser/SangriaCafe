import React from 'react'
import App from './App'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

const firebaseConfig = {
    apiKey: 'AIzaSyCWrz16D7gqe7fJNtT8iqs4sa3JdAcU5xA',
    webClientId: '256081369777-fsgdf80ojpi67pkj2pbv3o1coa7c6h55.apps.googleusercontent.com',
    authDomain: 'sangriacafe.firebaseapp.com',
    databaseURL: 'https://sangriacafe.firebaseio.com',
    projectId: 'sangriacafe',
    storageBucket: 'sangriacafe.appspot.com',
    appId: '1:256081369777:ios:2df817ec6b031c17ea2090'
}

if (!firebase.app.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase, auth, database}

const Setup = () => {
    return <App/>
}

export default Setup