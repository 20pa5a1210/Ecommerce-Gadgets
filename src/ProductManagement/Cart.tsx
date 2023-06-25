import { useContext, useEffect } from "react";
import { CartContext } from "./CartStore";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Home/userStore";
import { Toaster } from "react-hot-toast";
import Navbar from "../Home/Navbar";
import { clearCart } from "./Cart/CleatCart";

const Cart = () => {
  const { cartState, cartDispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const { token, username } = useContext(UserContext);

  const removeItemFromCart = (itemId: string) => {
    cartDispatch({ type: "REMOVE_ITEM", payload: itemId });
  };
  useEffect(() => {
    // Check if user is logged in
    if (!token) {
      navigate("/user/login"); // Redirect to login page
    }
  }, [token, navigate]);
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Toaster />
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {cartState.cartItems.map((item) => {
          const total = item.price * item.quantity;
          return (
            <div key={item.id} className="mb-4 p-4 border rounded">
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="mb-2">Quantity: {item.quantity}</p>
              <p className="mb-2">Price: ${item.price}</p>
              <p className="mb-2">TotalPrice: ${total}</p>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => removeItemFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          );
        })}
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          onClick={() => {
            clearCart({ cartDispatch, token, username });
          }}
        >
          Clear Cart
        </button>
      </div>
    </>
  );
};

export default Cart;
