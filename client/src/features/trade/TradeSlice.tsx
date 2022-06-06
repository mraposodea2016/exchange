import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {AppDispatch} from "../../app/store";

export const tradeThunk = createAsyncThunk('trade/Thunk', async () => {
    return "";
});

const initialState = {

}

const tradeSlice = createSlice({
    name: "trade",
    initialState,
    reducers: {
        todoAction: (state, action: PayloadAction<any>) => {
            return state;
        }
    }
});

export const {todoAction} = tradeSlice.actions;

export default tradeSlice.reducer;