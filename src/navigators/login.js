import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { LoginScreen } from '../containers/Login';
import { RegisterScreen } from '../containers/Register'

const LoginNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#141e29'
      }
    })
  },
  Register: {
    screen: RegisterScreen,
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Login',
});

export { LoginNavigator }
