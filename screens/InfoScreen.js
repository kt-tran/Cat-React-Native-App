import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Stack, Heading, Box, Center, NativeBaseProvider, VStack, Button, Container, Image, ScrollView, HStack } from "native-base";
import scaleSize from "../constants/Layout";
import { HandleGetFact } from "../utilities/api";

export default function InfoScreen() {
    const { loading, response, error } = HandleGetFact();
    return (
        <NativeBaseProvider>
            <ScrollView style={styles.container}>
                <Center>
                    <Heading mt={4}>About Us</Heading>
                    <Box m={3}>
                        < Text >Our mission is to simply share information, facts and knowledge about cat breeds for anyone interested in cats. We believe that all pets are more than just animal companions - they're family members too. While dogs have an appeal unique to them,
                            cats are beautiful, loving creatures who we believe deserve a little more love.
                            Throughout history, cats have been humans' companions for a long time, and while they have faded in and out of companionship vs free-range predators, cats can offer
                            unique connections and life lessons.
                            We love cats and we hope that you'll love them too.</ Text >
                    </Box>
                    <Image rounded="lg" source={{
                        uri: "https://images.pexels.com/photos/1440387/pexels-photo-1440387.jpeg"
                    }} alt="a tabby cat's paw rests atop a silver keyboard with black keys" size="xl" />

                    <Box alignItems="center" mt={3}>
                        <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700"
                        }} _web={{
                            shadow: 2,
                            borderWidth: 0
                        }} _light={{
                            backgroundColor: "gray.50"
                        }}>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading textAlign="center" size="md" ml="-1">
                                        Did you know?
                                    </Heading>
                                </Stack>
                                <Text textAlign="center">
                                    {response.fact}
                                </Text>
                            </Stack>
                        </Box>
                    </Box>
                    {/* <Image source={{
                        uri: "https://images.pexels.com/photos/20787/pexels-photo.jpg"
                    }} alt="A black, cream and brown coloured cat with green eyes looking up to the camera from below." size="xl" /> */}
                    < Heading mt={4}>Our Team </ Heading >
                    <Box m={3}>
                        <Text>
                            While our team works hard to update our information, some data may not be the most recent or accurate. Please always research further for any medical inquiries or contact your closest vet
                            to confirm any information before making a big decision.
                            We are always looking for new ideas and feedback to improve our platform, so please don't hesitate to reach out to us with any suggestions or questions.
                        </Text>
                    </Box>
                    <Image rounded="lg" source={{
                        uri: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg"
                    }} alt="a orange haired cat with amber eyes against a blurred predominately white background" size="xl" />
                    <Center p="3">
                        <Text>
                            Have a question? We're happy to answer.
                        </Text>
                    </Center>
                    <Center p="2">
                        <Text>
                            Email us at example@email.com
                        </Text>
                    </Center>
                    <Center p="2" mb={50}>
                        <Text>
                            Phone us at 1800 123 456
                        </Text>
                        <Text>
                            Mon - Fri
                        </Text>
                        <Text>
                            9AM - 5PM
                        </Text>
                    </Center>
                </Center>
            </ScrollView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: '#F0F5EE',
    },
});