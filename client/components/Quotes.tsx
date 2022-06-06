import React, {useState} from "react";
import {Button, SafeAreaView, Text, View} from "react-native";
import axios from "axios";
import styles from "../styles/Quotes";
import Table from "./Table";
import SubScreenNav from "../navigation/ScreenNav";
import {NavigationProp} from "@react-navigation/native";

export type QuoteType = {
    baseAsset: string,
    quoteAsset: string,
    price: number
}

export const quotesMiddleWare = async (): Promise<Array<QuoteType> | string> => {
    try {
        const response = await axios.get("http://10.0.2.2:3004");
        return response.data;
    } catch (e: any) {
        return e.message;
    }
}

type QuotesState = {
    quotes: Array<QuoteType>
}

interface QuotesProps {
    navigation: NavigationProp<any>
}

const Quotes: React.FC<QuotesProps> = (props: QuotesProps) => {
    const initialState: QuotesState = {quotes: []};
    const [state, setState] = useState(initialState);

    const getQuotes = () => {
        quotesMiddleWare().then(res => {
            typeof res === "string"
            ? console.log(`Failed to fetch quotes due to ${res}`)
            : setState({quotes: res})
        });
    }

    const errorText: JSX.Element = <Text style={styles.error}>Unable to fetch quotes</Text>;
    const results: JSX.Element = (state.quotes ?
            <Table data={state.quotes} cols={["quote_asset", "base_asset", "price"]}/>
            : errorText);

    return (<SafeAreaView style={styles.screen}>
        {results}
        <View style={styles.button}>
            <Button title="Get Quotes" onPress={getQuotes}/>
        </View>
        <SubScreenNav navigation={props.navigation}/>
    </SafeAreaView>);
}

export default Quotes;