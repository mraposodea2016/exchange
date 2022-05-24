import React, {useState} from "react";
import {Button, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View} from "react-native";
import axios from "axios";
import styles from "../styles/Balances";
import Section from "./Section";
import SubScreenNav from "../navigation/ScreenNav";
import {NavigationProp} from "@react-navigation/native";

const hubMiddleWare = async (): Promise<string | undefined> => {
    try {
        const response = await axios.get("http://10.0.2.2:3001");
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

type HubState = {
    hub: string | undefined
}

interface HubProps {
    navigation: NavigationProp<any>
}

const Hub: React.FC<HubProps> = (props: HubProps) => {
    const initialState: HubState = {hub: ""};
    const [state, setState] = useState(initialState);

    const getHubResponse = () => {
        hubMiddleWare().then(res => setState({hub: res}));
    }

    const isDarkMode = useColorScheme() === 'dark';

    return (
            <SafeAreaView style={styles.screen}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <ScrollView contentInsetAdjustmentBehavior="automatic"
                            style={styles.results}>
                    <Section title="">
                        <Text>{state.hub}</Text>
                    </Section>
                </ScrollView>
                <View style={styles.queryButton}>
                    <Button title="Get Hub Response" onPress={getHubResponse}/>
                </View>
                <SubScreenNav navigation={props.navigation}/>
            </SafeAreaView>
    );
}

export default Hub;