import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigator from './src/screens/BottomNavigator';
import EditProducts from './src/screens/EditProducts';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTab"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit product"
          component={EditProducts}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
