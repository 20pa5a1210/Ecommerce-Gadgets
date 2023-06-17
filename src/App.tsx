import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterUser from "./Home/RegisterUser";
import LandingPage from "./Home/LandingPage";
import ViewProduct from "./Home/SingleProduct";
import LoginUser from "./Home/LoginUser";
import { useState } from "react";
import { userStore } from "./userStore";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <userStore.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user/register" element={<RegisterUser />} />
          <Route path="/product/:productId" element={<ViewProduct />} />
          <Route path="/user/login" element={<LoginUser />} />
        </Routes>
      </BrowserRouter>
    </userStore.Provider>
  );
}
