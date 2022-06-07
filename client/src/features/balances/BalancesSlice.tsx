import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {BalanceType} from "./Balances";

export const fetchBalances = createAsyncThunk('balances/fetchBalances', async ():Promise<Array<BalanceType>> => {
    const response = await axios.get("http://10.0.2.2:3000/",
            {
                headers: {
                    'Access-Control-Allow-Origin': true
                }
            });
    return response.data;
});

export interface BalanceState {
    balances: Array<BalanceType>
}

const initialState: BalanceState = {balances: []};

const BalancesSlice = createSlice({
    name: "balances",
    initialState,
    reducers: {
        setBalances: (state: BalanceState, action: PayloadAction<Array<BalanceType>>): void => {
            state.balances = action.payload;
        }
    },
    extraReducers: builder => {
        builder
                .addCase(fetchBalances.fulfilled,
                        (state: BalanceState, action: PayloadAction<Array<BalanceType>>) => {
                            state.balances = action.payload;
                        })
    }
})

export default BalancesSlice.reducer;