import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Pressable } from 'react-native';
import { NativeBaseProvider, Container, Center } from "native-base";
import { useNavigation } from "@react-navigation/native";

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
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 25,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#354F52',
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
});
