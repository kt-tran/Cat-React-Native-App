import React, { useState, useEffect } from "react";

/**
 * fetches a list of 10 cat images for specified breed
 * @returns a promise
 */
export async function GetCatImageList(catID) {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${catID}&limit=10`;
    let res = await fetch(url);
    let catImageObj = await res.json();
    return catImageObj;
}

/**
 * handles promise returned by GetBreedList()
 *  @returns loading and error state + list of cat breeds
 */
export function HandleGetBreedsList() {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                setList(await GetBreedList());
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        })();
    }, []);
    return {
        loading,
        list,
        error,
    };
}


//gets all of the cats from the API
export async function GetBreedList() {
    const url = `https://api.thecatapi.com/v1/breeds`;
    let res = await fetch(url);
    let list = await res.json();
    return list;
}

//functions for the cat facts in footer
export function HandleGetFact() {
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                setResponse(await GetRandomCatFact());
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        })();
    }, []);
    return {
        loading,
        response,
        error,
    };
}

export async function GetRandomCatFact() {
    const url = `https://catfact.ninja/fact`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
}