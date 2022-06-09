import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import axios from "axios";

import {QuoteType} from "./Quotes";
import {TradeState} from "../trade/TradeSlice";

interface QuoteResponse {
    base_asset: string,
    quote_asset: string,
    price: number
}

export const fetchQuotes = createAsyncThunk("quotes/fetchQuotes", async (): Promise<Array<QuoteType>> => {
    const response = await axios.get("http://10.0.2.2:3004");
    const data = response.data;
    return data.map((quote: QuoteResponse) => {
        return {
            baseAsset: quote.base_asset,
            quoteAsset: quote.quote_asset,
            price: quote.price
        }
    });
});

export interface QuoteState {
    quotes: Array<QuoteType>
}

const initialState: QuoteState = {quotes: []};

const quotesSlice = createSlice({
    name: "quotes",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
                .addCase(fetchQuotes.pending, (state:QuoteState, action: PayloadAction<any>) => {
                    console.log("fetching quotes");
                })
                .addCase(fetchQuotes.fulfilled, (state: QuoteState, action: PayloadAction<Array<QuoteType>>) => {
                    console.log("quotes updated");
                    state.quotes = action.payload;
                })
                .addCase(fetchQuotes.rejected, (state: QuoteState, action: PayloadAction<any>) => {
                    console.log(`Failed to fetch quotes due to ${action.payload.message}`);
                })
    }
});

export const selectQuotes = (state: {quotes: QuoteState}): Array<QuoteType> => state.quotes.quotes;

export default quotesSlice.reducer;