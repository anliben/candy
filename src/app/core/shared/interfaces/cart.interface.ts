import { CartProduct } from "./cart-product.interface";

export interface CartCreate {
    userId: number;
    date: Date;
    products: CartProduct[];
}

export interface Cart {
    id: number;
    userId: number;
    date: Date;
    products: CartProduct[];
}