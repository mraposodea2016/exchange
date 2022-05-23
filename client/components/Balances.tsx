import React, {useEffect, useState} from "react";
import {Button, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View} from "react-native";
import axios from "axios";
import Section from "./Section";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {NavigationProp} from "@react-navigation/native";

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

    useEffect(() => {
        balancesMiddleWare().then(res => setState({balances: res}));
    }, []);

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = isDarkMode ? Colors.darker : Colors.lighter;

    return (
            <SafeAreaView style={backgroundStyle}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={backgroundStyle}>
                    <View
                            style={{
                                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                            }}>
                        <Section title="Balances">
                            <Text>{state.balances}</Text>
                        </Section>
                        <Button title="Home" onPress={() => props.navigation.navigate('Home')}/>
                        <Button title="Back" onPress={() => props.navigation.goBack()}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
    );
}

export default Balances;