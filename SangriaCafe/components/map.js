import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import { StyleSheet, Dimensions, View, Text } from 'react-native';

const Map = () => {

    const [coords, setCoords] = useState([])
    const [distance, getDist] = useState()
    const [time, getTravelTime] = useState()

    useEffect( () => {
        findCoordinates()
    }, [] )

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
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

    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.008
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
    let mapRef = null

    return coords.length > 0 ? (
        <>
        <MapView 
            initialRegion={{latitude : 40.869730, longitude : -73.827740, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }} 
            style={styles.mapStyle}
            ref={(ref) => { mapRef = ref }}
            onLayout = {() => mapRef.fitToCoordinates(coords, { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, animated: true })}
        >
            <MapView.Marker coordinate={coords && coords[0]} title={'You'}/>
            <MapView.Marker coordinate={coords && coords[1]} title={'Sangria Cafe'}/>
            <Text style={{fontWeight: 'bold',fontSize: 18}}>{(parseFloat(distance) * 0.621371).toFixed(2)} miles </Text>
            <Text style={{fontWeight: 'bold',fontSize: 18}}>{parseFloat(time).toFixed(0)}min drive</Text>
                <MapViewDirections
                    origin={coords[0]}
                    destination={coords[1]}
                    apikey={'AIzaSyCWrz16D7gqe7fJNtT8iqs4sa3JdAcU5xA'}
                    mode={'DRIVING'}
                    strokeWidth={5}
                    strokeColor='cornflowerblue'

                    onReady={ result => {
                        getDist(result.distance)
                        getTravelTime(result.duration)
                      }}
                />
        </MapView>
        </>
    ) 
    :
    (
        <View>
            <Text>ALLOW LOCATION SERVICES TO GET DIRECTIONS</Text>
        </View>
    )
}

const { width, height } = Dimensions.get('window')
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