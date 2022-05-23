import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, useColorScheme, View,} from 'react-native';

import Section from "./Section";

import {Colors} from 'react-native/Libraries/NewAppScreen';

import TxPool from "./TxPool";
import Hub from "./Hub";
import Balances from "./Balances";
import Treasury from "./Treasury";
import Quotes from "./Quotes";

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

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
                            <Balances/>
                        </Section>
                        <Section title="Transaction Pool">
                            <TxPool/>
                        </Section>
                        <Section title="Hub">
                            <Hub/>
                        </Section>
                        <Section title="Treasury">
                            <Treasury/>
                        </Section>
                        <Section title="Assets">
                            <Quotes/>
                        </Section>
                    </View>
                </ScrollView>
            </SafeAreaView>
    );
};


export default App;
