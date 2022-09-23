import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import commonStyle from '../theme/Style';
import {COLORS, SIZES} from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';

export default function Signup({navigation}) {
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userType, setUserType] = useState();
  const [isFocus, setIsFocus] = React.useState(false);
  const [isFocus2, setIsFocus2] = React.useState(false);

  const renderPhoneLabel = () => {
    if (phone || isFocus) {
      return (
        <Text
          style={[
            styles.label,
            isFocus && {
              color: '#222222',
              backgroundColor: '#f5f5f5',
              marginLeft: -7,
            },
          ]}>
          Email Id
        </Text>
      );
    }
    return null;
  };

  const renderPhoneLabel2 = text => {
    if (password || isFocus2) {
      return (
        <Text
          style={[
            styles.label,
            isFocus && {
              color: '#222222',
              backgroundColor: '#f5f5f5',
              marginLeft: -7,
            },
          ]}>
          Password
        </Text>
      );
    }
    return null;
  };

  // const loginHandle = async () => {

  //   const dataLogin = {
  //     user_type: `agent`,
  //     email: `${phone}`,
  //     password: `${password}`,
  //   };

  //   console.log('userData', dataLogin);

  //   try {
  //     const result = await axios.post(
  //       `https://qr.drazs.com/api/public/api/login`,
  //       dataLogin,
  //     );

  //     if (result.data.user.user_token) {
  //       await AsyncStorage.setItem('loginToken', result.data.user.user_token);
  //       await AsyncStorage.setItem('QRUser', JSON.stringify(result.data.user));
  //       navigation.navigate('VerifyCode');
  //       console.log('login-success');
  //     } else {
  //       console.log('login-failed');
  //       Alert.alert('Wrong Input!');
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsFocus(false);
      }}>
      <View style={{...styles.container}}>
        <View style={{height: '16%'}} />

        <View style={{alignItems: 'flex-start', width: '100%'}}>
          <Text style={{fontSize: 22, fontWeight: '500', color: '#000'}}>
            Sign Up
          </Text>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#333'}}>
            Hi there! Nice to see you.
          </Text>
        </View>
        <View style={{height: '10%'}} />

        <View>
          <View style={{width: SIZES.width - 40}}>
            {renderPhoneLabel2()}
            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 10,
              }}>
              <TextInput
                value={password}
                onChangeText={text => {
                  setPassword(text);
                }}
                placeholder={isFocus2 ? '' : 'Name'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 46,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus2(true);
                }}
              />
            </View>
          </View>

          <View style={{height: 30}} />

          <View style={{width: SIZES.width - 40}}>
            {renderPhoneLabel()}
            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 10,
              }}>
              <TextInput
                value={phone}
                onChangeText={text => {
                  setPhone(text);
                }}
                placeholder={isFocus ? '' : 'Email Id'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 46,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus(true);
                }}
              />
            </View>
          </View>

          <View style={{height: 30}} />

          <View style={{width: SIZES.width - 40}}>
            {renderPhoneLabel2()}
            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 10,
              }}>
              <TextInput
                value={password}
                onChangeText={text => {
                  setPassword(text);
                }}
                placeholder={isFocus2 ? '' : 'Password'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 46,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus2(true);
                }}
              />
            </View>
          </View>
        </View>

        <Picker
          selectedValue={userType}
          onValueChange={(itemValue, itemIndex) =>
            setUserType(itemValue)
          }>
          <Picker.Item label="Sales" value="wholesaler" />
          <Picker.Item label="Marketing" value="semiwholesaler" />
          <Picker.Item label="Helpdesk" value="semiwholesaler" />
          <Picker.Item label="Technical Support" value="semiwholesaler" />
        </Picker>

        <View style={{height: '10%'}} />

        <TouchableOpacity
          style={{...commonStyle.submitBtn, ...commonStyle.rowSpaceBetween2}}
          onPress={() => {
            //   loginHandle();
            navigation.navigate('BottomTab', {screen: 'NewBillScreen'});
          }}>
          <AntDesign name="arrowright" size={18} color={COLORS.primary} />
          <Text style={{fontSize: 16, fontWeight: '500', color: '#fff'}}>
            Next
          </Text>
          <AntDesign name="arrowright" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  countryCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    width: SIZES.width - 120,
    height: 50,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 9,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    left: 22,
    top: -11,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
