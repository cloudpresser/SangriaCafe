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

const instaToken = 'IGQVJXNVRIbDltaGU3ZAldSVHdnQ1lKcFBENDhxQ0N0RUg1LXZAQb1hPMEwzWkp3V0hrYjdXeGxkQUtKVEd2WGwwV3MxbXBoOFB1WXNEbVFqdzJrQzhtSUlXWXZAMS0hLQW9DU1FWLWRIMXlVa010SncxTwZDZD'

const mapApi = 'AIzaSyCWrz16D7gqe7fJNtT8iqs4sa3JdAcU5xA'

firebase.initializeApp(firebaseConfig)


export {firebaseConfig, instaToken, mapApi}

const Setup = () => {
    return <App/>
}

export default Setup