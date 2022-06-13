import React from "react";
import {View, Text, SafeAreaView, ScrollView, FlatList, ListRenderItem, TouchableHighlight} from "react-native";
import styles from "./AssetSelectionStyles";
import {NavigationProp} from "@react-navigation/native";
import {setBaseAsset, setQuoteAsset} from "../features/trade/TradeSlice";
import App from "../App";
import {AppDispatch} from "../app/store";
import {connect, createDispatchHook} from "react-redux";
import {bindActionCreators} from "redux";


interface ItemProps {
    title: string,
}

const Item: React.FC<ItemProps> = (props: ItemProps): JSX.Element => {
    return (
            <View style={styles.item}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
    );
}

interface AssetType {
    title: string,
    id: string
}

const AssetSelection: React.FC<AssetSelectionProps> = (props: AssetSelectionProps): JSX.Element => {
    const assets: Array<AssetType> = [
        {
            title: 'BTC',
            id: '1'
        },
        {
            title: 'ETH',
            id: '2'
        }
    ];

    const setAsset = props.selectionType === 'quoteAsset' ? setQuoteAsset : setBaseAsset;

    const renderItem = ({item, index, separators}: any) => {
        return (
                <TouchableHighlight
                        key={item.id}
                        onPress={() => {
                            setAsset(item.title);
                            props.navigation.goBack();
                        }}
                >
                    <Item title={item.title}/>
                </TouchableHighlight>
        );
    }

    return (<SafeAreaView style={styles.container}>
        <FlatList
                data={assets}
                renderItem={renderItem}
                keyExtractor={(item: AssetType) => item.id}
        />
    </SafeAreaView>);
}

interface AssetSelectionProps {
    selectionType: string,
    setBaseAsset: typeof setBaseAsset,
    setQuoteAsse: typeof setQuoteAsset,
    navigation: NavigationProp<any>
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return bindActionCreators({
        setBaseAsset,
        setQuoteAsset
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(AssetSelection);