import { useEffect, useState } from "react";
import { BaseProduct as Product } from "../ProductManagement/ProductModels";
export default function useProducts(): Product[] {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/products") // Replace with the actual API endpoint
            .then((response) => response.json())
            .then((data) => setProducts(data.products))
            .catch((error) => console.log(error));
    }, []);
    return products;
}
