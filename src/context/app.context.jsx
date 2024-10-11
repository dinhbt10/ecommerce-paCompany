import { createContext, useState } from "react";

const initState = {
  render: 0,
};

export const AppContext = createContext(initState);

const AppProvider = ({ childrens }) => {
  const [render, setRender] = useState(0);
  return (
    <AppContext.Provider value={{ render, setRender }}>
      {childrens}
    </AppContext.Provider>
  );
};

export default AppProvider;
