import React, { useEffect, createContext, useContext } from "react";
import { Text, Button, View, ScrollView, StyleSheet } from "react-native";
import { useListContext } from "../contexts/ListProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";


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
    return (
        <View style={styles.container}>
            <Text>Favourites List</Text>
            <GenerateList />
        </View>
    );
}

function GenerateList() {
    const [list, setList] = useListContext();
    return (
        <ScrollView style={styles.container}>
            {list.map((x) => (
                <Cat {...x} key={x.name} />
            ))}
        </ScrollView>
    );
}

function Cat(props) {
    return (
        <View>
            <Box bg="white" shadow={2} rounded="lg" m={3}>
                <HStack>
                    <Image resizeMode="cover" rounded="lg"
                        source={{
                            uri: `https://cdn2.thecatapi.com/images/${props.cat.reference_image_id}.jpg`
                        }}
                        alt={`a ${props.cat.name} cat`} size="xl" />
                    <Center>
                        <VStack mx={2}>
                            <Heading size="md">{props.cat.name}</Heading>
                        </VStack>
                    </Center>
                    {/* TODO: REMOVE CAT FROM LIST BUTTON */}
                </HStack>
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
});