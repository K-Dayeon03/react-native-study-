import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RegistrationPage from '../pages/RegistrationPage';
import LoginPage from '../pages/LoginPage';
import GetCouponPage from '../pages/GetCouponPage';
import MainPage from '../pages/MainPage';
import EventUploadPage from '../pages/EventUploadPage';
import MyCouponBoxPage from '../pages/MyCouponBoxPage';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
    >
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="RegistrationPage" component={RegistrationPage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="GetCouponPage" component={GetCouponPage} />
      <Stack.Screen name="EventUploadPage" component={EventUploadPage} />
      <Stack.Screen name="MyCouponBoxPage" component={MyCouponBoxPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
