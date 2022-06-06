import React, {useEffect} from "react";
import {Button, SafeAreaView, StyleSheet, TextInput} from "react-native";
import {balancesThunk, BalanceType} from "../balances/Balances";
import {QuoteType, quotesThunk} from "../quotes/Quotes";
import axios from "axios";

const HOST: string = "http://10.0.2.2";
const TX_POOL_PORT: string = "3002";
const CURRENCY_SCALE: number = 10**8;

interface TradeState {
    customerId: string,
    baseAsset: string,
    quoteAsset: string,
    side: string,
    amount: number,
    balances: Array<BalanceType>,
    quotes: Array<QuoteType>,
    price: number,
}

const Trade: React.FC = () => {
    const initialState: TradeState = {
        customerId: "ID",
        baseAsset: "Base Asset (BTC / ETH)",
        quoteAsset: "Quote Asset (BTC / ETH)",
        side: "Buy / Sell",
        amount: 0.0,
        balances: [],
        quotes: [],
        price: 0.0,
    }

    const [customerId, setCustomerId] = React.useState(initialState.customerId);
    const [baseAsset, onChangeBaseAsset] = React.useState(initialState.baseAsset);
    const [quoteAsset, onChangeQuoteAsset] = React.useState(initialState.quoteAsset);
    const [side, onChangeSide] = React.useState(initialState.side);

    const [amount, setAmount] = React.useState(initialState.amount);
    const onChangeAmount = (text: string) => {
        setAmount(Number(text))
    }

    const [balances, setBalances] = React.useState(initialState.balances);
    const [quotes, setQuotes] = React.useState(initialState.quotes);
    const [price, setPrice] = React.useState(initialState.price);

    useEffect(() => {
        balancesThunk().then(res => {
            typeof res === "string"
                    ? console.log(`Failed to fetch balances with error: ${res}`)
                    : setBalances(res)
        });

        quotesThunk().then(res => {
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

    const getTradeBalances = (state: TradeState): BalanceType | undefined => {
        return state.balances.find((balance) => {
            return balance.asset === state.quoteAsset
        });
    }

    const getTradeQuote = (state: TradeState): QuoteType | undefined => {
        return state.quotes.find((quote) =>
                quote.baseAsset === state.baseAsset
                && quote.quoteAsset === state.quoteAsset
        );
    }

    const fundsAvailable = (state: TradeState): boolean => {
        const tradeBalances: BalanceType | undefined = getTradeBalances(state);
        console.log(tradeBalances);
        if (!tradeBalances) {
            return false;
        }
        const balance: number = tradeBalances.amount;

        const pairQuote: QuoteType | undefined = getTradeQuote(state);
        console.log(pairQuote);
        if (!pairQuote) {
            return false;
        }
        setPrice(pairQuote.price);
        const tradeCostInBaseAsset: number = state.price * state.amount;

        return balance >= tradeCostInBaseAsset;
    }

    const postTransactionToPool = async (state: TradeState): Promise<any> => {
        try {
            const response = await axios.post(`${HOST}:${TX_POOL_PORT}/transactions`, {
                        transaction: {
                            customer_id: state.customerId,
                            base_asset: state.baseAsset,
                            quote_asset: state.quoteAsset,
                            price: state.price,
                            side: state.side,
                            amount: state.amount
                        }
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
            );
            return response.data;
        } catch (e: any) {
            return e.message;
        }
    }

    const submitTrade = (state: TradeState):void => {
        console.log(state);
        if (!fundsAvailable(state)) {
            return;
        }
        postTransactionToPool(state).then(res => {
            console.log(res);
        });
    };

    const resetInputFields = (initialState: TradeState):void => {
        onChangeBaseAsset(initialState.baseAsset);
        onChangeQuoteAsset(initialState.quoteAsset);
        onChangeSide(initialState.side);
        setAmount(initialState.amount);
    }

    const submitButton: JSX.Element = (<Button
            title="Trade"
            color="blue"
            onPress={() => {
                submitTrade({customerId, baseAsset, quoteAsset, side, amount, balances, quotes, price});
                resetInputFields(initialState);
            }}/>);

    return (<SafeAreaView>
        {textInputs}
        {numericInput}
        {submitButton}
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