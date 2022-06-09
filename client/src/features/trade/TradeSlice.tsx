import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {AppDispatch} from "../../app/store";
import {RootState} from "../../app/store";
import {FormState, TradeFilter} from "./Trade";
import {fetchBalances} from "../balances/BalancesSlice";
import {fetchQuotes} from "../quotes/QuotesSlice";
import axios from "axios";
import {BalanceType} from "../balances/Balances";

export const fetchTradeData = () => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(fetchBalances());
    dispatch(fetchQuotes());
};

export interface Transaction {
    customer_id: string,
    base_asset: string,
    quote_asset: string,
    pair_quote: number,
    side: string,
    amount: number
}

const HOST: string = "http://10.0.2.2";
const TX_POOL_PORT: string = "3002";

export const postTransactionToPool = createAsyncThunk("trade/postTransactionToPool",
        async (tx: Transaction): Promise<Transaction> => {
            const response = await axios.post(`${HOST}:${TX_POOL_PORT}/transactions`, {
                        transaction: tx
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
            );
            return response.data;
        });

export type TradeState = {
    customerId: string | undefined,
    quotedBalance: number | undefined,
    pairQuote: number | undefined,
    fundsAvailable: boolean,
}

const initialState: TradeState = {
    customerId: undefined,
    quotedBalance: undefined,
    pairQuote: undefined,
    fundsAvailable: false,
}

const tradeSlice = createSlice({
    name: "trade",
    initialState,
    reducers: {
        setQuotedBalance: (state: TradeState, action: PayloadAction<TradeFilter>): void => {
            const {baseAsset, quoteAsset, balances, quotes} = action.payload;
            console.log(balances);
            const quotedBalance: BalanceType | undefined = balances.find(balance => balance.asset === quoteAsset);
            if (quotedBalance) {
                state.quotedBalance = quotedBalance.amount;
            }
        },
        setPairQuote: (state: TradeState, action: PayloadAction<TradeFilter>) => {
            const {baseAsset, quoteAsset, balances, quotes} = action.payload;
            const pairQuote = quotes.find((quote) =>
                    quote.baseAsset === baseAsset
                    && quote.quoteAsset === quoteAsset
            );
            if (pairQuote) {
                state.pairQuote = pairQuote.price;
            }
        },
        setFundsAvailable: (state: TradeState, action: PayloadAction<FormState>) => {
            state.fundsAvailable = false;
            if (state.quotedBalance !== undefined && state.pairQuote !== undefined) {
                const tradeCostInBaseAsset: number = state.pairQuote * action.payload.amount;
                state.fundsAvailable = state.quotedBalance >= tradeCostInBaseAsset;
            }
        }
    },
    extraReducers: builder => {
        builder
                .addCase(postTransactionToPool.pending, (state: TradeState, action: PayloadAction<any>) => {
                    console.log("posting transaction");
                })
                .addCase(postTransactionToPool.fulfilled, (state: TradeState, action: PayloadAction<Transaction>) => {
                    console.log("transaction posted");
                    console.log(action.payload);
                })
                .addCase(postTransactionToPool.rejected, (state: TradeState, action: PayloadAction<any>) => {
                    console.log("failed to post transaction");
                })
    }
});

export const {setQuotedBalance, setPairQuote, setFundsAvailable} = tradeSlice.actions;

export default tradeSlice.reducer;