import React from 'react';

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import HomeScreen from "../navigation/Home";
import Balances from "./Balances";
import Hub from "./Hub";
import TxPool from "./TxPool";
import Quotes from "./Quotes";
import Treasury from "./Treasury";
import Trade from "./Trade";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} options={{title: "Overview"}}/>
                    <Stack.Screen name="Trade" component={Trade} />

                    {/*Dev Screens*/}
                    <Stack.Screen name="Balances" component={Balances}/>
                    <Stack.Screen name="TxPool" component={TxPool}/>
                    <Stack.Screen name="Hub" component={Hub}/>
                    <Stack.Screen name="Treasury" component={Treasury}/>
                    <Stack.Screen name="Quotes" component={Quotes}/>
                </Stack.Navigator>
            </NavigationContainer>
    );
};

export default App;
