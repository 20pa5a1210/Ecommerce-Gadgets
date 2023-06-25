import React, { createContext, useContext, useEffect, useReducer } from "react";
import { BaseProduct } from "./ProductModels";
import cartReducer from "./CartReducer";
import { initialState } from "./CartState";
import { UserContext } from "../Home/userStore";
import axios from "axios";
interface Product extends BaseProduct {
  quantity: number;
}
export interface CartState {
  cartItems: Product[];
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: Product[] }
  | { type: "INCREASE_QUANTITY"; payload: string }
  | { type: "DECREASE_QUANTITY"; payload: string };

export const CartContext = createContext<{
  cartState: CartState;
  cartDispatch: React.Dispatch<CartAction>;
}>({
  cartState: initialState,
  cartDispatch: () => {
    throw new Error("cartDispatch function not implemented");
  },
});
type UserProviderProps = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);
  const { token, username } = useContext(UserContext);

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:8080/cart/${username}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          cartDispatch({ type: "SET_CART", payload: response.data.cartItems });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};
