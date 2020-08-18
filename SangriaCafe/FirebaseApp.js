import React, { Component } from 'react'
import { View, Text, Button, SafeAreaView } from 'react-native'
import firestore from '@react-native-firebase/firestore'

class FirebaseApp extends Component {

    state = {
        user : '' 
    }

    componentDidMount(){
        this.getUser()
    }

    getUser = async () => {
        this.subscriber = firestore().collection("users").doc("LGUWyTrTyT4Fgqhs7AsJ").onSnapshot(doc => {
            this.setState({
                user: doc.data()
            })
        }) 
    }

    render() {
        return (
            <View>
                <SafeAreaView>
                    <Text> Name : {this.state.user.name} </Text>
                    <Text> Email : {this.state.user.email} </Text>
                    <Text> Phone : {this.state.user.phone} </Text>
                </SafeAreaView>
            </View>
        )
    }
}

export default FirebaseApp