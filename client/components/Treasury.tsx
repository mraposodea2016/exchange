import React, {useEffect, useState} from "react";
import {Text} from "react-native";
import axios from "axios";

const treasuryMiddleWare = async (): Promise<string | undefined> => {
    try {
        const response = await axios.get("http://10.0.2.2:3003");
        return response.data.Treasury;
    } catch (e) {
        console.log(e);
    }
}

type TreasuryState = {
    Treasury: string | undefined
}

const Treasury: React.FC = () => {
    const initialState: TreasuryState = {Treasury: ""};
    const [state, setState] = useState(initialState);

    useEffect(()=>{
        treasuryMiddleWare().then(res => setState({Treasury: res}));
    }, []);

    return (
        <Text>{state.Treasury}</Text>
    );
}

export default Treasury;