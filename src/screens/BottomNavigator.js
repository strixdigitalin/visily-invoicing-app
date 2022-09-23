import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';
import NewBills from './NewBills';
import ExistingBills from './ExistingBills';
import UploadItems from './UploadItems';
import Items from './Items';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      // screenOptions={{ headerShown: false }}
      tabBarOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: COLORS.themeColor,
      }}>
      <Tab.Screen
        name="NewBillScreen"
        component={NewBills}
        options={{
          headerTitle: 'Assign Support',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name="ExistingBillScreen"
        component={ExistingBills}
        options={{
          headerTitle: 'All Questions',

          tabBarIcon: ({color}) => (
            <Icon name="description" color={color} size={28} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                borderColor: COLORS.themeColor,
                borderWidth: 2,
                borderRadius: 30,
                top: -25,
                elevation: 5,
              }}>
              <Icon name="search" color={COLORS.themeColor} size={28} />
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="UploadItemScreen"
        component={UploadItems}
        options={{
          headerTitle: 'Upload Question',

          tabBarIcon: ({color}) => (
            <Icon name="upload-file" color={color} size={28} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="ItemScreen"
        component={Items}
        options={{
          headerTitle: 'Item',

          tabBarIcon: ({color}) => (
            <Icon name="category" color={color} size={28} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomNavigator;
