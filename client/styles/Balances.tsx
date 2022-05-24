import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    results: {
        flex: 6
    },
    queryButton: {
        flex: 1,
        color: "red"
    },
    subScreenNav: {
        flex: 1,
        width: "70%",
    },
    subScreenNavButton: {
        margin: 10
    }
});

export default styles;