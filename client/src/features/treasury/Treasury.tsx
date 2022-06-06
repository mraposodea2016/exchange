import React, {useEffect, useState} from "react";
import {Button, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View} from "react-native";
import axios from "axios";
import styles from "../balances/BalancesStyles";
import Section from "../../components/Section";
import SubScreenNav from "../../navigation/ScreenNav";
import {NavigationProp} from "@react-navigation/native";

const treasuryMiddleWare = async (): Promise<string | undefined> => {
    try {
        const response = await axios.get("http://10.0.2.2:3003");
        return response.data.Treasury;
    } catch (e) {
        console.log(e);
    }
}

type TreasuryState = {
    treasury: string | undefined
}

interface TreasuryProps {
    navigation: NavigationProp<any>
}

const Treasury: React.FC<TreasuryProps> = (props: TreasuryProps) => {
    const initialState: TreasuryState = {treasury: ""};
    const [state, setState] = useState(initialState);

    const getTreasuryStatus = () => {
        treasuryMiddleWare().then(res => setState({treasury: res}));
    }

    const isDarkMode = useColorScheme() === 'dark';

    return (
            <SafeAreaView style={styles.screen}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <ScrollView contentInsetAdjustmentBehavior="automatic"
                            style={styles.results}>
                    <Section title="">
                        <Text>{state.treasury}</Text>
                    </Section>
                </ScrollView>
                <View style={styles.queryButton}>
                    <Button title="Get Treasury Status" onPress={getTreasuryStatus}/>
                </View>
                <SubScreenNav navigation={props.navigation}/>
            </SafeAreaView>
    );
}

export default Treasury;