import { CartState, CartAction } from "./CartStore";
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingItemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );

            if (existingItemIndex !== -1) {
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex] = {
                    ...updatedCartItems[existingItemIndex],
                    quantity:
                        updatedCartItems[existingItemIndex].quantity +
                        action.payload.quantity,
                };

                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                };
            }
        }

        case "REMOVE_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            };
        case "CLEAR_CART":
            return {
                ...state,
                cartItems: [],
            };
        case "SET_CART":
            return {
                ...state,
                cartItems: action.payload,
            }
        default:
            return state;
    }
};

export default cartReducer;