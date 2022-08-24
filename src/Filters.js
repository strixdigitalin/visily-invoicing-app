export const filterIt = (text, arr, field, callBack) => {
  const smallText = text.toLowerCase();
  const filterData = arr.filter(item => {
    if (item == null) return false;
    const searchField = item[field];
    const smallField = searchField.toLowerCase();
    const matchIt = smallField.match(smallText);
    if (matchIt != null) return true;
    else return false;
  });
  callBack(filterData);
};
