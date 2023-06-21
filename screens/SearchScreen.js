import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity, Touchable, Alert } from "react-native";
import { useListContext } from "../contexts/ListProvider";
import { HandleGetBreedsList } from "../utilities/api";
import { GetCountries } from "../utilities/options";
import { Container, NativeBaseProvider, VStack, Heading, Input, Icon, Box, HStack, Text, AspectRatio, Image, Center, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { scaleSize } from "../constants/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchScreen() {
    const { loading, list, error } = HandleGetBreedsList();
    const [masterList, setMasterList] = useState(list);
    const [favList, setFavList] = useListContext();
    const [refreshFlatlist, setRefreshFlatList] = useState();
    const [search, setSearch] = useState();
    // const [choice, setChoice] = useState();
    // const countries = GetCountries();

    useEffect(() => {
        setRefreshFlatList(list);
    }, [list])

    // let options = [
    //     { value: "name", label: "Breed" },
    //     { value: "origin", label: "Country" }
    // ]

    // let countryList = countries.map((country) => (
    //     { value: country, label: country }
    // ));
    // const CountryOptions = countryList;

    // const CatOptions = list.map((cat) => (
    //     { value: cat.name, label: cat.name }
    // ));


    const searchFilter = (text) => {
        text = text.toLowerCase();
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            let newData = list.filter((cat) => {
                catName = cat.name.toLowerCase();
                catCountry = cat.origin.toLowerCase();
                return (catName.indexOf(text) > -1 || catCountry.indexOf(text) > -1);
            });

            setRefreshFlatList(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setRefreshFlatList(list);
            setSearch(text);
        }
    };


    // const handleChangeCountry = (selectedOption) => {
    //     let res = []
    //     list.forEach(cat => {
    //         if (cat.origin === selectedOption.value) {
    //             res.push(cat);
    //         }
    //     })
    //     setSearchRes(res);
    // }

    // const handleChangeCat = (selectedOption) => {
    //     let res = []
    //     list.forEach(cat => {
    //         if (cat.name === selectedOption.value) {
    //             res.push(cat);
    //         }
    //     })
    //     setSearchRes(res);
    // }

    // const handleChangeCategory = (selectedOption) => {
    //     setChoice(selectedOption.value);
    // }

    // layoutCounter = 0;
    const navigation = useNavigation();

    const dupeAlert = () => {
        Alert.alert('Uh oh!', "It looks like you've already favourited that cat, please select another.", [
          { text: 'OK', onPress: () => { console.log("OK pressed") } },
        ]);
      }

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Heading style={styles.heading}> Search </Heading>
                <Text style={styles.header}> Find a cat breed by typing a breed name</Text>
                <Center mb={1}>
                    <Input placeholder="'British Longhair'" variant="filled" width="90%" onChangeText={(input) => { searchFilter(input) }} borderRadius="10" py="4" px="2" bgColor="white" color="black"
                        InputLeftElement={<Icon ml="2" size="4" color="black" as={<Ionicons name="ios-search" />} />} />
                </Center>
                <FlatList
                    data={refreshFlatlist}
                    extraData={refreshFlatlist}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => { navigation.navigate("CatDetail", {id: item.id}) }}>
                                <Box bg="white" shadow={2} rounded="lg" m={2} style={styles.card}>
                                    <HStack>
                                        <Image resizeMode="cover" rounded="md"
                                            source={{
                                                uri: `https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg`
                                            }}
                                            alt={`a ${item.name} cat`} size="xl" />
                                        <VStack mx={2} style={styles.cardContent} >
                                            <Heading size="md">{item.name}</Heading>
                                            <Heading size="sm">{item.origin}</Heading>
                                            <Button onPress={() => {
                                                catDetails = { id: item.id, name: item.name, imageURL: item.reference_image_id, origin: item.origin }
                                                let dupe = false

                                                const found = favList.find((catObj) => {
                                                    if (catObj.name === catDetails.name) {
                                                        dupeAlert();
                                                        dupe = true;
                                                        return
                                                    }
                                                })

                                                if (!dupe) {
                                                    AsyncStorage.setItem("catList", JSON.stringify([...favList, catDetails]));
                                                    setFavList(favList => [...favList, catDetails])
                                                } 
                                            }} style={styles.button}>
                                                <Ionicons
                                                    name={"heart-outline"}
                                                    size={40}
                                                    style={{ marginBottom: -3 }}
                                                    color={"red"}
                                                />
                                            </Button>
                                        </VStack>
                                    </HStack>
                                </Box>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </NativeBaseProvider >
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
        margin: scaleSize(3),
        backgroundColor: '#F0F5EE',
    },
    header: {
        textAlign: "center",
        marginVertical: scaleSize(2),
    },
    button: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    heading: {
        textAlign: "center",
        marginTop: scaleSize(50),
    },
    card: {
        maxWidth: scaleSize(350),
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});