import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useListContext } from "../contexts/ListProvider";
import { HandleGetBreedsList } from "../utilities/api";
import { GetCountries } from "../utilities/options";
import { Container, NativeBaseProvider, VStack, Heading, Input, Icon, Box, HStack, Text, AspectRatio, Image, Center, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function SearchScreen() {
    const { loading, list, error } = HandleGetBreedsList();
    const [favList, setFavList] = useListContext();
    const [choice, setChoice] = useState();
    const countries = GetCountries();

    let options = [
        { value: "name", label: "Breed" },
        { value: "origin", label: "Country" }
    ]

    let countryList = countries.map((country) => (
        { value: country, label: country }
    ));
    const CountryOptions = countryList;

    const CatOptions = list.map((cat) => (
        { value: cat.name, label: cat.name }
    ));


    const [searchRes, setSearchRes] = useState([]);

    useEffect(() => {
        setSearchRes(list);
    }, [list])


    const handleChangeCountry = (selectedOption) => {
        let res = []
        list.forEach(cat => {
            if (cat.origin === selectedOption.value) {
                res.push(cat);
            }
        })
        setSearchRes(res);
    }

    const handleChangeCat = (selectedOption) => {
        let res = []
        list.forEach(cat => {
            if (cat.name === selectedOption.value) {
                res.push(cat);
            }
        })
        setSearchRes(res);
    }

    const handleChangeCategory = (selectedOption) => {
        setChoice(selectedOption.value);
    }

    layoutCounter = 0;

    return (
        <NativeBaseProvider>
            <ScrollView style={styles.container}>
                <Text style={styles.header}> Find a cat breed by typing a breed name</Text>
                <Input placeholder="Search" variant="filled" width="100%" borderRadius="10" py="1" px="2" InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
                <Box m={2}>
                    {list.map((cat) => (
                        <Box bg="white" shadow={2} rounded="lg" m={3}>
                            <HStack>
                                <Image resizeMode="cover" rounded="lg"
                                    source={{
                                        uri: `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
                                    }}
                                    alt={`a ${cat.name} cat`} size="xl" />
                                <Center>
                                    <VStack mx={2}>
                                        <Heading size="md">{cat.name}</Heading>
                                        <Heading size="sm">{cat.origin}</Heading>
                                    </VStack>
                                </Center>
                                <Button onPress={() => {
                                    catDetails = { id: cat.id, name: cat.name, imageURL: cat.reference_image_id, origin: cat.origin }
                                    setFavList(favList => [...favList, catDetails])
                                }} style={styles.button}>
                                    <Ionicons
                                        name={"heart-outline"}
                                        size={40}
                                        style={{ marginBottom: -3 }}
                                        color={"red"}
                                    />
                                </Button>
                            </HStack>
                        </Box>
                    )
                    )}
                </Box>
            </ScrollView>
        </NativeBaseProvider>
    );
}


//TODO:
//  Logger functionality (detect when you add it to the list)
// function Event(props) {
//     const [, , addEvent] = useLoggerContext();

//     return <Text onPress={() => addEvent(props.event)} style={styles.event}>
//         {props.event}
//     </Text>
// }

// function EventList(props) {
//     return (
//         <View>
//             {props.events.map(x => (
//                 <Event event={x.event} key={x.event} />
//             ))}
//         </View>
//     );
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: '#F0F5EE',
    },
    event: {
        backgroundColor: "green",
        textAlign: "center",
        padding: 5,
        borderRadius: 10,
        margin: 2,
    },
    header: {
        textAlign: "center",
        marginVertical: 4,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});