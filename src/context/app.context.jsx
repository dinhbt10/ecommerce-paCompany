import { useState } from "react";
import { AppContext } from "./app";

const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [refreshUserInfo, setRefreshUserInfo] = useState(0);
  const [userInfo, setUserInfo] = useState(() => {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (user) => {
    localStorage.setItem("userInfo", JSON.stringify(user));
    setUserInfo(user);
  };

  const logout = () => {
    localStorage.clear();
    setUserInfo(null);
    setIsAdmin(false);
  };

  return (
    <AppContext.Provider
      value={{
        userInfo,
        login,
        logout,
        isAdmin,
        setIsAdmin,
        refreshUserInfo,
        setRefreshUserInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
