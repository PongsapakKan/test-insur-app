import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../app/store';
import axios from "axios";

const initialState = {
    result: {},
    loading: true
}

export class RegisterResponse {
    success!: boolean;
}

export const calculateSumAssureSlice = createSlice({
    name: 'registers',
    initialState,
    reducers: {
        calculateSumAssure: (state, action) => {
            state.result = action.payload
            state.loading = false
        }
    }
})

export default calculateSumAssureSlice.reducer;

const { calculateSumAssure } = calculateSumAssureSlice.actions;

export const postRegisterInsurance = (): ThunkAction<void, RootState, unknown, PayloadAction<RegisterResponse>> => async dispatch => {
    axios.post('')
        .then((resp) => {
            dispatch(calculateSumAssure(resp))
        })
        .catch((error) => {
            dispatch(calculateSumAssure({
                isSuccess: false
            }))
        })
    
}