import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../app/store';
import axios from "axios";
import { GetProductResponse, GetProductRequest } from './getProductModel';

const initialState = {
    result: {
        baseSumAssured: 0,
        baseAnnualPremium: 0,
        productTerm: 0,
        paymentFrequency: '',
        plan: {
            code: '',
            package: ''
        }
    },
    loading: true,
    success: false
}

export const calculateSumAssureSlice = createSlice({
    name: 'calculateProduct',
    initialState,
    reducers: {
        calculateSumAssure: (state, action) => {
            state.result = action.payload
            state.loading = false
            state.success = true
        }
    }
})

export default calculateSumAssureSlice.reducer;

const { calculateSumAssure } = calculateSumAssureSlice.actions;
const serverHost = process.env.SERVER_HOST || 'http://localhost:3001'

export const calculateInsurance = (req: GetProductRequest): ThunkAction<void, RootState, unknown, PayloadAction<GetProductResponse>> => async dispatch => {
    try {
        axios.post(`${serverHost}/api/getProduct`, req, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => {
            dispatch(calculateSumAssure(resp.data));
        })
    } catch (error) {
        return console.log(error);
    }
}