import Banner from "./Banner"
import Navbar from "./Navbar"
import { useEffect } from "react"
import ProductPage from "./ProductPage"
export default function LandingPage() {
    useEffect(() => {
        document.title = "Landing Page";
    }, []);
    return (
        <>
            <Navbar />
            <Banner />
            
            <ProductPage/>
        </>
    )
}
