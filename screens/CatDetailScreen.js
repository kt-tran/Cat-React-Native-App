import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Stack, Heading, Box, Center, NativeBaseProvider, VStack, Button, Container, Image, ScrollView, HStack } from "native-base";
import { HandleGetBreedsList, GetCatImageList } from "../utilities/api";
import scaleSize from "../constants/Layout";
import { HandleGetFact } from "../utilities/api";
import { CarouselSlider } from "react-native-carousel-image-slider";

function CustomCarousel(props) {
    let imgArr = [];
    props.images.forEach(obj => {
        imgArr.push(obj.url);
    })
    return (
        <View style={{ flex: 1 }}>
            <CarouselSlider images={imgArr} />
        </View>
    );
}

function FunFact(props) {
    return (
        <HStack mx={20} my={3}>
            <Image rounded="lg" mx={2} source={{
                uri: "https://images.pexels.com/photos/1440387/pexels-photo-1440387.jpeg"
            }} alt="a tabby cat's paw rests atop a silver keyboard with black keys" size="xl" />

            <Box alignItems="center">
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
                        <Text>
                            {props.response.fact}
                        </Text>
                    </Stack>
                </Box>
            </Box>
        </HStack>
    );
}

export default function CatDetailScreen() {
    const { factLoading, response, factError } = HandleGetFact();
    const { loading, list, error } = HandleGetBreedsList();
    let cat = list.find((list) => list.id === "chau");

    //carousel state management
    const [imageLoading, setImageLoading] = useState(true);
    const [catImageObj, setCatImageObj] = useState([]);
    const [imageError, setImageError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setCatImageObj(await GetCatImageList("chau"));
                setImageLoading(false);
            } catch (imageError) {
                setImageError(imageError);
                setImageLoading(false);
            }
        })();
    }, ["chau"]);

    if (loading || imageLoading) {
        return (
            <NativeBaseProvider>
                <Center style={{ flex: 1 }}>
                    <Text> Loading... </Text>
                    <Image mx={2} source={{
                        uri: "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                    }} alt="a loading icon is spinning" size="xl" />
                </Center>
            </NativeBaseProvider>
        )
    } else if (error || imageError) {
        return (
            <NativeBaseProvider>
                <Center>
                    <Text> An error has occurred. Please try again later. </Text>
                </Center>
            </NativeBaseProvider>
        )
    } else {
        return (
            <NativeBaseProvider>
                <ScrollView style={styles.container}>
                    <Center mb={3}>
                        <Heading mt={4}>{cat.name}</Heading>
                        {cat.alt_names === undefined || cat.alt_names.trim().length === 0 ? null : <Heading size="sm">Also known as {cat.alt_names}</Heading>}
                        <CustomCarousel images={catImageObj} />
                        <Box m={3}>
                            <Text>Common traits: {cat.temperament}.</Text>
                            < Text >{cat.description}</ Text >
                        </Box>
                        <Box m={3}>
                            <Text>The average {cat.name} weighs {cat.weight.metric} kilograms.</Text>
                            <Text>They typically live for {cat.life_span} years.</Text>
                            <Text>Breed origin: {cat.origin}</Text>
                        </Box>
                        <FunFact response={response} />
                    </Center>
                </ScrollView>
            </NativeBaseProvider >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
});