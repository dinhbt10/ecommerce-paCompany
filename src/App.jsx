import { Routes, Route } from "react-router-dom";
import { router } from "./navigation/router";
import MainLayout from "./components/layout/MainLayout";
function App() {
  return (
    <Routes>
      {router.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<MainLayout>{route.component}</MainLayout>}
        />
      ))}
    </Routes>
  );
}

export default App;
