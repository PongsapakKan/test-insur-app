import express, { Router, Request, Response } from 'express';
import { GetProductRequest } from '../models/api/request/getProductRequest';
import { checkSchema, validationResult } from 'express-validator';
import { json } from 'body-parser';
import { getProduct } from '../service/productService';

var router: Router = express.Router();

const validateCaculateRequest = checkSchema({
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
      options:[['MALE', 'FEMALE']],
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

router.post('/', json(), validateCaculateRequest, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const getProductRequest: GetProductRequest = req.body as GetProductRequest;
  getProduct(getProductRequest)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({ errors: [{ message: 'Internal server error.'}]})
    });
  
});

module.exports = router;