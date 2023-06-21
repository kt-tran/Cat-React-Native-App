import React, { useState, useEffect, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ListContext = createContext({});
export const useListContext = () => useContext(ListContext);


export const ListProvider = ({ children }) => {
    const [list, setList] = useState([]);

    let _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem("catList");
            console.log("Retrieved list");
            if (value !== null) {
                // We have data!!
                console.log(JSON.parse(value))
                setList(JSON.parse(value));
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    useEffect(() => {
        _retrieveData();
    }, []);

    return (
        <ListContext.Provider
            value={[list, setList]}>
            {children}
        </ListContext.Provider>
    );
};