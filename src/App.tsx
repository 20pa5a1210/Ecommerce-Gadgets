import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterUser from "./Home/RegisterUser";
import LandingPage from "./Home/LandingPage";
import ViewProduct from "./Home/SingleProduct";
import LoginUser from "./Home/LoginUser";
import Dashboard from "./Home/Dashboard";
import { UserProvider } from "./Home/userStore";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product/:productId" element={<ViewProduct />} />
          <Route path="/user/login" element={<LoginUser />} />

          <Route path="/user/dashboard" element={<Dashboard />} />

          <Route path="/user/register" element={<RegisterUser />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
