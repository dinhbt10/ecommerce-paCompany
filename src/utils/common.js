export const formatNumber = (number) => {
  return Number(number).toLocaleString("de-De") + "đ";
};

export function getDateIfWithin7Days(isoString) {
  const inputDate = new Date(isoString);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - inputDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return true;
  } else {
    return false;
  }
}

export const saveToLocalStorage = (userinfo) => {
  localStorage.setItem("userinfo", JSON.stringify(userinfo));
};

export const getUserInfoLocalStorage = () => {
  const userData = localStorage.getItem("userinfo");
  return JSON.parse(userData);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
