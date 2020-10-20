import React, {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import {StyleSheet, Dimensions, Text} from 'react-native';
import {mapApi} from '../Setup';

const Map = () => {
  const [coords, setCoords] = useState([]);
  const [distance, getDist] = useState();
  const [time, getTravelTime] = useState();

  useEffect(() => {
    findCoordinates();
  }, []);

  findCoordinates = async () => {
    Geolocation.setRNConfiguration({authorizationLevel: 'whenInUse'});
    const granted = Geolocation.requestAuthorization;
    if (granted) {
      Geolocation.getCurrentPosition(
        (position) => {
          setCoords([
            {
              latitude: parseFloat(JSON.stringify(position.coords.latitude)),
              longitude: parseFloat(JSON.stringify(position.coords.longitude)),
            },
            {
              latitude: 40.86973,
              longitude: -73.82774,
            },
          ]);
        },
        (error) => alert(error.message),
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000},
      );
    } else {
      Geolocation.requestAuthorization();
    }
  };

  const ASPECT_RATIO = width / height;
  const SangriaLat = 40.86973;
  const SangriaLong = -73.82774;
  const LATITUDE_DELTA = 0.008;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const kmToMConverter = 0.621371;
  let mapRef = null;

  return coords.length > 0 ? (
    <>
      <MapView
        initialRegion={{
          latitude: SangriaLat,
          longitude: SangriaLong,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={styles.mapStyle}
        ref={(ref) => {
          mapRef = ref;
        }}
        onLayout={() =>
          mapRef.fitToCoordinates(coords, {
            edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
            animated: true,
          })
        }>
        <MapView.Marker coordinate={coords && coords[0]} title={'You'} />
        <MapView.Marker
          coordinate={coords && coords[1]}
          title={'Sangria Cafe'}
        />
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          {(parseFloat(distance) * kmToMConverter).toFixed(2)} miles{' '}
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          {parseFloat(time).toFixed(0)}min drive
        </Text>
        <MapViewDirections
          origin={coords[0]}
          destination={coords[1]}
          apikey={mapApi}
          mode={'DRIVING'}
          strokeWidth={5}
          strokeColor="cornflowerblue"
          onReady={(result) => {
            getDist(result.distance);
            getTravelTime(result.duration);
          }}
        />
      </MapView>
    </>
  ) : null;
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  mapStyle: {
    padding: 8,
    width: width,
    height: 200,
    flex: 1,
    elevation: 10,
    shadowOffset: {width: 20, height: 25},
    shadowColor: 'black',
    marginBottom: 25,
  },
});

export default Map;
