import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../ProductManagement/CartStore";

import { BaseProduct as Product } from "../ProductManagement/ProductModels";

interface ProductProps {
  products: Product[];
}

const Product = ({ products }: ProductProps) => {
  const { cartDispatch, cartState } = useContext(CartContext);

  const addToCart = (_id: string) => {
    const product: Product | undefined = products.find(
      (product) => product._id === _id
    );
    if (product)
      cartDispatch({
        type: "ADD_ITEM",
        payload: { ...product, quantity: 1 },
      });
    console.log(cartState);
  };
  return (
    <div className="flex flex-wrap  space-x-4 m-4 justify-center">
      {products.map((product) => (
        <div
          key={product.id}
          className="my-4 w-1/4 cursor-pointer rounded-lg overflow-hidden border"
        >
          <Link to={`/product/${product._id}`} className="relative">
            <img
              src={`https://source.unsplash.com/1200x800?${product.type},${product.name}`}
              alt={product.name}
              className="w-full h-72 object-cover"
            />
            <button className="absolute top-2 right-2 bg-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button className="absolute top-2 right-2 bg-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3c.552 0 1 .448 1 1v2h2c.552 0 1 .448 1 1s-.448 1-1 1h-2v2c0 .552-.448 1-1 1s-1-.448-1-1v-2H7c-.552 0-1-.448-1-1s.448-1 1-1h2V4c0-.552.448-1 1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="absolute top-2 right-2 bg-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3c.552 0 1 .448 1 1v2h2c.552 0 1 .448 1 1s-.448 1-1 1h-2v2c0 .552-.448 1-1 1s-1-.448-1-1v-2H7c-.552 0-1-.448-1-1s.448-1 1-1h2V4c0-.552.448-1 1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
          <div className="p-2 flex flex-col h-1/2">
            <h2 className="text-lg font-semibold mb-2 overflow-hidden overflow-ellipsis">
              {product.name}
            </h2>
            <p className="text-gray-500 mb-2">{product.type}</p>

            <div className="flex items-center mb-2">
              {[...Array(Math.floor(product.rating))].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-current text-green-400"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="nonzero"
                    d="M10 3.764l1.902 5.865h6.16a.468.468 0 0 1 .412.724l-4.955 3.607 1.903 5.865a.468.468 0 0 1-.683.588l-5.11-3.627-5.11 3.627a.468.468 0 0 1-.683-.588l1.903-5.865-4.955-3.607a.468.468 0 0 1 .412-.724h6.16L10 3.764zm0-2.35a.502.502 0 0 1 .449.277l1.71 3.712 3.677.332a.502.502 0 0 1 .278.85l-2.815 2.307 1.002 3.392a.502.502 0 0 1-.77.553L10 13.746l-3.343 2.06a.502.502 0 0 1-.77-.553l1.002-3.392-2.814-2.307a.502.502 0 0 1 .277-.85l3.678-.332 1.71-3.712a.502.502 0 0 1 .45-.277z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              {product.rating % 1 !== 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-current text-green-400"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="nonzero"
                    d="M10 3.764l1.902 5.865h6.16a.468.468 0 0 1 .412.724l-4.955 3.607 1.903 5.865a.468.468 0 0 1-.683.588l-5.11-3.627-5.11 3.627a.468.468 0 0 1-.683-.588l1.903-5.865-4.955-3.607a.468.468 0 0 1 .412-.724h6.16L10 3.764zm0-2.35a.502.502 0 0 1 .449.277l1.71 3.712 3.677.332a.502.502 0 0 1 .278.85l-2.815 2.307 1.002 3.392a.502.502 0 0 1-.77.553L10 13.746l-3.343 2.06a.502.502 0 0 1-.77-.553l1.002-3.392-2.814-2.307a.502.502 0 0 1 .277-.85l3.678-.332 1.71-3.712a.502.502 0 0 1 .45-.277z"
                    clipRule="evenodd"
                    style={{
                      clipPath: `polygon(0 0, ${
                        (product.rating % 1) * 100
                      }% 0, ${(product.rating % 1) * 100}% 100%, 0% 100%)`,
                    }}
                  />
                </svg>
              )}
              <span className="text-gray-500 ml-2 text-sm">
                ({product.rating})
              </span>
            </div>

            <button
              onClick={() => addToCart(product._id)}
              className="bg-red-500 w-1/2 text-white px-4 py-2 rounded-xl hover:bg-slate-400 hover:text-black"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
