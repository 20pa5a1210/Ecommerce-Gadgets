import  { useEffect, useState } from "react";

interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    rating: number;
    type: string;
    image: string;
    description: string;
}
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
