"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const body_parser_1 = require("body-parser");
const productService_1 = require("../service/productService");
var router = express_1.default.Router();
const validateCaculateRequest = express_validator_1.checkSchema({
    firstName: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'firstName must not empty'
        },
        exists: {
            errorMessage: 'firstName is required'
        },
        isString: {
            errorMessage: 'firstName must be string'
        }
    },
    lastName: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'lastName must not empty'
        },
        exists: {
            errorMessage: 'lastName is required'
        },
        isString: {
            errorMessage: 'lastName must be string'
        }
    },
    gender: {
        in: ['body'],
        isIn: {
            options: [['MALE', 'FEMALE']],
            errorMessage: 'Invalid gender'
        }
    },
    dob: {
        in: ['body'],
        isDate: {
            errorMessage: 'Date of birth is not date'
        },
        exists: {
            errorMessage: 'dob is required'
        }
    },
    plan: {
        in: ['body'],
        isIn: {
            options: [['T11A20', 'T11A50', 'T11AM1']],
            errorMessage: 'Invalid plan'
        }
    },
    premium: {
        in: ['body'],
        isNumeric: {
            errorMessage: 'premium must be number'
        }
    },
    paymentTerm: {
        in: ['body'],
        isIn: {
            options: [['YEARLY', 'HALFYEARLY', 'QUARTERLY', 'MONTHLY']],
            errorMessage: 'Invalid payment term'
        }
    }
});
router.post('/', body_parser_1.json(), validateCaculateRequest, (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const getProductRequest = req.body;
    productService_1.getProduct(getProductRequest)
        .then((data) => {
        res.status(201).json(data);
    })
        .catch(() => {
        res.status(500).json({ errors: [{ message: 'Internal server error.' }] });
    });
});
module.exports = router;
//# sourceMappingURL=product.js.map