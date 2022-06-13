import React, {useEffect} from "react";
import {Button, SafeAreaView, TextInput} from "react-native";

import {connect, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import type {AppDispatch, RootState} from "../../app/store";

import type {TradeState, Transaction} from "./TradeSlice";
import {initialState as initialTradeState} from "./TradeSlice";
import {
    fetchTradeData,
    postTransactionToPool,
    setFundsAvailable,
    setQuoteAsset,
    setBaseAsset,
    setQuoteAssetPrice,
    setQuoteAssetBalance,
    setCustomerId
} from "./TradeSlice";

import {BalanceType} from "../balances/Balances";
import {selectBalances} from "../balances/BalancesSlice";
import {QuoteType} from "../quotes/Quotes";

import {styles} from "./TradeStyles";
import {selectQuotes} from "../quotes/QuotesSlice";
import {NavigationProp} from "@react-navigation/native";

export interface TradeFilter {
    quoteAsset: string,
    baseAsset: string,
    balances: Array<BalanceType>,
    quotes: Array<QuoteType>,
}

export interface FormState {
    amount: number
}

const Trade: React.FC<TradeProps> = (props: TradeProps) => {
    const initialFormState: FormState = {
        amount: 1.0
    }

    const [amount, setAmount] = React.useState(initialFormState.amount);
    const onChangeAmount = (text: string) => {
        setAmount(Number(text))
    }

    const resetInputFields = (initialState: FormState, tradeInitialState: TradeState): void => {
        props.setBaseAsset(tradeInitialState.baseAsset);
        props.setQuoteAsset(tradeInitialState.quoteAsset);
        setAmount(initialState.amount);
    }

    useEffect(() => {
        props.fetchTradeData();
    }, []);

    const baseAsset: string = props.tradeState.baseAsset;
    const quoteAsset: string = props.tradeState.quoteAsset;
    const balances: Array<BalanceType> = useSelector(selectBalances);
    const quotes: Array<QuoteType> = useSelector(selectQuotes);

    const tradeFilter: TradeFilter = {
        quoteAsset: quoteAsset,
        baseAsset: baseAsset,
        balances: balances,
        quotes: quotes,
    }

    const textInputs: Array<JSX.Element> = [{state: baseAsset, action: setBaseAsset},
        {state: quoteAsset, action: setQuoteAsset}].map((s, idx) => {
        return (<TextInput
                key={idx}
                style={styles.input}
                onPressIn={() => props.navigation.navigate('AssetSelection')}
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
            base_asset: tradeState.baseAsset,
            quote_asset: tradeState.quoteAsset,
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
                submitTrade(props, {amount}, tradeFilter);
                resetInputFields(initialFormState, initialTradeState);
            }}/>);

    return (<SafeAreaView>
        {textInputs}
        {numericInput}
        {submitButton}
    </SafeAreaView>);
}

interface TradeProps {
    tradeState: TradeState,
    navigation: NavigationProp<any>,
    fetchTradeData: typeof fetchTradeData,
    setQuoteAsset: typeof setQuoteAsset,
    setBaseAsset: typeof setBaseAsset,
    setQuoteAssetBalance: typeof setQuoteAssetBalance,
    setQuoteAssetPrice: typeof setQuoteAssetPrice,
    setFundsAvailable: typeof setFundsAvailable,
    setCustomerId: typeof setCustomerId,
    postTransactionToPool: typeof postTransactionToPool,
}

const mapStateToProps = (state: RootState): { tradeState: TradeState } => {
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