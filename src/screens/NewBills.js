import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';

export default function NewBills() {
  const {width, height} = Dimensions.get('screen');

  const Card = () => {
    return (
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 5,
          borderColor: '#ccc',
          borderWidth: 0.8,
        }}>
        <View style={style.card}>
          <View>
            <Text style={style.textStyle}>Bill Date</Text>
            <Text style={style.textStyle2}>Rs 6890</Text>
          </View>
          <View>
            <Icon
              name="edit"
              color={'#e27127'}
              size={26}
              style={{paddingHorizontal: 4}}
            />
          </View>
        </View>
      </View>
    );
  };

  const CardTotal = () => {
    return (
      <View
        style={{
          marginTop: 70,
          marginHorizontal: 5,
        }}>
        <View style={style.cardTotal}>
          <View>
            <Text style={style.textStyle}>Sub Total</Text>
          </View>
          <View>
            <Text style={style.textStyle}>Rs 250</Text>
          </View>
        </View>
      </View>
    );
  };

  const ItemShowcase = () => {
    return (
      <>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 5,
            borderColor: '#ccc',
            borderWidth: 0.8,
            paddingVertical: 16,
            backgroundColor: '#fff',
          }}>
          <View style={style.card}>
            <Text style={style.textStyle4}>Item Name</Text>
            <Text style={style.textStyle4}>Rs 6890</Text>
          </View>
          <View style={style.card}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View style={{backgroundColor: '#e27127', borderRadius: 5}}>
                <Icon
                  name="add"
                  color={'#fff'}
                  size={26}
                  style={{padding: 2}}
                />
              </View>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 'bold',
                  paddingHorizontal: 7,
                }}>
                {' '}
                1{' '}
              </Text>
              <View style={{backgroundColor: '#e27127', borderRadius: 5}}>
                <Icon
                  name="remove"
                  color={'#fff'}
                  size={26}
                  style={{padding: 2}}
                />
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Icon
                name="edit"
                color={'#e27127'}
                size={26}
                style={{paddingRight: 4}}
              />
              <Icon
                name="clear"
                color={'#e27127'}
                size={29}
                style={{paddingLeft: 4}}
              />
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: 8}}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: "auto"}}>
          <Icon name="add" color={'#e27127'} size={23} style={{padding: 2}} />
          <Text style={{color: '#e27127'}}>Additional Charges</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: "auto"}}>
          <Icon name="add" color={'#e27127'} size={23} style={{padding: 2}} />
          <Text style={{color: '#e27127'}}>Discount</Text>
        </View>
        </View>
      </>
    );
  };

  return (
    <>
      <ScrollView style={{padding: 10}}>
        <Card />
        <ItemShowcase />
        <CardTotal />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: height / 1.58,
          alignSelf: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderColor: '#e27127',
            borderWidth: 1,
            elevation: 10,
            padding: 10,
            borderRadius: 10,
            width: width / 4,
            marginHorizontal: width / 8,
            alignItems: 'center',
          }}>
          <Icon name="save" color={'#e27127'} size={31} />
          <Text style={style.textStyle3}>Save</Text>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            borderColor: '#e27127',
            borderWidth: 1,
            elevation: 10,
            width: width / 4,
            padding: 10,
            borderRadius: 10,
            marginHorizontal: width / 8,
            alignItems: 'center',
          }}>
          <Icon name="nat" color={'#e27127'} size={31} />
          <Text style={style.textStyle3}>Generate</Text>
        </View>
      </View>
    </>
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
    elevation: 2,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgba(0,0,0,0.9)',
    paddingVertical: 5,
  },
  textStyle4: {
    fontWeight: 'bold',
    fontSize: 18.5,
    color: 'rgba(0,0,0,0.9)',
    paddingVertical: 5,
  },
  textStyle2: {
    fontSize: 16,
    paddingVertical: 5,
    color: 'grey',
  },
  textStyle3: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 5,
    color: '#e27127',
  },
  categoriesListContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    // width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 4,
    alignItems: 'center',
  },
  cardTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 16,
    alignItems: 'center',
  },
});
