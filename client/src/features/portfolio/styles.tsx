import {StatusBar, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    'container': {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    'item': {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    'title': {
        color: 'grey',
        fontSize: 20,
        width: "50%",
    }
});

export default styles;