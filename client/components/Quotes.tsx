import React, {useEffect, useState} from "react";
import {FlatList, ListRenderItem, Text} from "react-native";
import axios from "axios";

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

const Quotes: React.FC = () => {
    const initialState: QuotesState = {quotes: []};
    const [state, setState] = useState(initialState);

    useEffect(()=>{
        quotesMiddleWare().then(res => setState({quotes: res}));
    }, []);

    const parseTx: ListRenderItem<Quote> = ({item}) => <Text>{item.asset_id}, {item.price}</Text>;
    const errorText: JSX.Element = <Text>Unable to fetch quotes</Text>;

    return state.quotes ?
            <FlatList data={state.quotes} renderItem={parseTx}/>
            : errorText;
}

export default Quotes;