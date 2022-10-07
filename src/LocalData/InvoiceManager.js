import AsyncStorage from '@react-native-community/async-storage';

const BILL_ACTION = {
  CREATE_BILL: 'CREATE_BILL',
  ALL_BILL: 'ALL_BILL',
};

export const getTodayDate = () => {
  const currDate = new Date();
  const todayDate = currDate.getDate();
  const todayMonth = currDate.getMonth() + 1;
  const y = currDate.getFullYear();
  return `${todayDate}/${todayMonth}/${y}`;
};
