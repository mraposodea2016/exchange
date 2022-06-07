import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import axios from "axios";

import {QuoteType} from "./Quotes";

interface QuotesResponse {
    base_asset: string,
    quote_asset: string,
    price: number
}

export const fetchQuotes = createAsyncThunk("quotes/fetchQuotes", async (): Promise<Array<QuoteType>> => {
    const response = await axios.get("http://10.0.2.2:3004");
    const data = response.data;
    return data.map((quote: QuotesResponse) => {
        return {
            baseAsset: quote.base_asset,
            quoteAsset: quote.quote_asset,
            price: quote.price
        }
    });
});

export interface QuotesState {
    quotes: Array<QuoteType>
}

const initialState: QuotesState = {quotes: []};

const quotesSlice = createSlice({
    name: "quotes",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
                .addCase(fetchQuotes.fulfilled, (state: QuotesState, action: PayloadAction<Array<QuoteType>>) => {
                    state.quotes = action.payload;
                })
                .addCase(fetchQuotes.rejected, (state: QuotesState, action: PayloadAction<any>) => {
                    console.log(`Failed to fetch quotes due to ${action.payload.message}`);
                })
    }
});

export default quotesSlice.reducer;