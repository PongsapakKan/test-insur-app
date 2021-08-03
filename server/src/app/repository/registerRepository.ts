import { DocumentDefinition } from "mongoose";
import Register,{ RegisterDocument } from "./entity/registerDocument";

export async function saveRegisterInfo(input: DocumentDefinition<RegisterDocument>) {
    try {
        return await Register.create(input);
    } catch (error) {
        throw new Error(error);
    }
}