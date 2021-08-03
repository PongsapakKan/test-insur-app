import mongoose from "mongoose";

export interface RegisterDocument extends mongoose.Document {
    firstName: string,
    lastName: string,
    gender: string,
    dob: Date,
    plan: string,
    premium: number,
    paymentTerm: string
}

const RegisterSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, required: true },
        dob: { type: Date, required: true },
        plan: { type: String, required: true },
        premium: { type: Number, required: true },
        paymentTerm: { type: String, required: true },
        sumAssured: { type: Number, required: true },
    }
);

const Register = mongoose.model<RegisterDocument>("register", RegisterSchema);
export default Register;