import React, {useState} from "react";
import {Button, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View} from "react-native";
import axios from "axios";
import Table from "../../components/Table";
import {NavigationProp} from "@react-navigation/native";
import styles from "./BalancesStyles";
import SubScreenNav from "../../navigation/ScreenNav";

interface BalancesProps {
    navigation: NavigationProp<any>
}

export type BalanceType = {
    asset: string
    amount: number
}

export interface BalanceState {
    balances: Array<BalanceType>
}

export const balancesThunk = async (): Promise<Array<BalanceType> | string> => {
    try {
        const response = await axios.get("http://10.0.2.2:3000/",
                {
                    headers: {
                        'Access-Control-Allow-Origin': true
                    }
                });
        return response.data;
    } catch (e: any) {
        return e.message;
    }
}

const Balances: React.FC<BalancesProps> = (props: BalancesProps): JSX.Element => {
    const initialState: BalanceState = {balances: []};
    let [state, setState] = useState(initialState);

    const getBalances = () => {
        balancesThunk().then(res => {
            typeof res === "string"
            ? console.log(`Failed to fetch balances with error: ${res}`)
            : setState({balances: res})
        })
    }

    const isDarkMode = useColorScheme() === 'dark';

    const errorText: JSX.Element = <Text style={styles.error}>Unable to retrieve balances</Text>;
    const balances: JSX.Element = (state.balances ?
        <Table data={state.balances} cols={["asset", "amount"]}/>
        : errorText);

    return (
            <SafeAreaView style={styles.screen}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <ScrollView contentInsetAdjustmentBehavior="automatic"
                            style={styles.results}>
                    {balances}
                </ScrollView>
                <View style={styles.queryButton}>
                    <Button title="Update balances" onPress={getBalances}/>
                </View>
                <SubScreenNav navigation={props.navigation}/>
            </SafeAreaView>
    );
}

export default Balances;