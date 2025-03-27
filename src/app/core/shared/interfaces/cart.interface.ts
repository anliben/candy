import { CartProduct } from "./cart-product.interface";

export interface Cart {
    id: number;
    user_id: number;
    date: Date;
    products: CartProduct[];
}