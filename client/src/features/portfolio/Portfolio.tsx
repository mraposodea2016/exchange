import React, {useEffect} from "react";
import {AppState, FlatList, SafeAreaView, Text, View} from "react-native";
import {connect, useSelector} from "react-redux";
import {selectBalances} from "../balances/BalancesSlice";
import {BalanceType} from "../balances/Balances";
import styles from "./styles";
import {AppDispatch, RootState} from "../../app/store";
import {bindActionCreators} from "redux";
import {fetchBalances} from "../balances/BalancesSlice";

const Item: React.FC<BalanceType> = (props: BalanceType): JSX.Element => {
    return (
            <View style={styles.item}>
                <Text style={{...styles.title, textAlign: "left"}}>{props.asset}</Text>
                <Text style={{...styles.title, textAlign: "right"}}>{props.amount / 10**8}</Text>
            </View>
    );
}

const Portfolio: React.FC<PortfolioProps> = (props: PortfolioProps):JSX.Element => {
    useEffect(() => {
        props.fetchBalances();
    }, []);

    const renderItem = ({item, index, separators}: any) => {
        return (
                <Item asset={item.asset} amount={item.amount}/>
        );
    }

    return (<SafeAreaView style={styles.container}>
        <FlatList
                data={props.balances}
                renderItem={renderItem}
                keyExtractor={(item: BalanceType) => item.asset}
        />
    </SafeAreaView>);
}

interface PortfolioProps {
    balances: Array<BalanceType>,
    fetchBalances: typeof fetchBalances
}

const mapStateToProps = (state: RootState) => {
    return {
        'balances': state.balances.balances
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return bindActionCreators({
        fetchBalances
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);