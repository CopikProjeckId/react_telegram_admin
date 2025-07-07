import { Route, Routes } from "react-router-dom";
import { ROUTES_COMPONENTS } from "../lib/config";
import { ROUTES } from "../lib/types/type";

const Routers = () => {
  return (
    <Routes>
      {Object.entries(ROUTES).map(([key, value]) => (
        <Route key={key} path={value} element={ROUTES_COMPONENTS[value]} />
      ))}
    </Routes>
  );
};

export default Routers;
