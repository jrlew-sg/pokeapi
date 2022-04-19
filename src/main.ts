#!/usr/bin/env node

import { Command, OptionValues } from 'commander'

import { GetPokemonResults, PokemonDetail } from './models/pokeapi';
import { Results, CategoryResults } from './models/results'

import { getPokemon, getPokemonDetails } from './services/pokeapi';

main();

async function main() {
    const time = Date.now()

    const args: OptionValues = getCommandLineArgs();

    console.log(`Limit: ${args.limit} - Offset: ${args.offset}`)

    const pokemon = await getPokemon({
        offset: args.offset,
        limit: args.limit
    });

    await getAllPokemonDetails(pokemon);
    console.log(`Ellapsed Time: ${((Date.now() - time) / 1000).toFixed(2)} seconds`);
}

function getCommandLineArgs(): OptionValues {
    const program = new Command();

    program
        .option('-o, --offset <char>', 'Add offset to query')
        .option('-l, --limit <char>', 'Add limit to query');

    program.parse();

    return program.opts();
}

async function getAllPokemonDetails(pokemon: GetPokemonResults) {
    let results: Results = {
        all: addNewResultsTypeEntry()
    }

    const promises = []
    for (const poke of pokemon.results) {
        promises.push(getPokemonDetails(poke.url))
    }

    const responses = await Promise.all(promises);
    responses.forEach(res => {
        results = addToResults(results, res)
    })

    console.log(results);
    parseAndPrintResults(results);
}

function parseAndPrintResults(results: Results) {
    for (const type in results) {
        results[type].avgHeight = (results[type].totalHeight / results[type].count).toFixed(2)
        results[type].avgWeight = (results[type].totalWeight / results[type].count).toFixed(2)
        console.log(`${type} (${results[type].count})- Average Height: ${results[type].avgHeight}dm - Average Weight: ${results[type].avgWeight}hg`)
    }
}

function addToResults(results: Results, pokemonDetails: PokemonDetail) {
    results.all.count++;
    results.all.totalHeight += pokemonDetails.height
    results.all.totalWeight += pokemonDetails.weight

    pokemonDetails.types.forEach(type => {
        const typeName = type.type.name;
        if (!results.hasOwnProperty(typeName)) {
            console.log(`Adding ${typeName} to results`)
            results[typeName] = addNewResultsTypeEntry();
        }
        results[typeName].count++;
        results[typeName].totalHeight += pokemonDetails.height
        results[typeName].totalWeight += pokemonDetails.weight
    });

    return results;
}

function addNewResultsTypeEntry(): CategoryResults {
    return {
        count: 0,
        avgHeight: "",
        totalHeight: 0,
        avgWeight: "",
        totalWeight: 0,
    }
}
