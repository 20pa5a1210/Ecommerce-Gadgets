
export interface BaseProduct {
    _id: string;
    id: string;
    name: string;
    brand: string;
    price: number;
    rating: number;
    type: string;
    image: string;
    description: string;
}

export interface CartItemProduct extends BaseProduct {
    quantity: number;
}