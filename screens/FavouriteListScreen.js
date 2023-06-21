import React, { useEffect, createContext, useContext, useState } from "react";
import { Text, ScrollView, StyleSheet, FlatList } from "react-native";
import { Container, NativeBaseProvider, Box, HStack, Image, Center, VStack, Heading, Button, View } from "native-base";
import { useListContext } from "../contexts/ListProvider";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scaleSize } from "../constants/Layout";


// export default function FavListScreen() {
//     const [test, setTest] = React.useState();


//     const getData = async () => {
//         try {
//             const value = await AsyncStorage.getItem('my-key');
//             console.log(value);
//             if (value !== null) {
//                 setTest(value)
//             }
//         } catch (e) {
//             // error reading value
//         }
//     };

//     useEffect(() => {
//         getData();
//     }, [])


//     return ();
// }

export default function FavListScreen() {
    const [list, setList] = useListContext();
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const removeItem = (id) => {
        let index = list.findIndex((catInList) => catInList.id === id);
        console.log(index);
        newList = list
        newList.splice(index, 1)
        setList(newList);
        AsyncStorage.setItem("catList", JSON.stringify(newList));
        setRefreshFlatList(!refreshFlatlist)
    }
    console.log(list);

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Heading style={styles.heading}>Favourites List</Heading>
                <FlatList
                    data={list}
                    extraData={refreshFlatlist}
                    renderItem={({ item }) => {
                        return (
                            <Box bg="white" shadow={2} rounded="lg" m={3}>
                                <HStack>
                                    <Image resizeMode="cover" rounded="lg"
                                        source={{
                                            uri: `https://cdn2.thecatapi.com/images/${item.imageURL}.jpg`
                                        }}
                                        alt={`a ${item.name} cat`} size="xl" />
                                    <Center>
                                        <VStack mx={2}>
                                            <Heading size="md">{item.name}</Heading>
                                            <Heading size="sm">{item.origin}</Heading>
                                        </VStack>
                                    </Center>
                                    <Button onPress={() => {
                                        removeItem(item.id)
                                    }} style={styles.button}>
                                        <Ionicons
                                            name={"trash-outline"}
                                            size={40}
                                            style={{ marginBottom: -3 }}
                                            color={"black"}
                                        />
                                    </Button>
                                </HStack>
                            </Box>
                        );
                    }}
                />
            </View>
        </NativeBaseProvider >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F5EE',
        flex: 1,
        width: '100%',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    heading: {
        textAlign: "center",
        marginTop: scaleSize(60),
    }
});