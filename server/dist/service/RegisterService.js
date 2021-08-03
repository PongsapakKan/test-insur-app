"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("config"));
const registerRepository_1 = require("../repository/registerRepository");
const getProductUrl = config_1.default.get("ExternalEndpoint.getProduct.url");
const token = config_1.default.get("ExternalEndpoint.getProduct.token");
function register(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const getProductReq = {
            genderCd: req.gender,
            dob: req.dob,
            planCode: req.plan,
            premiumPerYear: req.premium,
            paymentFrequency: req.paymentTerm
        };
        const sumAssured = yield axios_1.default.post(getProductUrl, getProductReq, {
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
            registerRepository_1.saveRegisterInfo(doc);
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
exports.register = register;
//# sourceMappingURL=registerService.js.map