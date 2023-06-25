import { useContext, useEffect } from "react";
import { CartContext } from "../CartStore";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Home/userStore";
import Navbar from "../../Home/Navbar";
import { Toaster } from "react-hot-toast";
import { removeItemFromCart } from "./RemoveCart";
import { clearCart } from "./CleatCart";
import { CartItemProduct } from "../ProductModels";

const Cart = () => {
  const { cartState, cartDispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const { token, username } = useContext(UserContext);

  useEffect(() => {
    // Check if user is logged in
    if (!token) {
      navigate("/user/login"); // Redirect to login page
    }
  }, [token, navigate]);

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = (cartItems: CartItemProduct[]) => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {cartState.cartItems.length === 0 ? (
          <p className="text-gray-600">Cart is empty</p>
        ) : (
          <>
            {cartState.cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 border-b border-gray-200 py-4"
              >
                <img
                  src={`http://source.unsplash.com/100x100/?${item.name}`}
                  alt={item.name}
                  className="w-24 h-24 rounded bg-contain"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-medium">{item.name}</h3>
                  <p className="text-gray-600 text-lg">Price: ${item.price}</p>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-500 text-lg hover:text-gray-800 focus:outline-none">
                      -
                    </button>
                    <span className="font-medium text-lg">{item.quantity}</span>
                    <button className="text-gray-500 text-lg hover:text-gray-800 focus:outline-none">
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-800 focus:outline-none"
                  onClick={() =>
                    removeItemFromCart({
                      username,
                      token,
                      cartDispatch,
                      itemId: item._id,
                    })
                  }
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Total Price:</h3>
              <p className="font-medium text-lg">
                ${calculateTotalPrice(cartState.cartItems)}
              </p>
            </div>
            <div className="mt-6">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none">
                Buy Now
              </button>
              <button
                className="ml-4 text-red-500 hover:text-red-800 focus:outline-none"
                onClick={() => clearCart({ cartDispatch, token, username })}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
