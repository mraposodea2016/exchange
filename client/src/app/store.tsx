import {configureStore} from "@reduxjs/toolkit";
import BalancesSlice from "../features/balances/BalancesSlice"
import QuotesSlice from "../features/quotes/QuotesSlice";

export const store = configureStore({
    reducer: {
        balances: BalancesSlice,
        quotes: QuotesSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch