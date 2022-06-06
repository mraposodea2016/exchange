import React from "react";
import {Colors} from "react-native/Libraries/NewAppScreen";

export const ThemeContext = React.createContext({
    isDarkMode: true,
    backgroundStyle: Colors.light
});