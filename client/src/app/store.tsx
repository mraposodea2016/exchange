import {configureStore} from "@reduxjs/toolkit";
import BalancesSlice from "../features/balances/BalancesSlice"

export const store = configureStore({
    reducer: {
        balances: BalancesSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch