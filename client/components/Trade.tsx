import React, {useEffect} from "react";
import {Button, SafeAreaView, StyleSheet, TextInput} from "react-native";
import {balancesMiddleWare, BalanceType} from "./Balances";
import {QuoteType, quotesMiddleWare} from "./Quotes";

interface TradeState {
    baseAsset: string,
    quoteAsset: string,
    side: string,
    amount: number,
    balances: Array<BalanceType>,
    quotes: Array<QuoteType>,
}

const Trade: React.FC = () => {
    const initialState: TradeState = {
        baseAsset: "Base Asset (BTC / ETH)",
        quoteAsset: "Quote Asset (BTC / ETH)",
        side: "Buy / Sell",
        amount: 0.0,
        balances: [],
        quotes: [],
    }

    const [baseAsset, onChangeBaseAsset] = React.useState(initialState.baseAsset);
    const [quoteAsset, onChangeQuoteAsset] = React.useState(initialState.quoteAsset);
    const [side, onChangeSide] = React.useState(initialState.side);

    const [amount, setAmount] = React.useState(initialState.amount);
    const onChangeAmount = (text: string) => {
        setAmount(Number(text))
    }

    const [balances, setBalances] = React.useState(initialState.balances);
    const [quotes, setQuotes] = React.useState(initialState.quotes);

    useEffect(() => {
        balancesMiddleWare().then(res => {
            typeof res === "string"
                    ? console.log(`Failed to fetch balances with error: ${res}`)
                    : setBalances(res)
        });

        quotesMiddleWare().then(res => {
            typeof res === "string"
                    ? console.log(`Failed to fetch quotes due to ${res}`)
                    : setQuotes(res)
        });
    }, []);

    const textInputs: Array<JSX.Element> = [{state: baseAsset, action: onChangeBaseAsset},
        {state: quoteAsset, action: onChangeQuoteAsset},
        {state: side, action: onChangeSide}].map((s, idx) => {
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


    const submitTrade = (state: TradeState) => {
        const baseBalance = state.balances.find((balance) => balance.asset === state.baseAsset);

        console.log(state);
    };

    const resetInputFields = (initialState: TradeState) => {
        onChangeBaseAsset(initialState.baseAsset);
        onChangeSide(initialState.side);
        setAmount(initialState.amount);
    }

    return (<SafeAreaView>
        {textInputs}
        {numericInput}
        <Button
                title="Trade"
                color="blue"
                onPress={() => {
                    submitTrade({baseAsset, quoteAsset, side, amount, balances, quotes});
                    resetInputFields(initialState);
                }}/>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

export default Trade;