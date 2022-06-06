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
    error: {
        flex: 1
    },
    queryButton: {
        flex: 1,
        color: "red"
    },
});

export default styles;