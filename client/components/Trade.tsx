import React from "react";
import {Button, SafeAreaView, StyleSheet, TextInput} from "react-native";

interface TradeState {
    assetName: string,
    side: string,
    amount: number
}

interface TradeProps {
    onSubmit: (state: TradeState) => void,
}


const Trade: React.FC<TradeProps> = (props: TradeProps) => {
    const [assetName, onChangeAssetName] = React.useState("Asset Name");
    const [side, onChangeSide] = React.useState("Buy");
    const [amount, setAmount] = React.useState(0.0);
    const onChangeAmount = (text: string) => {
        setAmount(Number(text))
    }

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
                    props.onSubmit({assetName, side, amount})
                    onChangeAssetName("Asset Name")
                    onChangeSide("Buy")
                    setAmount(0.0)
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