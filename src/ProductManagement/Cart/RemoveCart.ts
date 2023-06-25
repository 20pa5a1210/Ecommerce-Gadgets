import axios from "axios";
import { CartAction } from "../CartStore";
import { toast } from "react-hot-toast";
type CartItemProps = {
    token: string | null;
    username: string | null;
    itemId: string;
    cartDispatch: React.Dispatch<CartAction>;

}

export const removeItemFromCart = ({ token, username, itemId, cartDispatch }: CartItemProps) => {
    if (token) {
        axios
            .delete(`http://localhost:8080/cart/remove/${username}/${itemId}`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then((res) => {
                cartDispatch({ type: "REMOVE_ITEM", payload: itemId });
                cartDispatch({ type: "SET_CART", payload: res.data.cartItems });
                toast.success("Item removed from cart");
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }
};

