import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import NavigationPro from "./src/components/navigation/app.navigation.js";
import {SafeAreaView} from "react-native";
import {AuthProvider} from "./src/context/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <NavigationPro />
            </NavigationContainer>
        </AuthProvider>
    );
}
