#!/usr/bin/env node

import { Command, OptionValues } from 'commander'

import { GetPokemonResults } from './models/pokeapi';
import { Results } from './models/results'
import { addToResults, generateNewResultsCategory, parseAndPrintResults } from './results';

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
        all: generateNewResultsCategory()
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
