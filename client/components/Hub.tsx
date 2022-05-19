import React, {useEffect, useState} from "react";
import {Text} from "react-native";
import axios from "axios";

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

const Hub: React.FC = () => {
    const initialState: HubState = {hub: ""};
    const [state, setState] = useState(initialState);

    useEffect(()=>{
        hubMiddleWare().then(res => setState({hub: res}));
    }, []);

    return (
        <Text>{state.hub}</Text>
    );
}

export default Hub;