
import axios from "axios";
import { CartAction } from "../CartStore";
import { toast } from "react-hot-toast";
type CartItemProps = {
    token: string | null;
    username: string | null;
    cartDispatch: React.Dispatch<CartAction>;

}

export const clearCart = ({ token, username, cartDispatch }: CartItemProps) => {
    if (token) {
        axios
            .delete(`http://localhost:8080/cart/clear/${username}`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then((res) => {
                cartDispatch({
                    type: "CLEAR_CART",
                });
                cartDispatch({
                    type: "SET_CART",
                    payload: res.data.cartItems,
                });
                toast.success("Cart cleared");
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }
};