import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, ScrollView } from 'react-native'
import ProfileCard from '../components/profileCard'
import DatePicker from 'react-native-datepicker'
import { TextInput, Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'

const Settings = props => {

    const [email, changeEmail] = useState('')
    const [name, changeName] = useState('')
    const [phone, changePhone] = useState('')
    const [address, changeAddress] = useState('')
    const [date, changeDate] = useState('')

    logoff = () => {
        auth()
          .signOut()
          .then(() => console.log('User signed out!'));
    }

    return(
        <>
        <SafeAreaView>
            <View style={styles.topContainer}>
                    <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
            </View>
        <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false} contentInset={{bottom: 100}}>
            <View>
                <ProfileCard />
            </View>

            <View style={styles.container}>
                <Text style={styles.text}>Email</Text>
                <TextInput placeholder={props.user.email} autoCompleteType='email' onChangeText={changeEmail} value={email}/>
                <Text style={styles.text}>Name</Text>
                <TextInput placeholder={props.user.name} autoCompleteType='name' onChangeText={changeName} value={name}/>
                <Text style={styles.text}>Phone</Text>
                <TextInput placeholder={(props.user.phone).toString()} autoCompleteType='tel' onChangeText={changePhone} value={phone}/>
                <Text style={styles.text}>Address</Text>
                <TextInput placeholder={props.user.title} autoCompleteType='street-address' onChangeText={changeAddress} value={address}/>
                <Text style={styles.text}>Birthday</Text>
                <DatePicker
                    style={{width: 200}}
                    date={date}
                    mode="date"
                    placeholder={props.user.birthday.month}
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
            </View>
            <Button style={{margin: 5}} mode="contained" onPress={() => console.log('Pressed')}>
                Card Info
            </Button>
            <Button style={{margin: 5}} mode="contained" onPress={() => console.log('Pressed')}>
                Save
            </Button>
            <Button style={{margin: 5}} mode="contained" onPress={() => logoff()}>
                Logoff
            </Button>
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
    container: {
        margin: 10
    },
    text: {
        fontWeight: 'bold',
        margin: 5
    }
})

export default Settings