"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RegisterSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    plan: { type: String, required: true },
    premium: { type: Number, required: true },
    paymentTerm: { type: String, required: true },
    sumAssured: { type: Number, required: true },
});
const Register = mongoose_1.default.model("register", RegisterSchema);
exports.default = Register;
//# sourceMappingURL=registerDocument.js.map