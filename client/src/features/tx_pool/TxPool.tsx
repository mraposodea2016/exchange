import React, {useState} from "react";
import {Button, FlatList, ListRenderItem, SafeAreaView, Text, View} from "react-native";

import axios from "axios";

import {NavigationProp} from "@react-navigation/native";

import styles from "./TxPoolStyles";

import Table from "../../components/Table";
import SubScreenNav from "../../navigation/ScreenNav";

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

interface TxPoolProps {
    navigation: NavigationProp<any>
}

const TxPool: React.FC<TxPoolProps> = (props: TxPoolProps): JSX.Element => {
    const initialState: TxPoolState = {
        transactions: []
    }
    const [state, setState] = useState(initialState);

    const getTransactions = () => {
        txPoolMiddleware().then(res => setState({transactions: res}));
    };

    const errorText: JSX.Element = <Text style={styles.txError}>Unable to fetch transactions</Text>;
    const results: JSX.Element = (state.transactions ?
            <Table data={state.transactions} cols={["id", "amount"]}/>
            : errorText);

    return (<SafeAreaView style={styles.screen}>
        {results}
        <View style={styles.txButton}>
            <Button title="Get Transactions" onPress={getTransactions}/>
        </View>
        <SubScreenNav navigation={props.navigation}/>
    </SafeAreaView>);
}

export default TxPool;