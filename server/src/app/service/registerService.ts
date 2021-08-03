import axios from "axios";
import config from "config";
import { RegisterRequest } from "../models/api/request/registerRequest";
import { saveRegisterInfo } from "../repository/registerRepository";

const getProductUrl = config.get("ExternalEndpoint.getProduct.url");
const token = config.get("ExternalEndpoint.getProduct.token");

export async function register(req: RegisterRequest): Promise<boolean> {
    const getProductReq = {
        genderCd: req.gender,
        dob: req.dob,
        planCode: req.plan,
        premiumPerYear: req.premium,
        paymentFrequency: req.paymentTerm
    };
    const sumAssured = await axios.post(getProductUrl, getProductReq, {
        headers: {
            'Postman-Token': token
        }
    }).then((response) => {
        return response.data.quotationProductList[0].baseSumAssured;
    }).catch((error) => {
        throw new Error(error);
    });
    try {
        const doc = {
            firstName: req.firstName,
            lastName: req.lastName,
            gender: req.gender,
            dob: req.dob,
            plan: req.plan,
            premium: req.premium,
            paymentTerm: req.paymentTerm,
            sumAssured: sumAssured
        };
        saveRegisterInfo(doc);
        return true;
    } catch (error) {
        return false;
    }
}