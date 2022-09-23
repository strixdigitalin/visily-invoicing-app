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
import COLORS from '../constants/colors';
import {localStore} from '../LocalData/AsyncManager';
import {launchImageLibrary} from 'react-native-image-picker';

export default function UploadItems() {
  const {width, height} = Dimensions.get('screen');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: '',
  });
  const handleChange = (name, value) => {
    console.log('\nname\n', name, '\nvalue\t', value);
    setFormData({...formData, [name]: value});
  };

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  const Fields = [
    {
      label: 'Product Name',
      name: 'Name',
      onTextChange: (name, value) => handleChange(name, value),
    },
    {
      label: 'Description',
      name: 'Description',
      onTextChange: (name, value) => handleChange(name, value),
    },
    {
      label: 'Question',
      name: 'Question',
      onTextChange: (name, value) => handleChange(name, value),
    },
  ];
  const submitForm = async () => {
    try {
      console.log('\n\nPRODUCT TO UPLOAD \n\n', formData);
      localStore.uploadProducts(formData, res => {
        if (res.success) {
          Alert.alert('Product Uploaded Successfully');
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={{padding: 15, marginTop: 50}}>
      <TouchableOpacity style={{marginBottom: 20}} onPress={() => chooseImage()}>
        <Text
          style={{
            borderColor: '#4682B4',
            borderWidth: 2,
            paddingVertical: 12,
            fontSize: 16,
            fontWeight: 'bold',
            borderRadius: 5,
            textAlign: 'center',
          }}>
          Upload Image
        </Text>
      </TouchableOpacity>

      {Fields.map((item, key) => {
        return (
          <React.Fragment key={key}>
            <Text key={key} style={style.textStyle}>
              {item.name}
            </Text>
            <View style={style.inputContainer}>
              <TextInput
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
        <Text style={style.textStyle2}>Upload Question</Text>
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
