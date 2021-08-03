"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const body_parser_1 = require("body-parser");
const registerService_1 = require("../service/registerService");
var router = express_1.default.Router();
const validateRegisterRequest = express_validator_1.checkSchema({
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
router.post('/', body_parser_1.json(), validateRegisterRequest, (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const registerRequest = req.body;
    registerService_1.register(registerRequest)
        .then(() => {
        res.status(201).json({ updateSuccess: true });
    })
        .catch(() => {
        res.status(500).json({ errors: [{ message: 'Internal server error.' }] });
    });
});
module.exports = router;
//# sourceMappingURL=register.js.map