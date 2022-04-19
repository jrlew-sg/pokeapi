import { PokemonDetail } from "./models/pokeapi";
import { CategoryResults, Results } from "./models/results";

export function generateNewResultsCategory(): CategoryResults {
    return {
        count: 0,
        avgHeight: "",
        totalHeight: 0,
        avgWeight: "",
        totalWeight: 0,
    }
}

export function addToResults(results: Results, pokemonDetails: PokemonDetail) {
    results.all.count++;
    results.all.totalHeight += pokemonDetails.height
    results.all.totalWeight += pokemonDetails.weight

    pokemonDetails.types.forEach(type => {
        const typeName = type.type.name;
        if (!results.hasOwnProperty(typeName)) {
            console.log(`Adding ${typeName} to results`)
            results[typeName] = generateNewResultsCategory();
        }
        results[typeName].count++;
        results[typeName].totalHeight += pokemonDetails.height
        results[typeName].totalWeight += pokemonDetails.weight
    });

    return results;
}

export function parseAndPrintResults(results: Results) {
    for (const type in results) {
        results[type].avgHeight = (results[type].totalHeight / results[type].count).toFixed(2)
        results[type].avgWeight = (results[type].totalWeight / results[type].count).toFixed(2)
        console.log(`${type} (${results[type].count})- Average Height: ${results[type].avgHeight}dm - Average Weight: ${results[type].avgWeight}hg`)
    }
}
