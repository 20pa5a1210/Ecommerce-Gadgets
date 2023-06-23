import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { CartContext } from "../ProductManagement/CartStore";
import { BaseProduct } from "../ProductManagement/ProductModels";
interface Product extends BaseProduct {
  features: string[];
  reviews: Review[];
}

interface Review {
  author: string;
  rating: number;
  comment: string;
}

function createCartItem(product: Product): BaseProduct {
  const { features, reviews, ...cartItem } = product;
  return cartItem;
}

const ViewProduct = () => {
  const { cartDispatch, cartState } = useContext(CartContext);

  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/products/${productId}`
        );
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
        <h2 className="text-xl space-x-3 px-4">Loading...</h2>
      </div>
    );
  }
  const addToCart = () => {
    console.log("Add to cart clicked", product);
    if (product) {
      const cartItem = createCartItem(product);
      cartDispatch({
        type: "ADD_ITEM",
        payload: { ...cartItem, quantity: 1 },
      });
      console.log(cartState);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              className="w-full"
              src={`https://source.unsplash.com/1200x800?${product.type},${product.name}`}
              alt={product.name}
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-500 mb-4">Brand: {product.brand}</p>
            <p className="text-gray-500 mb-4">Type: {product.type}</p>
            <p className="text-gray-500 mb-4">Price: ${product.price}</p>
            <p className="text-gray-500 mb-4">Rating: {product.rating}</p>
            <p className="mb-4">{product.description}</p>
            <h2 className="text-lg font-bold mb-2">Features:</h2>
            <ul className="list-disc list-inside mb-4">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={addToCart}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Add to Cart
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Buy Now
              </button>
            </div>
            <h2 className="text-lg font-bold mb-2">Reviews:</h2>
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-4 rounded shadow"
                >
                  <p className="font-bold">{review.author}</p>
                  <p className="text-gray-500 mb-2">Rating: {review.rating}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
