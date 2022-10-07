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
  // console.log('\n\n\n ', arr, '\n\n ', payload, '\n\n\n\n<<<< payload data');
  return arr.map(item => {
    console.log(item.id, '----', payload);
    if (item.id != payload.id) return item;
    else {
      // console.log('\n\nmatchied', {...item, ...payload});
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
  console.log(payload, '<<< \n\n\n this is payload \n\n');
  const prevProducts = await FetchLocal.products();
  const updated = findAndreplace(payload, prevProducts);
  console.log(updated, '<< \n\n updated \n\n');
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
    stringIt([...prvInvoice, {...payload, id: prvInvoice.length + 1}]),
    res => {
      callBack({success: true});
    },
  );
};

const editInvoice = async (payload, callBack) => {
  const prevInvoice = await FetchLocal.invoice();

  const updated = findAndreplace(payload, prevInvoice);
  console.log('\n\n\n', updated, '<<<updated invoice');
  AsyncStorage.setItem(AsyncTag.ALL_BILL, stringIt([...updated]), res => {
    callBack({success: true});
  });
};
const deleteInvoiceById = async (id, callBack) => {
  const prevProducts = await FetchLocal.invoice();
  const updatedProduct = filterAndRemove(id, prevProducts);
  AsyncStorage.setItem(
    AsyncTag.ALL_BILL,
    stringIt([...updatedProduct]),
    res => {
      console.log(res);
      callBack({success: true});
    },
  );
};

const fetchProducts = () => FetchLocal.products();
const fetchInvoice = () => FetchLocal.invoice();
const fetchIdForNewBill = () => FetchLocal.invoice();
// ------------------------------------

export const localStore = {
  uploadProducts,
  deleteProductByID,
  editProduct,
  uploadInvoice,
  editInvoice,
  deleteInvoiceById,
  fetchInvoice,
  fetchProducts,
  fetchIdForNewBill,
};
