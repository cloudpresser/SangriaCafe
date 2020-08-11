import React from 'react';
import { Image } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './screens/home'
import Order from './screens/order'
import Cart from './screens/cart'
import Settings from './screens/settings'

export default class App extends React.Component {

  state = {
    foodCart: []
  }

  stateHandler = item => {
    this.setState({ foodCart : [...this.state.foodCart, item] })
  }

  HomeScreen = () => {
    return (
      <Home />
    )
  }
  
  OrderScreen = () => {
    return (
      <Order addToCart={this.stateHandler} />
    )
  }
  
  CartScreen = () => {
      return(
        <Cart foodCart={this.state.foodCart}/>
      )
  }
  
  ProfileScreen = () => {
    return (
      <Settings />
    )
  }
  
  
  render(){ 
    Tab = createBottomTabNavigator()
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
          <Tab.Screen name="Home" component={this.HomeScreen}/>
          <Tab.Screen name="Order" component={this.OrderScreen} />
          <Tab.Screen name="Cart" component={() => this.CartScreen()} options={{tabBarBadge: this.state.foodCart.length > 0 ? this.state.foodCart.length : null}}/>
          <Tab.Screen name="Profile" component={this.ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}