import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import { StyleSheet, Linking, Dimensions, Text, View } from 'react-native';

const Map = () => {

    const [coords, setCoords] = useState([])

    useEffect( () => {
        findCoordinates()
    }, [] )

    const getDirections = () => {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=2085+Bartow+Ave+Bronx+NY`)
    }

    findCoordinates = async () => {
        await Geolocation.getCurrentPosition(
            position => {
                setCoords([
                    {
                        latitude : parseFloat(JSON.stringify(position.coords.latitude)),
                        longitude : parseFloat(JSON.stringify(position.coords.longitude))
                    },
                    {
                        latitude : 40.869730, 
                        longitude : -73.827740
                    }

                ])
            },
                error => alert(error.message),   
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 } 
        )
    }

    const directionsFetch = () => {
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${coords[0]}&destination=2085+Bartow+Ave+Bronx+NY&key=AIzaSyCWrz16D7gqe7fJNtT8iqs4sa3JdAcU5xA`)
            .then(resp => resp.json())
            .then(data => console.log(data))
    }

    const { width, height } = Dimensions.get('window')
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.008
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
    let mapRef = null
    let distance = null
    let duration = null

    return (
        <>
        <MapView 
            initialRegion={{latitude : 40.869730, longitude : -73.827740, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }} 
            style={styles.mapStyle}
            ref={(ref) => { mapRef = ref }}
            onLayout = {() => mapRef.fitToCoordinates(coords, { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, animated: true })}
        >
            <MapView.Marker coordinate={coords[0]} title={'You'}/>
            <MapView.Marker coordinate={coords[1]} title={'Sangria Cafe'}/>

                <MapViewDirections
                    origin={coords[0]}
                    destination={coords[1]}
                    apikey={'AIzaSyCWrz16D7gqe7fJNtT8iqs4sa3JdAcU5xA'}
                    mode={'DRIVING'}
                    strokeWidth={4}
                    strokeColor='cornflowerblue'

                    onReady={ result => {
                        distance = result.distance
                        duration = result.duration
                      }}
                />
        </MapView>
        <View>
            {/* <Text>{distance} kms</Text>
            <Text>{duration} mins</Text> */}
        </View>
        </>
    ) 
}

const styles = StyleSheet.create({
    mapStyle: {
        borderRadius: 10,
        width: '100%',
        height: 300,
        flex: 1,
        elevation: 10,
        shadowOffset: {width: 20, height: 25},
        shadowColor: 'black'
    }
})

export default Map