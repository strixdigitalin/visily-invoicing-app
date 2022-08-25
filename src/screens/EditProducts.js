import React, {useState} from 'react';
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';
import {localStore} from '../LocalData/AsyncManager';

export default function EditProducts({route}) {
  const {data} = route.params;
  const {width, height} = Dimensions.get('screen');
  const [formData, setFormData] = useState({
    ...data,
  });
  const handleChange = (name, value) => {
    console.log('\nname\n', name, '\nvalue\t', value);
    setFormData({...formData, [name]: value});
  };

  const Fields = [
    {
      label: 'Product Name',
      name: 'name',
      onTextChange: (name, value) => handleChange(name, value),
    },
    {
      label: 'Description',
      name: 'description',
      onTextChange: (name, value) => handleChange(name, value),
    },
    {
      label: 'Quantity',
      name: 'quantity',
      onTextChange: (name, value) => handleChange(name, value),
    },
    {
      label: 'price (In Rs)',
      name: 'price',
      onTextChange: (name, value) => handleChange(name, value),
    },
  ];
  const submitForm = async () => {
    try {
      console.log('\n\nPRODUCT TO UPLOAD \n\n', formData);
      localStore.editProduct(formData, res => {
        if (res.success) {
          Alert.alert('Product Updated Successfully');
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={{padding: 15, marginTop: 30}}>
      {Fields.map((item, key) => {
        return (
          <React.Fragment key={key}>
            <Text key={key} style={style.textStyle}>
              {item.label}
            </Text>
            <View style={style.inputContainer}>
              <TextInput
                value={formData[item.name]}
                style={{flex: 1, fontSize: 18}}
                onChangeText={text => item.onTextChange(item.name, text)}
              />
            </View>
          </React.Fragment>
        );
      })}
      {/* <Text style={style.textStyle}>Product Description</Text>
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
      </View> */}

      <TouchableOpacity
        onPress={submitForm}
        style={{
          alignSelf: 'center',
          marginTop: height / 8,
          backgroundColor: COLORS.themeColor,
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 7,
        }}>
        <Text style={style.textStyle2}>Edit Item</Text>
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
