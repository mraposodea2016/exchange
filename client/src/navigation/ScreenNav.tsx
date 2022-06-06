import styles from "./NavStyles";
import {Button, View} from "react-native";
import React from "react";
import {NavigationProp} from "@react-navigation/native";

interface NavProps {
    navigation: NavigationProp<any>
}

const SubScreenNav: React.FC<NavProps> = (props: NavProps) => {
    return (<View style={styles.subScreenNav}>
        <View style={styles.subScreenNavButton}>
            <Button title="Home" onPress={() => props.navigation.navigate('Home')}/>
        </View>
        <View style={styles.subScreenNavButton}>
            <Button title="Back" onPress={() => props.navigation.goBack()}/>
        </View>
    </View>);
}

export default SubScreenNav;