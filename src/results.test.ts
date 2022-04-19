import { PokemonDetail } from './models/pokeapi';
import { generateNewResultsCategory, addToResults, parseAndPrintResults } from './results'

test("Generates New Results Entry", () => {
    const results = {};
    results["test"] = generateNewResultsCategory();
    expect(results).toEqual({
        test: {
            count: 0,
            avgHeight: "",
            totalHeight: 0,
            avgWeight: "",
            totalWeight: 0,
        }
    })
});

test("Adds to Results", () => {
    let results = {
        all: {
            count: 1,
            avgHeight: "",
            totalHeight: 1,
            avgWeight: "",
            totalWeight: 1,
        }
    };
    const pokemonDetail: PokemonDetail = {
        height: 5,
        weight: 5,
        types: [{
            slot: 1, 
            type: { name: "test", url: "some_url" }
        }]
    }
    results = addToResults(results, pokemonDetail);
    expect(results).toEqual({
        all: {
            count: 2,
            avgHeight: "",
            totalHeight: 6,
            avgWeight: "",
            totalWeight: 6,
        },
        test: {
            count: 1,
            avgHeight: "",
            totalHeight: 5,
            avgWeight: "",
            totalWeight: 5,
        }
    });
});

