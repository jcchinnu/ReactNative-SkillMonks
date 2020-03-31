import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/login';
import ValidationScreen from './screens/Validation';
import MainScreen from './screens/Main';
import SplashScreen from './screens/Splash';


const App = createStackNavigator({
  Validate: {
    screen: ValidationScreen,
    navigationOptions: {
      headerShown:false
    },
  },
  AuthLoading: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown:false
    },
  },
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown:false
    },
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      headerShown:false
    },
  },
});

const Navigation = createSwitchNavigator(
  {
      AuthLoading: LoginScreen,
      Splash: SplashScreen,
      Validate: App ,
      Main: MainScreen ,



  },
{
      initialRouteName: "Splash",
});


export default createAppContainer(Navigation);