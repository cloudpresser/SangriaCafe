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
                  ? {
                      uri:
                        'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fhome_icon_focused.png?alt=media&token=97bb6017-54cf-4298-b651-db5415a7412e',
                    }
                  : {
                      uri:
                        'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fhome_icon.png?alt=media&token=697d19be-c116-4b48-8900-7343a62ef33c',
                    };
              } else if (route.name === 'Menu') {
                iconName = focused
                  ? {
                      uri:
                        'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Forder_icon_focused.png?alt=media&token=f568e4ff-652f-4c3c-98ad-ceb76aea62c1',
                    }
                  : {
                      uri:
                        'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Forder_icon.png?alt=media&token=ace90519-853c-45cd-938a-9e640d07e63e',
                    };
              } else if (route.name === 'Settings') {
                iconName = focused
                  ? {
                      uri:
                        'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fprofile_icon_focused.png?alt=media&token=3e530bb0-2ac7-48dc-90c1-5c856449d05f',
                    }
                  : {
                      uri:
                        'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fprofile_icon.png?alt=media&token=cdb8ab69-c787-4dfc-abe0-1d4c20c52c62',
                    };
              } else if (route.name === 'Cart') {
                iconName = focused
                  ? {
                      uri:
                        'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fcart_icon_focused.png?alt=media&token=caff1755-b4e1-49f6-a3f9-6dbe30ab3a2a',
                    }
                  : {
                      uri:
                        'https://firebasestorage.googleapis.com/v0/b/sangriacafe.appspot.com/o/assets%2Fcart_icon.png?alt=media&token=f02a7e04-0a62-46c1-8fc0-de879077a3c4',
                    };
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
          <Tab.Screen name="Menu" component={this.OrderScreen} />
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
