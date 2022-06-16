import React from "react";
import {FlatList, SafeAreaView, Text, TouchableHighlight, View} from "react-native";
import styles from "./AssetSelectionStyles";
import {NavigationProp} from "@react-navigation/native";
import {setBaseAsset, setQuoteAsset} from "../features/trade/TradeSlice";
import {AppDispatch} from "../app/store";
import {connect} from "react-redux";
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

interface PairType {
    title: string,
    id: string
}

const PairSelection: React.FC<PairSelectionProps> = (props: PairSelectionProps): JSX.Element => {
    const pairs: Array<PairType> = [
        {
            title: 'BTC/ETH',
            id: '1'
        },
        {
            title: 'ETH/BTC',
            id: '2'
        }
    ];

    const setPair = (pair: string) => {
        const [quoteAsset, baseAsset] = pair.split('/');
        props.setQuoteAsset(quoteAsset);
        props.setBaseAsset(baseAsset);
    }

    const renderItem = ({item, index, separators}: any) => {
        return (
                <TouchableHighlight
                        key={item.id}
                        onPress={() => {
                            setPair(item.title);
                            props.navigation.goBack();
                        }}
                >
                    <Item title={item.title}/>
                </TouchableHighlight>
        );
    }

    return (<SafeAreaView style={styles.container}>
        <FlatList
                data={pairs}
                renderItem={renderItem}
                keyExtractor={(item: PairType) => item.id}
        />
    </SafeAreaView>);
}

interface PairSelectionProps {
    selectionType: string,
    setBaseAsset: typeof setBaseAsset,
    setQuoteAsset: typeof setQuoteAsset,
    navigation: NavigationProp<any>
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return bindActionCreators({
        setBaseAsset,
        setQuoteAsset
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(PairSelection);