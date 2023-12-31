import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { createStackNavigator } from '@react-navigation/stack';
import { ListProvider } from "./contexts/ListProvider";
import StackNav from './navigation/StackNavigator';

export default function App() {

  return (
    <ListProvider>
      <StackNav />
    </ListProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
