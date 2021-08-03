import axios from "axios";
import config from "config";
import { GetProductRequest } from "../models/api/request/getProductRequest";
import { GetProductResponse } from "../models/api/response/calculatedResponse";
import { saveRegisterInfo } from "../repository/productRepository";

const getProductUrl = config.get("ExternalEndpoint.getProduct.url");
const token = config.get("ExternalEndpoint.getProduct.token");

export async function getProduct(req: GetProductRequest): Promise<GetProductResponse> {
    const getProductReq = {
        genderCd: req.gender,
        dob: req.dob,
        planCode: req.plan,
        premiumPerYear: req.premium,
        paymentFrequency: req.paymentTerm
    };
    const product = await axios.post(getProductUrl, getProductReq, {
        headers: {
            'Postman-Token': token
        }
    }).then((response) => {
        return response.data.quotationProductList[0];
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
            sumAssured: product
        };
        saveRegisterInfo(doc);

        let planPackage: string;
        switch(product.planCode) {
            case 'T11A20': 
                planPackage = "package 1 (benefit 200k)";
                break;
            case 'T11A50':
                planPackage = "package 2 (benefit 500k)";
                break;
            case 'T11AM1': 
                planPackage = "package 3 (benefit 1M)";
                break;
        }

        const resp: GetProductResponse = {
            baseSumAssured: product.baseSumAssured,
            baseAnnualPremium: product.baseAnnualPremium,
            productTerm: product.productTerm,
            paymentFrequency: product.paymentFrequency,
            plan: {
                code: product.planCode,
                package: planPackage
            }
        }
        return resp;
    } catch (error) {
        throw error;
    }
}