import React, { Component } from 'react'
import { View, Text, Button, SafeAreaView } from 'react-native'
import firestore from '@react-native-firebase/firestore'

class FirebaseApp extends Component {

    state = {
        user : {
            name : ''
        }
    }

    componentDidMount(){
        this.getUser()
    }

    getUser = async () => {
        this.subscriber = firestore().collection("users").doc("LGUWyTrTyT4Fgqhs7AsJ").onSnapshot(doc => {
            this.setState({
                user: { name : doc.data().name }
            })
        }) 
    }

    render() {
        return (
            <View>
                <SafeAreaView>
                    <Text> Name : {this.state.user.name} </Text>
                </SafeAreaView>
            </View>
        )
    }
}

export default FirebaseApp