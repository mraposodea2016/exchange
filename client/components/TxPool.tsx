import React, {useEffect, useState} from "react";
import {FlatList, ListRenderItem, Text} from "react-native";
import axios from "axios";

interface TxPool {
    id: number,
    customer_id: string,
    amount: number,
    created_at: string,
    updated_at: string
}

const txPoolMiddleware = async (): Promise<Array<TxPool> | undefined> => {
    try {
        const response = await axios.get("http://10.0.2.2:3002");
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

type TxPoolState = {
    transactions: Array<TxPool> | undefined
}

const TxPool: React.FC = (): JSX.Element => {
    const initialState: TxPoolState = {
        transactions: []
    }
    const [state, setState] = useState(initialState);

    useEffect(() => {
        txPoolMiddleware().then(res => setState({transactions: res}));
    }, []);

    const parseTx: ListRenderItem<TxPool> = ({item}) => <Text>{item.id}, {item.amount}</Text>;
    const errorText: JSX.Element = <Text>Unable to fetch transactions</Text>;

    return (state.transactions ?
            <FlatList data={state.transactions} renderItem={parseTx}/>
            : errorText);
}

export default TxPool;