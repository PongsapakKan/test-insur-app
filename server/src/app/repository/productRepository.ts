import { DocumentDefinition } from "mongoose";
import Product,{ ProductDocument } from "./entity/productDocument";

export async function saveProductInfo(input: DocumentDefinition<ProductDocument>) {
    try {
        return await Product.create(input);
    } catch (error) {
        throw new Error(error);
    }
}