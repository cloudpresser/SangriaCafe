import React from 'react';
import { View, Text, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/home'

function HomeScreen() {
  return (
    <Home />
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function OrderScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Order</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
            if (route.name === 'Home') {
              iconName = focused ? 'https://cdn2.iconfinder.com/data/icons/font-awesome/1792/home-512.png' : 'https://cdn2.iconfinder.com/data/icons/font-awesome/1792/home-512.png'
            } else if (route.name === 'Order') {
              iconName = focused ? 'https://image.flaticon.com/icons/png/512/45/45552.png' : 'https://image.flaticon.com/icons/png/512/45/45552.png'
            } else if (route.name === 'Settings') {
              iconName = focused ? 'https://img.pngio.com/profile-icon-png-image-free-download-searchpngcom-profile-icon-png-673_673.png' : 'https://img.pngio.com/profile-icon-png-image-free-download-searchpngcom-profile-icon-png-673_673.png'
            }
          return <Image source={{uri:iconName}} size={size} color={color} style={{height: 22, width: 22}}/>
        },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Order" component={OrderScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;