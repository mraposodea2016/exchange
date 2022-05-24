import React, {useEffect, useState} from "react";
import {Button, FlatList, ListRenderItem, SafeAreaView, Text, View} from "react-native";
import axios from "axios";
import styles from "../styles/Quotes";
import Table from "./Table";
import SubScreenNav from "../navigation/ScreenNav";
import {NavigationProp} from "@react-navigation/native";

interface Quote {
    asset_id: string
    price: number
}

const quotesMiddleWare = async (): Promise<Array<Quote> | undefined> => {
    try {
        const response = await axios.get("http://10.0.2.2:3004");
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

type QuotesState = {
    quotes: Array<Quote> | undefined
}

interface QuotesProps {
    navigation: NavigationProp<any>
}

const Quotes: React.FC<QuotesProps> = (props: QuotesProps) => {
    const initialState: QuotesState = {quotes: []};
    const [state, setState] = useState(initialState);

    const getQuotes = () => {
        quotesMiddleWare().then(res => setState({quotes: res}));
    }

    const errorText: JSX.Element = <Text style={styles.error}>Unable to fetch quotes</Text>;
    const results: JSX.Element = (state.quotes ?
            <Table data={state.quotes} cols={["asset_id", "price"]}/>
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