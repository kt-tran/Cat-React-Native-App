import { HandleGetBreedsList } from "./api";

export function GetCountries() {
    const { loading, list, error } = HandleGetBreedsList();
    let countries = [];
    list.map((cat) => (
        countries.push(cat.origin)
    ));

    let uniqueCountries = countries.filter((value, index, array) => array.indexOf(value) === index);
    return uniqueCountries;
}
