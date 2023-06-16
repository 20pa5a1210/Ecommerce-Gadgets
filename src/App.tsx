import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterUser from "./Home/RegisterUser";
import LandingPage from "./Home/LandingPage";
import ViewProduct from "./Home/SingleProduct";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/product/:productId" element={<ViewProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
