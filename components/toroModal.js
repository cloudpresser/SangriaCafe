import React from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView} from 'react-native';

export default toroModal = (props) => {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}>
      <SafeAreaView>
          <Text>THIS WILL BE THEE TORO EXPLANATION</Text>
      </SafeAreaView>
    </View>
  );
};

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  modalView: {
    alignItems: 'center',
    width: screen.width,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
