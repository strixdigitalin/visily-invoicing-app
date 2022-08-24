// const {AsyncStorage} = require('react-native');

import AsyncStorage from '@react-native-community/async-storage';

const AsyncTag = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  ALL_BILL: 'ALL_BILLS',
};
const parseIt = data => JSON.parse(data);
const stringIt = data => JSON.stringify(data);

// -------------------------------------------------------

export const FetchLocal = {
  products: async () => {
    const data = await AsyncStorage.getItem(AsyncTag.ALL_PRODUCTS);
    if (data != null) return parseIt(data);
    else return [];
  },
  invoice: async () => {
    const data = await AsyncStorage.getItem(AsyncTag.ALL_BILL);
    if (data != null) return parseIt(data);
    else return [];
  },
};

const filterAndRemove = (id, arr) => {
  return arr.filter(item => {
    if (item == null) return false;
    else return item?.id != id;
  });
};

const findAndreplace = (payload, arr) => {
  return arr.map(item => {
    console.log(item.id, '----', payload);
    if (item.id != payload.id) return item;
    else {
      console.log('\n\nmatchied', {...item, ...payload});
      return {id: item.id, ...payload};
    }
  });
};

// -------------------------------------------------------------------

const uploadProducts = async (payload, callBack) => {
  const prevProducts = await FetchLocal.products();
  console.log(prevProducts);
  AsyncStorage.setItem(
    AsyncTag.ALL_PRODUCTS,
    stringIt([...prevProducts, {...payload, id: prevProducts.length}]),
    res => {
      console.log(res);
      callBack({success: true});
    },
  );
};
const editProduct = async (payload, callBack) => {
  const prevProducts = await FetchLocal.products();
  const updated = findAndreplace(payload, prevProducts);
  AsyncStorage.setItem(AsyncTag.ALL_PRODUCTS, stringIt([...updated]), res => {
    console.log(res);
    callBack({success: true});
  });
};
const deleteProductByID = async (id, callBack) => {
  const prevProducts = await FetchLocal.products();
  const updatedProduct = filterAndRemove(id, prevProducts);
  AsyncStorage.setItem(
    AsyncTag.ALL_PRODUCTS,
    stringIt([...updatedProduct]),
    res => {
      console.log(res);
      callBack({success: true});
    },
  );
};

const uploadInvoice = async (payload, callBack) => {
  const prvInvoice = await FetchLocal.invoice();
  AsyncStorage.setItem(
    AsyncTag.ALL_BILL,
    stringIt([...prvInvoice, {...payload, id: prvInvoice.length}]),
    res => {
      callBack({success: true});
    },
  );
};
const fetchProducts = () => FetchLocal.products();
const fetchInvoice = () => FetchLocal.invoice();

// ------------------------------------

export const localStore = {
  uploadProducts,
  deleteProductByID,
  editProduct,
  uploadInvoice,
  fetchInvoice,
  fetchProducts,
};
