import React, { useContext } from "react";
import { CartContext } from "./CartStore";

const Cart: React.FC = () => {
  const { cartState, cartDispatch } = useContext(CartContext);

  const removeItemFromCart = (itemId: string) => {
    cartDispatch({ type: "REMOVE_ITEM", payload: itemId });
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartState.cartItems.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p>
          <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={() => cartDispatch({ type: "CLEAR_CART" })}>
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
