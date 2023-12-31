import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";

import FavListScreen from "../screens/FavouriteListScreen";
import SearchScreen from "../screens/SearchScreen";
import LoginScreen from "../screens/LoginScreen";
import InfoScreen from "../screens/InfoScreen";
import TabBarIcon from "../components/TabBarIcon";
import CatDetailScreen from "../screens/CatDetailScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
    tintColor = "blue"
    return (
        <BottomTab.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            backBehavior="history"
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarInactiveBackgroundColor: '#354F52',
                tabBarActiveBackgroundColor: '#2F3E46',
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: 'white',
                headerShown: false,
            }}>
            <BottomTab.Screen
                name="Home"
                component={FavListScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name="heart" />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name="search-outline" />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Info"
                component={InfoScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name="information-circle" />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}
