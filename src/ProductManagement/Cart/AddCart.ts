import { BaseProduct } from "../ProductModels";
import { Product } from "../../Home/SingleProduct";
import axios from "axios";
import { CartAction } from "../CartStore";
import { toast } from "react-hot-toast";
type CartItemProps = {
    token: string | null;
    username: string | null;
    product: Product | BaseProduct;
    cartDispatch: React.Dispatch<CartAction>;

}

export const addToCart = ({ product, token, username, cartDispatch }: CartItemProps) => {
    const newproduct = createCartItem(product);
    if (!token) return toast.error("Please login to add to cart")
    if (token) {
        try {
            axios
                .post(
                    `http://localhost:8080/cart/add/${username}`,
                    {
                        ...newproduct,
                        quantity: 1,
                    },
                    { headers: { Authorization: `${token}` } }
                )
                .then((res) => {
                    cartDispatch({
                        type: "ADD_ITEM",
                        payload: { ...newproduct, quantity: 1 },
                    });
                    cartDispatch({
                        type: "SET_CART",
                        payload: res.data.cartItem.cart,
                    });
                    toast.success("Added to cart");
                }).catch((err) => {
                    toast.error(err.response.data.error)
                })
        } catch (error) {
            console.log(error);

        }
    }
};

function createCartItem(product: Product | BaseProduct): BaseProduct {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if ("features" in product) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { features, reviews, ...cartItem } = product;
        return cartItem;
    }
    return product;
}