import React, { useState, useEffect, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ListContext = createContext({});
export const useListContext = () => useContext(ListContext);


export const ListProvider = ({ children }) => {
    const [list, setList] = useState([
        {
            name: "",
            id: "",
            imageURL: "",
        }
    ]);


    return (
        <ListContext.Provider
            value={[list, setList]}>
            {children}
        </ListContext.Provider>
    );
};