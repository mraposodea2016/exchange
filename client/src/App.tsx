import React from 'react';

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {store} from "./app/store";

import HomeScreen from "./features/Home";
import Balances from "./features/balances/Balances";
import Hub from "./features/hub/Hub";
import TxPool from "./features/tx_pool/TxPool";
import Quotes from "./features/quotes/Quotes";
import Treasury from "./features/treasury/Treasury";
import Trade from "./features/trade/Trade";
import Portfolio from "./features/portfolio/Portfolio";
import {Provider} from "react-redux";

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
    return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={HomeScreen} options={{title: "Overview"}}/>
                        <Stack.Screen name="Trade" component={Trade}/>
                        <Stack.Screen name="Portfolio" component={Portfolio}/>

                        {/*Dev Screens*/}
                        <Stack.Screen name="Balances" component={Balances}/>
                        <Stack.Screen name="TxPool" component={TxPool}/>
                        <Stack.Screen name="Hub" component={Hub}/>
                        <Stack.Screen name="Treasury" component={Treasury}/>
                        <Stack.Screen name="Quotes" component={Quotes}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
    );
};

export default App;
