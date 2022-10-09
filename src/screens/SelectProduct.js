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
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function SelectProducts({navigation, route}) {
  const {onPressProduct, billItem, setBillItem, saveProducts, deleteItem} =
    route.params.data;
  const isFocused = useIsFocused();
  const {width, height} = Dimensions.get('screen');
  const [AllProducts, setAllProducts] = useState([]);
  const [filterProducts, setfilterProducts] = useState([]);
  const [billItemInThisScreen, setBillItemInThisScreen] = useState(billItem); // this state is to dark and light color of card
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

  const Card = ({
    item,
    onPressProduct,
    deleteItem,
    setBillItem,
    billItem,
    isProductAdded,
  }) => {
    // console.log('Passed Item\n\n ', item, '\n\n', billItem);
    const checkIsExist = billItemInThisScreen.filter(pro => pro.id == item.id);

    // console.log(checkIsExist.length, '<<<<');

    return (
      <TouchableOpacity
        onPress={() => {
          if (checkIsExist.length != 0) {
            console.log('deleting item');
            setBillItemInThisScreen(
              billItemInThisScreen.filter(pro => pro.id != item.id),
            );
            saveProducts(billItemInThisScreen.filter(pro => pro.id != item.id));
            // deleteItem(item);
          } else {
            console.log('adding item');
            setBillItemInThisScreen([...billItemInThisScreen, item]);
            // onPressProduct(item);
            setBillItem([...billItem, {...item, qtty: 1}]);
            saveProducts([...billItemInThisScreen, {...item, qtty: 1}]);
          }
        }}>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 5,
            borderColor: checkIsExist.length != 0 ? '#808080' : '#ccc',
            backgroundColor: checkIsExist.length != 0 ? '#D3D3D3' : '#ffff',
            borderWidth: 0.8,
            borderRadius: 10,
          }}>
          <View
            style={{
              ...style.card,
              backgroundColor: checkIsExist.length != 0 ? '#D3D3D3' : '#ffff',
              borderRadius: 10,
            }}>
            <View>
              <Text style={style.textStyle}>
                {item?.id}. {item?.name}
              </Text>
              <Text style={style.textStyle}>
                Stock:{item?.quantity} {'    '} Price: {item?.price}
              </Text>
            </View>
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity>
              <Icon
                name="edit"
                size={26}
                style={{paddingHorizontal: 4}}
                onPress={() =>
                  navigation.navigate('Edit product', {data: item})
                }
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="delete"
                color={`${COLORS.red}`}
                onPress={() => delteProduct(item?.id)}
                size={26}
                style={{paddingHorizontal: 4}}
              />
            </TouchableOpacity>
          </View> */}
          </View>
        </View>
      </TouchableOpacity>
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

  const isProductAdded = item => {
    console.log(billItem, item);
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
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          {/* <Text
            style={style.saveit}
            onPress={() => {
              saveProducts(billItemInThisScreen);
              // navigation.goBack();
            }}>
            save
          </Text> */}
        </View>
        {/* <FlatList
          data={filterProducts}
          renderItem={({item}) => <Card item={item} />}
          keyExtractor={item => item?.id}
        /> */}

        {filterProducts.map((item, key) => {
          return (
            <Card
              deleteItem={deleteItem}
              isProductAdded={isProductAdded}
              key={key}
              setBillItem={setBillItem}
              billItem={billItem}
              onPressProduct={onPressProduct}
              item={item}
            />
          );
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
        <TouchableOpacity>
          <Icon
            name="add"
            color={COLORS.themeColor}
            size={28}
            onPress={() => navigation.navigate('Upload Items')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  saveit: {
    textAlign: 'center',
    borderRadius: 10,
    // color: COLORS.themeColor,
    fontSize: 20,
    color: '#ffffff',
    backgroundColor: COLORS.themeColor,
    // width: "",
    width: 70,

    marginRight: 10,
  },
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
