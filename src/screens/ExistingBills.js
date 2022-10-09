import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Touchable,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';
import {useIsFocused} from '@react-navigation/native';
import {localStore} from '../LocalData/AsyncManager';

export default function ExistingBills({navigation}) {
  const isFocused = useIsFocused();
  const [allBills, setAllBills] = useState([]);
  const {width, height} = Dimensions.get('screen');
  const [refreshScreen, setRefreshScreen] = useState(false);
  useEffect(() => {
    (async () => {
      const allBills = await localStore.fetchInvoice();
      console.log(allBills, '<<<\n\n\nallbills');
      setAllBills(await localStore.fetchInvoice());
    })();
  }, [isFocused, refreshScreen]);

  const Card = item => {
    return (
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 5,
          borderColor: '#ccc',
          borderWidth: 0.8,
        }}>
        <View style={style.card}>
          {/* <Text style={style.textStyle}>
            {item?.id} {item.partyName}
          </Text> */}
          <Text style={style.textStyle}>
            {item?.id} Rs {item?.totalAmount}
          </Text>
        </View>
        <View style={style.card}>
          <Text style={style.textStyle2}>{item?.date}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text
              style={{
                ...style.textStyle2,
                color: item.isGenerated ? '#00FF00' : '#FF0000',
              }}>
              {item.isGenerated ? 'Generated' : 'Draft'}
            </Text>
            <Icon
              onPress={() =>
                navigation.navigate('Edit Invoice', {invoiceData: item})
              }
              name="edit"
              size={24}
              style={{paddingHorizontal: 4}}
            />
            <Icon
              name="delete"
              color={COLORS.themeColor}
              onPress={() => {
                localStore.deleteInvoiceById(item.id, res => {
                  if (res.success) return Alert.alert('Product Deleted');
                });
                setRefreshScreen(!refreshScreen);
              }}
              size={24}
              style={{paddingHorizontal: 4}}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <ScrollView style={{padding: 10}}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search for Bills"
          />
        </View>
        {allBills.map(item => Card(item))}
      </ScrollView>
      <View
        style={{
          backgroundColor: '#fff',
          borderColor: COLORS.themeColor,
          borderWidth: 1,
          alignSelf: 'center',
          position: 'absolute',
          top: height / 1.45,
          elevation: 20,
          padding: 10,
          borderRadius: 30,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('NewBillScreen')}>
          <Icon name="add" color={COLORS.themeColor} size={28} />
        </TouchableOpacity>
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
  },
  textStyle2: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgba(0,0,0,0.75)',
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
    paddingVertical: 6,
    // marginHorizontal: 5,
    // marginVertical: 10,
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
