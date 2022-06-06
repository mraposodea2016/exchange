import React from "react";
import {Button, Text, View} from "react-native";
import {NavigationProp} from "@react-navigation/native";
import styles from "./HomeStyles";

interface NavButtonProps {
    idx: number,
    screen: string,
    navigation: NavigationProp<any, any>,
    color: string
}

const NavButton: React.FC<NavButtonProps> = (props: NavButtonProps) => {
    return (
            <View style={styles.homeScreenButton} key={props.idx}>
                <Button
                        title={props.screen}
                        onPress={() =>
                                props.navigation.navigate(props.screen)
                        }
                        color={props.color}
                />
            </View>
    );
}

interface HomeScreenProps {
    navigation: NavigationProp<any, any>
}

const HomeScreen: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
    const devScreens: Array<string> = ["Balances", "TxPool", "Hub", "Treasury", "Quotes"];
    const clientScreens: Array<string> = ["Trade", "Portfolio"];

    return (
            <View style={styles.homeScreen}>
                {clientScreens.map((screen, idx) => {
                    return <NavButton key={idx}
                                      screen={screen} idx={idx} navigation={props.navigation}
                                      color={"gray"}/>;
                })}
                {devScreens.map((screen, idx) => {
                    return <NavButton key={idx}
                                      screen={screen} idx={idx} navigation={props.navigation}
                                      color={"darkgray"}/>;
                })}
            </View>
    );
}

export default HomeScreen;