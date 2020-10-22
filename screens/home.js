import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Button} from 'react-native-paper';
import ToroModal from '../components/toroModal';
import Card from '../components/instaCard';
import Map from '../components/map';

export default class Home extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.homePageContainer}>
          <View style={styles.topContainer}>
            <Image
              source={{
                uri:
                  'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fsangria_logo.png?alt=media&token=65d5bb98-bcfc-4599-bc4c-395ac130212a',
              }}
              style={styles.logo}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}>
            <ToroModal setModalVisible={() => this.setModalVisible()} />
          </Modal>

          <ScrollView
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            contentInset={{top: 0, left: 0, bottom: 115, right: 0}}>
            <View style={styles.infoContainer}>
              <Image
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Ftoro_front.jpg?alt=media&token=af5ff861-83e8-4e6e-b87a-2cab6fc9ccb4',
                }}
                style={styles.homeBanner}
              />
              <View>
                <Text style={styles.storeHours}>LUNCH: 12PM - 4PM</Text>
                <Text style={styles.storeHours}>DINNER: 4PM - 11PM</Text>
                <Text style={styles.storeHours}>Bar: 12PM - 2AM</Text>
                <Text style={styles.storeHours}>HAPPY HOUR: 3PM-7PM</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: 'tomato',
              }}>
              <Button
                color="white"
                onPress={() => Linking.openURL('tel:3478436486')}>
                Call
              </Button>
              <Button
                color="white"
                onPress={() =>
                  Linking.openURL(
                    'https://www.google.com/maps/place/2085+Bartow+Ave,+The+Bronx,+NY+10475/@40.8697287,-73.8299331,17z/data=!3m1!4b1!4m5!3m4!1s0x89c28cb85da85129:0xf447e9e1854d3292!8m2!3d40.8697287!4d-73.8277444',
                  )
                }>
                Directions
              </Button>
            </View>
            <View style={{margin: 5}}>
              <Card />
            </View>
            <View>
              <TouchableOpacity onPress={() => this.setModalVisible()}>
                <Image
                  source={{
                    uri:
                      'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Ftoro_banner.png?alt=media&token=282c97f2-d78b-47ee-8bfe-6f86c47d9950',
                  }}
                  style={styles.toroBanner}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Map />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 10,
  },
  logo: {
    height: screen.width / 4,
    width: screen.width / 1.7,
  },
  storeHours: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  infoContainer: {
    justifyContent: 'center',
    width: screen.width,
    height: screen.width / 2,
    padding: 20,
  },
  homeBanner: {
    height: screen.width / 2,
    width: screen.width,
    position: 'absolute',
    opacity: 0.9,
  },
  toroBanner: {
    height: screen.width / 2,
    width: screen.width,
    marginBottom: 10,
  },
});
