import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REGISTER, REGISTER_ERROR } from '../../app/types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../app/store';
import { AnyAction } from 'redux';
import axios from "axios";

const initialState = {
    result: {},
    loading: true
}

export class RegisterResponse {
    success!: boolean;
}

export const registerSlice = createSlice({
    name: 'registers',
    initialState,
    reducers: {
        registerInsurance: (state, action) => {
            state.result = action.payload
            state.loading = false
        }
    }
})

export default registerSlice.reducer;

const { registerInsurance } = registerSlice.actions;

export const postRegisterInsurance = (): ThunkAction<void, RootState, unknown, PayloadAction<RegisterResponse>> => async dispatch => {
    axios.post('')
        .then((resp) => {
            dispatch(registerInsurance(resp))
        })
        .catch((error) => {
            dispatch(registerInsurance({
                isSuccess: false
            }))
        })
    
}