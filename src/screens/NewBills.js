import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  Button,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';
import {FetchLocal, localStore} from '../LocalData/AsyncManager';
import {useIsFocused} from '@react-navigation/native';
import {getTodayDate} from '../LocalData/InvoiceManager';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const PERCENT = 'PERCENT';
const NUMTYPE = 'NUMBER';
export default function NewBills({navigation}) {
  const isFocused = useIsFocused();
  const {width, height} = Dimensions.get('screen');
  // const pickerRef = useRef();
  const [partyName, setPartyName] = useState('');
  const [additionalCharge, setAdditionalCharge] = useState([]);
  const [addtionalInput, setaddtionalInput] = useState({name: '', amount: ''});
  const [discount, setDiscount] = useState({
    show: false,
    value: 0,
    type: PERCENT,
  });
  const [products, setProducts] = useState([]);
  const [billItem, setBillItem] = useState([]);
  const [inVoiceID, setInVoiceID] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [refreshScreen, setRefreshScreen] = useState(false);
  const [showHideToggle, setShowHideToggle] = useState(true);

  useEffect(() => {
    (async () => {
      const totalInVoice = await localStore.fetchIdForNewBill();
      setInVoiceID(+totalInVoice.length + 1);
      console.log('<<<id for new bill');
      setTotalAmount(0);
      const data = await FetchLocal.products();
      setProducts(data.reverse());
    })();
  }, [isFocused, refreshScreen]);

  const getTotalForDis = () => {
    let total = 0;
    billItem.map(item => {
      total = total + item.qtty * item.price;
    });
    console.log(
      totalAdditionalCharge(additionalCharge),
      '<<<additional charge',
    );

    return total + totalAdditionalCharge(additionalCharge);
  };
  const calculateAmount = () => {
    let total = 0;
    billItem.map(item => {
      total = total + item.qtty * item.price;
    });
    console.log(
      totalAdditionalCharge(additionalCharge),
      '<<<additional charge',
    );

    return total + totalAdditionalCharge(additionalCharge) - +addDiscount();
    // return total + totalAdditionalCharge(additionalCharge) - addDiscount();
  };

  const saveInvoice = () => {
    // if (partyName.trim() == '') return Alert.alert('Enter Party Name');
    if (billItem.length == 0) return Alert.alert('Select Products');
    const payloadData = {
      date: getTodayDate(),
      // partyName: partyName,
      // id: inVoiceID,
      totalAmount: calculateAmount(),
      billItem,
      isGenerated: false,
    };

    localStore.updateStock(billItem);
    // updateStock(/)
    // return null;
    console.log(payloadData);
    localStore.uploadInvoice(payloadData, res => {
      if (res.success) {
        Alert.alert('Invoice saved in draft');
        setRefreshScreen(!refreshScreen);
      }
    });
  };
  const generateInvoice = () => {
    // if (partyName.trim() == '') return Alert.alert('Enter Party Name');
    if (billItem.length == 0) return Alert.alert('Select Products');
    const payloadData = {
      date: getTodayDate(),
      // partyName: partyName,
      // id: inVoiceID,
      totalAmount: calculateAmount(),
      billItem,
      isGenerated: true,
    };
    console.log(payloadData, '<<payload data');
    localStore.uploadInvoice(payloadData, res => {
      if (res.success) {
        Alert.alert('Invoice saved in draft');
        setRefreshScreen(!refreshScreen);
      }
    });
  };
  const isItemExist = (billItem, item) => {
    const data = billItem.filter(temp => temp.id == item.id);
    if (data.length) return true;
    else return false;
  };
  const inCreaseQtty = (billItem, item) => {
    setBillItem(
      billItem.map(temp => {
        if (temp.id != item.id) return temp;
        else return {...temp, qtty: +temp.qtty + 1};
      }),
    );
    setTotalAmount(calculateAmount());
  };
  const decreaseQtty = (billItem, item) => {
    setBillItem(
      billItem.map(temp => {
        if (temp.id != item.id) return temp;
        else {
          if (temp.qtty == 1) {
            return {...temp, qtty: +item.qtty};
          }
          if (temp.qtty != 1) {
            return {...temp, qtty: +item.qtty - 1};
          }
        }
      }),
    );
    setTotalAmount(calculateAmount());
  };
  const deleteItem = item => {
    setBillItem(billItem.filter(temp => temp.id != item.id));
    setTotalAmount(calculateAmount());
  };
  const addIteminList = ([], item) => {
    console.log(
      '\n\n\n Adding new ite --> \t',
      item,
      '\n PRevious items-->\t',
      billItem,
    );

    if (isItemExist(billItem, item)) {
      console.log('\n\nexist');
      inCreaseQtty(billItem, item);
    } else {
      console.log('\nnew');
      setBillItem([...billItem, {...item, qtty: 1}]);
    }
  };

  const selectedProductsFromProductScreen = products => {
    let initialData = [];
    products.map(item => {
      const checkExist = billItem.filter(pro => pro.id == item.id);
      if (checkExist.length) {
        initialData = [...initialData, checkExist[0]];
      } else {
        initialData = [...initialData, {...item, qtty: 1}];
      }
    });
    console.log('\n\n\n\n\n', initialData, '<<<initial data');
    // Alert.alert('Saved');
    setBillItem(initialData);
    setTotalAmount(calculateAmount());
  };
  const addCharge = () => {
    console.log('add charge called');
    setAdditionalCharge([
      ...additionalCharge,
      {name: '', amount: 0, id: additionalCharge.length + 1},
    ]);
  };
  const removeCharge = id => {
    console.log(id, '<<< id is');
    const filterIT = additionalCharge.filter(item => item.id != id);
    console.log(filterIT, '<<<<');
    setAdditionalCharge(additionalCharge.filter(item => item.id != id));
  };

  const totalAdditionalCharge = arr => {
    let total = 0;
    console.log('total called additional charge');
    arr.map(item => {
      total = +total + +item.amount;
    });

    return total;
  };

  const addAdditionalContent = id => {
    if (
      addtionalInput.name == '' ||
      addtionalInput.amount == 0 ||
      addtionalInput.amount == null
    ) {
      console.log(addtionalInput);
      return Alert.alert('Check Fields');
    }
    let temp = additionalCharge;
    temp = temp.map(item => {
      if (item.id != id) return item;
      else
        return {
          id: item.id,
          name: addtionalInput.name,
          amount: addtionalInput.amount,
        };
    });

    // setAdditionalCharge(temp);
    setAdditionalCharge(temp);
    setTotalAmount(totalAmount + totalAdditionalCharge(temp));

    // return totalAdditionalCharge(temp);
    // setAdditionalCharge([])
  };
  useEffect(() => {
    console.log(addtionalInput, '<<<<addtional input');
    if (addtionalInput.name != '' && addtionalInput.amount != '') {
      let temp = additionalCharge;
      temp = temp.map(item => {
        if (item.id != id) return item;
        else
          return {
            id: item.id,
            name: addtionalInput.name,
            amount: addtionalInput.amount,
          };
      });

      // setAdditionalCharge(temp);
      setAdditionalCharge(temp);
      setTotalAmount(totalAmount + totalAdditionalCharge(temp));
    }
  }, [addtionalInput]);

  const onChangeAdditional = (name, value, id) => {
    // let temp = additionalCharge;
    console.log(name, value);
    setaddtionalInput({...addtionalInput, [name]: value});

    // temp = temp.map(item => {
    //   if (item.id != id) return item;
    //   else return {...item, [name]: value};
    // });
    // setAdditionalCharge(temp);
  };

  const addDiscount = () => {
    if (discount.type == PERCENT) {
      const amt = (discount.value * getTotalForDis()) / 100;
      console.log('discount >>>>', amt, discount.value, totalAmount);
      return amt;
      // setTotalAmount(+totalAmount - amt);
    }
    if (discount.type == NUMTYPE) {
      // const amt = (discount.value * PERCENT) / 100;
      return discount.value;
      // setTotalAmount(+totalAmount - discount.value);
    }
  };

  const Card = () => {
    return (
      <View
        style={{
          // marginVertical: 10,
          // marginHorizontal: 5,
          borderColor: '#ccc',
          // paddingHorizontal: 10,
          borderWidth: 0.8,
          borderRadius: 20,
        }}>
        <View style={{...style.card, height: 60}}>
          <View>
            <Text style={style.textStyle}>Invoice #{inVoiceID} </Text>
            <Text style={style.textStyle2}>{getTodayDate()} </Text>
          </View>
          <View>
            {/* <Icon
              name="edit"
              color={COLORS.themeColor}
              size={26}
              style={{paddingHorizontal: 4}}
            /> */}
          </View>
        </View>
      </View>
    );
  };

  const CardTotal = () => {
    return (
      <View
        style={{
          marginTop: 1,
          marginHorizontal: 5,
        }}>
        <View style={style.cardTotal}>
          <View>
            <Text style={style.textStyle}>Sub Total</Text>
          </View>
          <View>
            <Text style={style.textStyle}>{calculateAmount()}</Text>
          </View>
        </View>
      </View>
    );
  };

  const ItemShowcase = billItem => {
    return (
      <>
        <ScrollView
          style={{
            maxHeight: 200,
          }}>
          <View
            style={{
              marginVertical: 2,
              marginHorizontal: 5,
              borderColor: '#ccc',
              borderWidth: 0.8,
              paddingVertical: 1,
              backgroundColor: '#fff',
            }}>
            {billItem.map(item => (
              <View
                style={{
                  height: 70,
                  // borderColor: '#777',
                  // borderWidth: 1,
                }}>
                <View style={style.card}>
                  <Text style={{...style.textStyle4}}>{item.name}</Text>
                  <Text style={style.textStyle4}>Rs {item.price}</Text>
                </View>
                <View style={{...style.card, height: 20}}>
                  <Text style={{...style.textStyle4, fontSize: 12}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: COLORS.themeColor,
                          borderRadius: 5,
                        }}>
                        <Icon
                          name="add"
                          onPress={() => inCreaseQtty(billItem, item)}
                          color={'#fff'}
                          size={20}
                          style={{padding: 1}}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 19,
                          fontWeight: 'bold',
                          paddingHorizontal: 7,
                        }}>
                        {item.qtty}
                      </Text>
                      <View
                        style={{
                          backgroundColor: COLORS.themeColor,
                          borderRadius: 5,
                        }}>
                        <Icon
                          name="remove"
                          onPress={() => decreaseQtty(billItem, item)}
                          color={'#fff'}
                          size={20}
                          style={{padding: 2}}
                        />
                      </View>
                    </View>
                  </Text>
                  <Text style={{...style.textStyle4, fontSize: 12}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <Icon
                        name="clear"
                        onPress={() => deleteItem(item)}
                        color={COLORS.themeColor}
                        size={22}
                        style={{paddingLeft: 4}}
                      />
                    </View>
                  </Text>
                </View>
              </View>
            ))}
            {/* <View style={style.card}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View
                style={{backgroundColor: COLORS.themeColor, borderRadius: 5}}>
                <Icon
                  name="add"
                  onPress={() => inCreaseQtty(billItem, item)}
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
              <View
                style={{backgroundColor: COLORS.themeColor, borderRadius: 5}}>
                <Icon
                  name="remove"
                  onPress={() => decreaseQtty(billItem, item)}
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
                color={COLORS.themeColor}
                size={26}
                style={{paddingRight: 4}}
              />
              <Icon
                name="clear"
                color={COLORS.themeColor}
                size={29}
                style={{paddingLeft: 4}}
              />
            </View>
          </View> */}
          </View>
        </ScrollView>

        {/* <View style={{marginHorizontal: 8}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
            }}>
            <Icon
              name="add"
              color={COLORS.themeColor}
              size={23}
              style={{padding: 2}}
            />
            <Text style={{color: COLORS.themeColor}}>Additional Charges</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
            }}>
            <Icon
              name="add"
              color={COLORS.themeColor}
              size={23}
              style={{padding: 2}}
            />
            <Text style={{color: COLORS.themeColor}}>Discount</Text>
          </View>
        </View> */}
      </>
    );
  };

  return (
    <>
      <ScrollView style={{padding: 10}}>
        <Card />
        {/* <Text style={style.textStyle}>Party Name</Text>
        <View style={style.inputContainer}>
          <TextInput
            style={{flex: 1, fontSize: 18}}
            // keyboardType={item.keyboard}
            placeholder="Enter Name"
            onChangeText={text => setPartyName(text)}
          />
        </View> */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
          onPress={() =>
            navigation.navigate('Select Product', {
              data: {
                onPressProduct: pro => addIteminList([], pro),
                billItem,
                setBillItem: setBillItem,
                saveProducts: selectedProductsFromProductScreen,
                deleteItem,
              },
            })
          }>
          <Text style={style.selectproduct}>Select Product</Text>
        </TouchableOpacity>
        {/* <Picker
          onValueChange={(itemValue, itemIndex) => {
            setBillItem([itemValue, ...billItem]);
            addIteminList(billItem, itemValue);
          }}>
          <Picker.Item label="Select Products" value="null" />
          {products.map(item => (
            <Picker.Item label={item.name} value={item} />
          ))}
        </Picker> */}
        <Text
          style={{...style.textStyle, ...style.show}}
          onPress={() => setShowHideToggle(!showHideToggle)}>
          {showHideToggle ? 'Hide' : 'Show'}
        </Text>
        {showHideToggle && ItemShowcase(billItem)}
        {additionalCharge.map(item => {
          return (
            <View style={style.addInput}>
              <Text
                style={{...style.addButt, fontSize: 25}}
                onPress={() => removeCharge(item.id)}>
                x {item.id}
              </Text>
              <TextInput
                onChangeText={e => {
                  // setaddtionalInput({...addtionalInput, name: e});
                  onChangeAdditional('name', e, item.id);
                }}
                // value={item.name}
                style={{
                  ...style.addsingleInput,
                  // flex: 1,
                  fontSize: 15,
                  width: '50%',
                  backgroundColor: '#ffff',
                }}
                // keyboardType={item.keyboard}
                placeholder="Charge Name"
              />
              <TextInput
                // value={item.amount}
                style={{
                  ...style.addsingleInput,
                  // flex: 1,
                  width: '30%',

                  fontSize: 18,
                  backgroundColor: '#ffff',
                }}
                // keyboardType={item.keyboard}
                placeholder="Amount"
                onChangeText={e => {
                  // setaddtionalInput({...addtionalInput, amount: e})
                  onChangeAdditional('amount', e, item.id);
                }}
              />
              <Text
                style={style.addButt}
                onPress={() => addAdditionalContent(item.id)}>
                Add
              </Text>
            </View>
          );
        })}

        <View style={{marginHorizontal: 8}}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 'auto',
              }}>
              <Icon
                onPress={() => addCharge()}
                name="add"
                color={COLORS.themeColor}
                size={23}
                style={{padding: 2}}
              />
              <Text
                style={{color: COLORS.themeColor}}
                onPress={() => addCharge()}>
                Additional Charges
              </Text>
            </View>
          </TouchableOpacity>

          {discount.show && (
            <View style={style.addInput}>
              <Text
                style={{...style.addButt, fontSize: 25}}
                onPress={() => {
                  setDiscount({...discount, show: false});
                }}>
                x
              </Text>

              <TextInput
                value={discount.value}
                style={{
                  ...style.addsingleInput,
                  // flex: 1,
                  width: '30%',

                  fontSize: 18,
                  backgroundColor: '#ffff',
                }}
                placeholder="Amount"
                onChangeText={e => {
                  setDiscount({...discount, value: e});
                }}
              />
              <Text
                style={{
                  ...style.peram,
                  backgroundColor:
                    discount.type == PERCENT ? COLORS.themeColor : '#fff',
                  color: discount.type != PERCENT ? COLORS.themeColor : '#fff',
                }}
                onPress={() => {
                  setDiscount({...discount, type: PERCENT});
                  // addDiscount();
                }}>
                Percent
              </Text>
              <Text
                style={{
                  ...style.peram,
                  backgroundColor:
                    discount.type != PERCENT ? COLORS.themeColor : '#fff',
                  color: discount.type == PERCENT ? COLORS.themeColor : '#fff',
                }}
                onPress={() => {
                  setDiscount({...discount, type: NUMTYPE});
                  // addDiscount();
                }}
                // onPress={() => addAdditionalContent(item.id)}
              >
                Number
              </Text>

              <Text
                style={style.addButt}
                // onPress={() => addAdditionalContent(item.id)}>
                onPress={() => addDiscount()}>
                Add
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() => {
              console.log('show');
              setDiscount({
                ...discount,
                show: true,
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 'auto',
              }}>
              <Icon
                name="add"
                color={COLORS.themeColor}
                size={23}
                style={{padding: 2}}
              />
              <Text style={{color: COLORS.themeColor}}>Discount</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <ItemShowcase /> */}
        <CardTotal />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: height / 1.48,
          alignSelf: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderColor: COLORS.themeColor,
            borderWidth: 1,
            elevation: 10,
            padding: 10,
            borderRadius: 10,
            width: width / 4,
            marginHorizontal: width / 8,
            alignItems: 'center',
          }}>
          <Icon
            name="save"
            color={COLORS.themeColor}
            size={20}
            onPress={saveInvoice}
          />
          <Text style={style.textStyle3} onPress={saveInvoice}>
            Save
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            borderColor: COLORS.themeColor,
            borderWidth: 1,
            elevation: 10,
            width: width / 4,
            padding: 5,
            borderRadius: 10,
            marginHorizontal: width / 8,
            alignItems: 'center',
          }}>
          <Icon
            name="nat"
            color={COLORS.themeColor}
            size={20}
            onPress={generateInvoice}
          />
          <Text style={style.textStyle3} onPress={generateInvoice}>
            Generate
          </Text>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 2,
    paddingHorizontal: 20,
    marginVertical: 2,
  },
  peram: {
    color: COLORS.themeColor,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  addInput: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#fff',

    alignItems: 'center',
    padding: 10,
    // gap: '2%',
  },
  addsingleInput: {
    height: 30,
    fontSize: 3,
    padding: 3,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  addButt: {
    // width: '20%',
    color: COLORS.themeColor,
    fontSize: 15,
    // textAlign: 'center',
    // flexDirection: 'row',
    // alignContent: 'center',
  },
  show: {
    // backgroundColor: ,
    marginBottom: 10,
  },
  selectproduct: {
    width: '60%',
    borderRadius: 15,
    padding: 5,

    margin: 'auto',
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: COLORS.themeColor,
    color: '#ffffff',
  },

  textStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgba(0,0,0,0.9)',
    paddingVertical: 3,
  },
  textStyle4: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'rgba(0,0,0,0.9)',
    paddingVertical: 3,
  },
  textStyle2: {
    fontSize: 16,
    paddingVertical: 3,
    color: 'grey',
  },
  textStyle3: {
    fontWeight: 'bold',
    fontSize: 12,
    paddingVertical: 5,
    color: COLORS.themeColor,
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
    paddingHorizontal: 20,
    // paddingVertical: 1,
    height: 30,
    // borderRadius: 20,
    alignItems: 'center',
  },
  itemadd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 1,
    height: 50,
    fontSize: 12,
    // borderRadius: 20,
    alignItems: 'center',
  },
  cardTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: 'center',
  },
});
