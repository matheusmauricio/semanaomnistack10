import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from './pages/Main';
import Profile from './pages/Profile';

export default function Routes() {
    const { Navigator, Screen } = createStackNavigator();

    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    cardStyle: { backgroundColor: "#f2f3f5" },
                    headerStyle: { backgroundColor: "#7d40e7" },
                    headerTintColor: "#fff",
                    headerBackTitleVisible: false,
                }}
            >
                <Screen
                    name="Main"
                    component={Main}
                    options={{
                        title: "DevRadar"
                        //   header: () => <Header showCancel={false} title="Main" />,
                    }}
                />
                <Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        title: "Perfil no Github"
                        //   header: () => <Header title="Selecione no mapa" />,
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}