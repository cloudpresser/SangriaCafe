import React from 'react';
import {Image, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/home';
import Order from './screens/order';
import Cart from './screens/cart';
import Settings from './screens/settings';

export default class App extends React.Component {
  state = {
    foodCart: [],
  };

  addItem = (item) => {
    foundFood = this.state.foodCart.find(
      (food) => food.item.name === item.item.name,
    );
    foundFood === undefined
      ? this.setState({foodCart: [...this.state.foodCart, item]})
      : foundFood.quantity++ && this.setState({foodCart: this.state.foodCart});
  };

  removeItem = (item) => {
    itemToRemove = this.state.foodCart.find(
      (food) => food.item.name === item.item.name,
    );
    removeThis = this.state.foodCart.indexOf(itemToRemove);
    this.state.foodCart.splice(removeThis, 1) &&
      this.setState({foodCart: this.state.foodCart});
  };

  HomeScreen = () => {
    return <Home />;
  };

  OrderScreen = () => {
    return <Order addToCart={this.addItem} />;
  };

  CartScreen = () => {
    return (
      <Cart
        foodCart={this.state.foodCart}
        removeFromCart={this.removeItem}
        user={this.state.user}
      />
    );
  };

  SettingsScreen = () => {
    return <Settings />;
  };

  render() {
    Tab = createBottomTabNavigator();
    return (
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? require('./assets/home_icon_focused.png')
                  : require('./assets/home_icon.png');
              } else if (route.name === 'Order') {
                iconName = focused
                  ? require('./assets/order_icon_focused.png')
                  : require('./assets/order_icon.png');
              } else if (route.name === 'Settings') {
                iconName = focused
                  ? require('./assets/profile_icon_focused.png')
                  : require('./assets/profile_icon.png');
              } else if (route.name === 'Cart') {
                iconName = focused
                  ? require('./assets/cart_icon_focused.png')
                  : require('./assets/cart_icon.png');
              }
              return (
                <Image
                  source={iconName}
                  size={size}
                  color={color}
                  style={{height: 30, width: 30}}
                />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={this.HomeScreen} />
          <Tab.Screen name="Order" component={this.OrderScreen} />
          <Tab.Screen
            name="Cart"
            component={() => this.CartScreen()}
            options={{
              tabBarBadge:
                this.state.foodCart.length > 0
                  ? this.state.foodCart.length
                  : null,
            }}
          />
          <Tab.Screen name="Settings" component={this.SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
