import axios from "axios";
import { CartAction } from "../CartStore";
type CartItemProps = {
    token: string | null;
    username: string | null;
    itemId: string;
    cartDispatch: React.Dispatch<CartAction>;

}


export const IncrementQuantity = ({ token, username, itemId, cartDispatch }: CartItemProps) => {
    if (token) {
        cartDispatch({ type: "INCREASE_QUANTITY", payload: itemId });
        axios
            .put(
                `http://localhost:8080/cart/increment/${username}/${itemId}`,
                null,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            )
            .then((res) => {
                cartDispatch({ type: "SET_CART", payload: res.data.cartItems });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

export const DecrementQuantity = ({ token, username, itemId, cartDispatch }: CartItemProps) => {
    if (token) {
        cartDispatch({ type: "DECREASE_QUANTITY", payload: itemId });
        axios
            .put(
                `http://localhost:8080/cart/decrement/${username}/${itemId}`,
                null,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            )
            .then((res) => {
                cartDispatch({ type: "SET_CART", payload: res.data.cartItems });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};