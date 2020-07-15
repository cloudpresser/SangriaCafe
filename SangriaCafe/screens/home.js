import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Image, StatusBar, Dimensions, Button } from 'react-native';
import { IconButton } from 'react-native-paper';

const App: () => React$Node = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
            <View style={styles.body}>
              <View style={styles.topBar}>
                <IconButton  icon='home'/>
                <Image source={ require('../assets/sangria_logo.png')} style={styles.logo}/>
                <IconButton icon="account"/>
              </View>
                <View>
                    <ScrollView horizontal={true}>
                      {/* map out InstaCards */}
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    body: {
        flex: 1,
        justifyContent: 'center'
    },
    logo: {
        height: screen.width / 4,
        width: screen.width / 1.7
    }
});

export default App;