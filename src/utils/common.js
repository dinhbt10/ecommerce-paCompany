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

export function isWithin24Hours(inputDateString) {
  // Chuyển đổi chuỗi thời gian input thành đối tượng Date
  const inputDate = new Date(inputDateString);

  // Lấy thời gian hiện tại
  const currentDate = new Date();

  // Tính khoảng cách giữa hai thời gian (đơn vị là milliseconds)
  const timeDifference = currentDate - inputDate;

  // 24 giờ = 24 * 60 * 60 * 1000 milliseconds
  const hours24 = 24 * 60 * 60 * 1000;

  // Kiểm tra xem khoảng cách có nhỏ hơn hoặc bằng 24 giờ không
  return timeDifference <= hours24;
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

export function convertDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
