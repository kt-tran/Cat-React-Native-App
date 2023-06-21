import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Pressable } from 'react-native';
import { NativeBaseProvider, Container, Center } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { scaleSize } from "../constants/Layout";

export default function LandingScreen() {
    const navigation = useNavigation();
    return (
        <NativeBaseProvider>
            <ImageBackground source={{ uri: 'https://w.wallhaven.cc/full/eo/wallhaven-eod6w8.jpg' }} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>Purrfect Paws</Text>
                <Center>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            navigation.push("Login");
                        }}
                    >
                        <Text style={styles.buttonText}> Get Started </Text>
                    </Pressable>
                </Center>
            </ImageBackground>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    text: {
        color: 'white',
        fontSize: scaleSize(42),
        lineHeight: scaleSize(84),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 25,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scaleSize(12),
        paddingHorizontal: scaleSize(32),
        borderRadius: scaleSize(4),
        elevation: scaleSize(3),
        backgroundColor: '#354F52',
    },
    buttonText: {
        fontSize: scaleSize(16),
        lineHeight: scaleSize(21),
        fontWeight: 'bold',
        letterSpacing: scaleSize(0.25),
        color: 'white',
    }
});
