import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterUser from "./Home/RegisterUser";
import LandingPage from "./Home/LandingPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/user/register" element={<RegisterUser />} />
            </Routes>
        </BrowserRouter>
    );
}
