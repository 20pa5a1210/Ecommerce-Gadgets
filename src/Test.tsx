import React, { useState, useEffect } from "react";
interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  type: string;
  image: string;
  description: string;
  features: string[];
  reviews: {
    author: string;
    rating: number;
    comment: string;
  }[];
}

function Test() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("../src/assets/Products.json");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="App">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Test;
