import React, {useEffect} from "react";
import {Button, SafeAreaView, TextInput} from "react-native";

import {connect, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import type {AppDispatch, RootState} from "../../app/store";

import type {TradeState, Transaction} from "./TradeSlice";
import {
    fetchTradeData,
    postTransactionToPool,
    setFundsAvailable,
    setQuoteAssetPrice,
    setQuoteAssetBalance,
    setCustomerId
} from "./TradeSlice";

import {BalanceType} from "../balances/Balances";
import {selectBalances} from "../balances/BalancesSlice";
import {QuoteType} from "../quotes/Quotes";

import {styles} from "./TradeStyles";
import {selectQuotes} from "../quotes/QuotesSlice";

export interface TradeFilter {
    quoteAsset: string,
    baseAsset: string,
    balances: Array<BalanceType>,
    quotes: Array<QuoteType>,
}

export interface FormState {
    baseAsset: string,
    quoteAsset: string,
    amount: number
}

const Trade: React.FC<TradeProps> = (props: TradeProps) => {
    const initialFormState: FormState = {
        baseAsset: "ETH",
        quoteAsset: "BTC",
        amount: 1.0
    }

    const [baseAsset, onChangeBaseAsset] = React.useState(initialFormState.baseAsset);
    const [quoteAsset, onChangeQuoteAsset] = React.useState(initialFormState.quoteAsset);
    const [amount, setAmount] = React.useState(initialFormState.amount);
    const onChangeAmount = (text: string) => {
        setAmount(Number(text))
    }

    const resetInputFields = (initialState: FormState): void => {
        onChangeBaseAsset(initialState.baseAsset);
        onChangeQuoteAsset(initialState.quoteAsset);
        setAmount(initialState.amount);
    }

    useEffect(() => {
        props.fetchTradeData();
    }, []);

    const balances: Array<BalanceType> = useSelector(selectBalances);
    const quotes: Array<QuoteType> = useSelector(selectQuotes);

    const tradeFilter: TradeFilter = {
        quoteAsset: quoteAsset,
        baseAsset: baseAsset,
        balances: balances,
        quotes: quotes,
    }

    const textInputs: Array<JSX.Element> = [{state: baseAsset, action: onChangeBaseAsset},
        {state: quoteAsset, action: onChangeQuoteAsset}].map((s, idx) => {
        return (<TextInput
                key={idx}
                style={styles.input}
                onChangeText={s.action}
                value={s.state}
        />);
    });

    const numericInput: JSX.Element = (<TextInput
            style={styles.input}
            onChangeText={onChangeAmount}
            value={String(amount)}
            placeholder="Trade amount"
            keyboardType="numeric"
    />);

    const buildTransactionBody = (tradeState: TradeState, formState: FormState): Transaction => {
        if (!tradeState.fundsAvailable || !tradeState.quoteAssetPrice || !tradeState.customerId) {
            throw new Error("Invalid trade!");
        }
        return {
            customer_id: tradeState.customerId,
            base_asset: formState.baseAsset,
            quote_asset: formState.quoteAsset,
            quote_asset_price: tradeState.quoteAssetPrice,
            amount: formState.amount
        };
    }

    const submitTrade = (props: TradeProps, formState: FormState, tradeFilter: TradeFilter): void => {
        props.setQuoteAssetBalance(tradeFilter);
        props.setQuoteAssetPrice(tradeFilter);
        props.setFundsAvailable(formState);
        props.setCustomerId("1");

        const tradeState = props.tradeState;
        const tx = buildTransactionBody(tradeState, formState);
        props.postTransactionToPool(tx);
    };

    const submitButton: JSX.Element = (<Button
            title="Trade"
            color="blue"
            onPress={() => {
                submitTrade(props, {baseAsset, quoteAsset, amount}, tradeFilter);
                resetInputFields(initialFormState);
            }}/>);

    return (<SafeAreaView>
        {textInputs}
        {numericInput}
        {submitButton}
    </SafeAreaView>);
}

interface TradeProps {
    tradeState: TradeState,
    fetchTradeData: typeof fetchTradeData,
    setQuoteAssetBalance: typeof setQuoteAssetBalance,
    setQuoteAssetPrice: typeof setQuoteAssetPrice,
    setFundsAvailable: typeof setFundsAvailable,
    setCustomerId: typeof setCustomerId,
    postTransactionToPool: typeof postTransactionToPool,
}

const mapStateToProps = (state: RootState): {tradeState: TradeState} => {
    return {
        tradeState: state.trade
    };
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return bindActionCreators({
        fetchTradeData: fetchTradeData,
        setQuoteAssetBalance: setQuoteAssetBalance,
        setQuoteAssetPrice: setQuoteAssetPrice,
        setFundsAvailable: setFundsAvailable,
        setCustomerId: setCustomerId,
        postTransactionToPool: postTransactionToPool,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Trade);