import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';
import {filterIt} from '../Filters';
import {FetchLocal, localStore} from '../LocalData/AsyncManager';
import {useIsFocused} from '@react-navigation/native';

export default function Items({navigation}) {
  const isFocused = useIsFocused();
  const {width, height} = Dimensions.get('screen');
  const [AllProducts, setAllProducts] = useState([]);
  const [filterProducts, setfilterProducts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const fetchData = async () => {
    setRefreshing(true);
    const data = await FetchLocal.products();
    console.log('\n\n\n Fetched Products', data);
    setAllProducts(data.reverse());
    setfilterProducts(data);
    setRefreshing(false);
  };

  const Card = ({item}) => {
    console.log('Passed Item\n\n ', item, '\n\n');
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
            <Text style={style.textStyle}>
              {item?.id} {item?.name}
            </Text>
            <Text style={style.textStyle}>
              Stock:{item?.quantity} {'    '} Price: {item?.price}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Icon
              name="edit"
              size={26}
              style={{paddingHorizontal: 4}}
              onPress={() => navigation.navigate('Editproduct', {data: item})}
            />
            <Icon
              name="delete"
              color={`${COLORS.themeColor}`}
              onPress={() => delteProduct(item?.id)}
              size={26}
              style={{paddingHorizontal: 4}}
            />
          </View>
        </View>
      </View>
    );
  };

  const filterItems = text => {
    if (text.trim() == '') return setfilterProducts(AllProducts);
    filterIt(text, AllProducts, 'name', res => {
      setfilterProducts(res);
    });
  };

  const delteProduct = id => {
    localStore.deleteProductByID(id, res => {
      if (res.success) {
        Alert.alert('Product Delete');
        fetchData();
      }
    });
  };
  return (
    <>
      <ScrollView
        style={{padding: 10}}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        // }
        // contentContainerStyle={styles.list}
      >
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search for Products"
            onChangeText={text => filterItems(text)}
          />
        </View>

        {/* <FlatList
          data={filterProducts}
          renderItem={({item}) => <Card item={item} />}
          keyExtractor={item => item?.id}
        /> */}

        {filterProducts.map((item, key) => {
          return <Card key={key} item={item} />;
        })}
        {/* <Card /> */}
        {/* <Card />
        <Card />
        <Card />
        <Card /> */}
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
        <Icon
          name="add"
          color={COLORS.themeColor}
          size={28}
          onPress={() => navigation.navigate('UploadItemScreen')}
        />
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
    alignItems: 'center',
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
