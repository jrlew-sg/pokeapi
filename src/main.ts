#!/usr/bin/env node

import { Command, OptionValues } from 'commander';

import { PokeApiService } from './services/pokeapi';
import { PrintService } from './services/print';

async function main() {
  const time = Date.now();

  const args: OptionValues = getCommandLineArgs();
    
  const results = await PokeApiService.getAverageStats({ limit: args.limit, offset: args.offset });
  PrintService.printResults(results);

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

main();
