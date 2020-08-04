import React from 'react';
import { View, Text, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/home'
import Order from './screens/order'
import Cart from './screens/cart'

const itemCart = []

function HomeScreen() {
  return (
    <Home />
  );
}

function OrderScreen() {
  return (
    <Order itemCart={itemCart}/>
  );
}

function CartScreen() {
  return(
    <Cart itemCart={itemCart}/>
  )
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
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
            } else if (route.name === 'Profile') {
              iconName = focused ? 'https://img.pngio.com/profile-icon-png-image-free-download-searchpngcom-profile-icon-png-673_673.png' : 'https://img.pngio.com/profile-icon-png-image-free-download-searchpngcom-profile-icon-png-673_673.png'
            } else if (route.name === 'Cart') {
              iconName = focused ? 'https://image.flaticon.com/icons/png/512/126/126083.png' : 'https://image.flaticon.com/icons/png/512/126/126083.png'
            }
          return <Image source={{uri:iconName}} size={size} color={color} style={{height: 25, width: 25}}/>
        },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Order" component={OrderScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;