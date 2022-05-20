import React, {useEffect, useState} from "react";
import {Text} from "react-native";
import axios from "axios";

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

const Balances: React.FC = (): JSX.Element => {
    let [state, setState] = useState({balances: "0"});

    useEffect(() => {
        balancesMiddleWare().then(res => setState({balances: res}));
    }, []);

    return (<Text>{state.balances}</Text>);
}

export default Balances;