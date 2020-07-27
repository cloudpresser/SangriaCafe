import React, { useEffect, useState }from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, TextInput, ScrollView, Image, Linking } from 'react-native';

const Map = () => {

    const [userCoord, setCoords] = useState([])

    useEffect( () => {
        findCoordinates()
    }, [ userCoord ] )

    const getDirections = () => {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=2085+Bartow+Ave+Bronx+NY`)
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setCoords( [
                    parseFloat(JSON.stringify(position.coords.latitude)),
                    parseFloat(JSON.stringify(position.coords.longitude))
                ] )
            },
                error => Alert.alert(error.message),   
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 } 
        )
    }

    const coordinates = [
        {latitude : 40.869730, longitude : -73.827740},
        {latitude : userCoord[0], longitude : userCoord[1]}
    ]

    const directionsFetch = () => {
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${userCoord[0]}+${userCoord[1]}&destination=2085+Bartow+Ave+Bronx+NY&key=AIzaSyCWrz16D7gqe7fJNtT8iqs4sa3JdAcU5xA`)
            .then(resp => resp.json())
            .then(data => console.log(data))
    }

    return (
        <MapView initialRegion={{latitude : 40.869730, longitude : -73.827740, latitudeDelta: 0.006, longitudeDelta: 0.001 }} style={styles.mapStyle}>
            <MapView.Marker coordinate={coordinates[0]}/>
            <MapView.Marker coordinate={coordinates[1]}/>
            <MapViewDirections
                origin={coordinates[1]}
                destination={coordinates[0]}
                apikey={'AIzaSyCWrz16D7gqe7fJNtT8iqs4sa3JdAcU5xA'}
            />
        </MapView>
    ) 
}

const styles = StyleSheet.create({
    mapStyle: {
        width: 330,
        height: 300,
        borderRadius: 25
    }
})

export default Map