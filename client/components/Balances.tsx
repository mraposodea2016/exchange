import React, {useState} from "react";
import {Button, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View} from "react-native";
import axios from "axios";
import Section from "./Section";
import {NavigationProp} from "@react-navigation/native";
import styles from "../styles/Balances";
import SubScreenNav from "../navigation/ScreenNav";

const balancesMiddleWare = async (): Promise<string> => {
    try {
        const response = await axios.get("http://10.0.2.2:3000/",
                {
                    headers: {
                        'Access-Control-Allow-Origin': true
                    }
                });
        return response.data.balances;
    } catch (e) {
        console.log(e);
        return "Failed to fetch balances";
    }
}

interface BalancesProps {
    navigation: NavigationProp<any>
}

const Balances: React.FC<BalancesProps> = (props: BalancesProps): JSX.Element => {
    let [state, setState] = useState({balances: "0"});

    const getBalances = () => {
        balancesMiddleWare().then(res => setState({balances: res}));
    }

    const isDarkMode = useColorScheme() === 'dark';

    return (
            <SafeAreaView style={styles.screen}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <ScrollView contentInsetAdjustmentBehavior="automatic"
                            style={styles.results}>
                    <Section title="">
                        <Text>{state.balances}</Text>
                    </Section>
                </ScrollView>
                <View style={styles.queryButton}>
                    <Button title="Update balances" onPress={getBalances}/>
                </View>
                <SubScreenNav navigation={props.navigation}/>
            </SafeAreaView>
    );
}

export default Balances;