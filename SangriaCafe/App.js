import React from 'react';
import { Image, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import auth from '@react-native-firebase/auth'
import Home from './screens/home'
import Order from './screens/order'
import Cart from './screens/cart'
import Settings from './screens/settings'

export default class App extends React.Component {

  state = {
    foodCart: [],
    user: null,
    initializing: true
  }

  componentDidMount(){
    this.setState({user: auth()._user})
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }

  onAuthStateChanged = async (user) => {
    this.setState({user})
    if (initializing) this.setState({initializing:false})
  }

  addItem = item => {
    foundFood = this.state.foodCart.find(food => food.item.name === item.item.name) 
    foundFood === undefined ? this.setState({ foodCart : [...this.state.foodCart, item] })
      : foundFood.quantity ++ && this.setState({ foodCart : this.state.foodCart })
  }

  removeItem = item => {
    itemToRemove = this.state.foodCart.find(food => food.item.name === item.item.name) 
    removeThis = this.state.foodCart.indexOf(itemToRemove)
    this.state.foodCart.splice(removeThis, 1) &&
    this.setState({ foodCart : this.state.foodCart })
  }

  HomeScreen = () => {
    return <Home />
  }
  
  OrderScreen = () => {
    return <Order addToCart={this.addItem} />
  }
  
  CartScreen = () => {
    return <Cart foodCart={this.state.foodCart} removeFromCart={this.removeItem} user={this.state.user} />
  }
  
  SettingsScreen = () => {
    return <Settings />
  }
  
  render(){ 
    Tab = createBottomTabNavigator()
    return (
      <NavigationContainer>
        <StatusBar barStyle='dark-content'/>
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
            return <Image source={{uri:iconName}} size={size} color={color} style={{height: 30, width: 30}}/>
          }
          })}
          tabBarOptions={{ activeTintColor: 'tomato', inactiveTintColor: 'gray' }}
        >
          <Tab.Screen name="Home" component={this.HomeScreen}/>
          <Tab.Screen name="Order" component={this.OrderScreen} />
          <Tab.Screen name="Cart" component={() => this.CartScreen()} options={{tabBarBadge: this.state.foodCart.length > 0 ? this.state.foodCart.length : null}}/>
          <Tab.Screen name="Profile" component={this.SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}