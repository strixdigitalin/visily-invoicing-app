import React from 'react';
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function UploadItems() {
  const {width, height} = Dimensions.get('screen');

  return (
    <ScrollView style={{padding: 15, marginTop: 30}}>
      <Text style={style.textStyle}>Product Name</Text>
      <View style={style.inputContainer}>
        <TextInput style={{flex: 1, fontSize: 18}} />
      </View>
      <Text style={style.textStyle}>Product Description</Text>
      <View style={style.inputContainer}>
        <TextInput style={{flex: 1, fontSize: 18}} />
      </View>
      <Text style={style.textStyle}>Quantity</Text>
      <View style={style.inputContainer}>
        <TextInput style={{flex: 1, fontSize: 18}} />
      </View>
      <Text style={style.textStyle}>Price (In Rs)</Text>
      <View style={style.inputContainer}>
        <TextInput style={{flex: 1, fontSize: 18}} />
      </View>

      <TouchableOpacity
        style={{
          alignSelf: 'center',
          marginTop: height / 8,
          backgroundColor: '#e27127',
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 7,
        }}>
        <Text style={style.textStyle2}>Upload Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    // elevation: 2,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '600',
  },
  textStyle2: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.9)',
  },
});
