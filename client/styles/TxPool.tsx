import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    txList: {
        flex: 6,
        marginTop: 10
    },
    txError: {
        flex: 1
    },
    txButton: {
        flex: 1,
        color: "red",
    }
});

export default styles;