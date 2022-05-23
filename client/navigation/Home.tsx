import React from "react";
import {Button, Text, View} from "react-native";
import {NavigationProp} from "@react-navigation/native";
import styles from "../components/styles";

interface HomeScreenProps {
    navigation: NavigationProp<any, any>
}

const HomeScreen: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
    const screens: Array<string> = ["Balances", "TxPool", "Hub", "Treasury", "Quotes"];
    return (
            <View style={styles.homeScreen}>
                {screens.map((screen, idx) => {
                    return (
                            <View style={styles.homeScreenButton}>
                                <Button
                                        title={screen}
                                        key={idx}
                                        onPress={() =>
                                                props.navigation.navigate(screen)
                                        }
                                />
                            </View>
                    );
                })}
            </View>
    )
}

export default HomeScreen;