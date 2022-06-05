import React, {useEffect} from "react";
import {Button, SafeAreaView, StyleSheet, TextInput} from "react-native";
import {balancesMiddleWare, BalanceType} from "./Balances";

interface TradeState {
    assetName: string,
    side: string,
    amount: number,
    balances: Array<BalanceType>
}

const Trade: React.FC = () => {
    const initialState: TradeState = {
        assetName: "Asset Name (BTC / ETH)",
        side: "Buy / Sell",
        amount: 0.0,
        balances: []
    }

    const [assetName, onChangeAssetName] = React.useState(initialState.assetName);
    const [side, onChangeSide] = React.useState(initialState.side);
    const [amount, setAmount] = React.useState(initialState.amount);
    const [balances, setBalances] = React.useState(initialState.balances);
    const onChangeAmount = (text: string) => {
        setAmount(Number(text))
    }

    useEffect(()=> {
        balancesMiddleWare().then(res => {
            typeof res === "string"
                    ? console.log(`Failed to fetch balances with error: ${res}`)
                    : setBalances(res)
        });
    }, []);

    const submitTrade = (state: TradeState) => {
        console.log(state);
    };

    return (<SafeAreaView>
        <TextInput
                style={styles.input}
                onChangeText={onChangeAssetName}
                value={assetName}
        />
        <TextInput
                style={styles.input}
                onChangeText={onChangeSide}
                value={side}
        />
        <TextInput
                style={styles.input}
                onChangeText={onChangeAmount}
                value={String(amount)}
                placeholder="Trade amount"
                keyboardType="numeric"
        />
        <Button
                title="Trade"
                color="blue"
                onPress={() => {
                    submitTrade({assetName, side, amount, balances});
                    onChangeAssetName(initialState.assetName);
                    onChangeSide(initialState.side);
                    setAmount(initialState.amount);
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