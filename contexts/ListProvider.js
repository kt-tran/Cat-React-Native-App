import React, { useState, useEffect, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ListContext = createContext();
export const useListContext = () => useContext(ListContext);

function addCatLocal(cat, state, setState) {

    //add to local storage
    let objIndex = state.findIndex((obj) => obj.cat === cat);
    // AsyncStorage.setItem("@Log", JSON.stringify(state));
    setState((x) => {
        x[objIndex].data.push(cat.ID);
        return [...x];
    });
}

export const ListProvider = ({ children }) => {
    const [state, setState] = useState([]);

    let _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem("@Log");
            console.log("Retrieved LOG");
            if (value !== null) {
                // We have data!!
                setState(JSON.parse(value));
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
            value={[state, setState, (x) => addCatLocal(x, state, setState)]}
        >
            {children}
        </ListContext.Provider>
    );
};