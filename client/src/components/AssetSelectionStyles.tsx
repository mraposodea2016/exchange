import {StatusBar, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    'container': {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    'item': {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    'title': {
        color: 'black',
        fontSize: 32,
    }
});

export default styles;