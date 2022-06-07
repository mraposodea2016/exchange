import React, {useState} from "react";
import {Button, SafeAreaView, Text, View} from "react-native";

import axios from "axios";

import {connect} from "react-redux";
import {QuotesState, fetchQuotes} from "./QuotesSlice";

import styles from "./QuotesStyles";

import Table from "../../components/Table";

import SubScreenNav from "../../navigation/ScreenNav";
import {NavigationProp} from "@react-navigation/native";
import {AppDispatch} from "../../app/store";
import {bindActionCreators} from "redux";

interface QuotesProps {
    navigation: NavigationProp<any>,
    quotes: Array<QuoteType>,
    fetchQuotes: typeof fetchQuotes
}

export type QuoteType = {
    baseAsset: string,
    quoteAsset: string,
    price: number
}

const Quotes: React.FC<QuotesProps> = (props: QuotesProps) => {
    console.log(props.quotes);

    const errorText: JSX.Element = <Text style={styles.error}>Unable to fetch quotes</Text>;
    const results: JSX.Element = (props.quotes ?
            <Table data={props.quotes} cols={["quoteAsset", "baseAsset", "price"]}/>
            : errorText);

    return (<SafeAreaView style={styles.screen}>
        {results}
        <View style={styles.button}>
            <Button title="Get Quotes" onPress={props.fetchQuotes}/>
        </View>
        <SubScreenNav navigation={props.navigation}/>
    </SafeAreaView>);
}

const mapStateToProps = (state: QuotesState) => {
    const { quotes } = state;
    return quotes;
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return bindActionCreators({
        fetchQuotes
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);