import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigator from './src/screens/BottomNavigator';
import EditProducts from './src/screens/EditProducts';
import UploadItems from './src/screens/UploadItems';
import EditInvoice from './src/screens/EditInvoice';
import SelectProducts from './src/screens/SelectProduct';

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
        <Stack.Screen
          name="Upload Items"
          component={UploadItems}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Edit Invoice"
          component={EditInvoice}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Select Product"
          component={SelectProducts}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
