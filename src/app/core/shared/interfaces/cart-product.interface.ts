import { Product } from "./products.interface";

export interface CartProduct extends Product {
    quantity: number;
}