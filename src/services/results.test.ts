import { PokemonDetail } from '../models/pokeapi';
import { Results } from '../models/results';
import { ResultsService } from './results';

test('Generates New Results Entry', () => {
  const results: Results = {};
  results.test = ResultsService.generateNewResultsCategory();
  expect(results).toEqual({
    test: {
      count: 0,
      avgHeight: 0,
      totalHeight: 0,
      avgWeight: 0,
      totalWeight: 0,
    },
  });
});

test('Adds to Results', () => {
  let results: Results = {
    all: {
      count: 1,
      avgHeight: 0,
      totalHeight: 1,
      avgWeight: 0,
      totalWeight: 1,
    },
  };
  const pokemonDetail: PokemonDetail = {
    height: 5,
    weight: 5,
    types: [{
      slot: 1, 
      type: { name: 'test', url: 'some_url' },
    }],
  };
  results = ResultsService.addToResults(results, pokemonDetail);
  expect(results).toEqual({
    all: {
      count: 2,
      avgHeight: 0,
      totalHeight: 6,
      avgWeight: 0,
      totalWeight: 6,
    },
    test: {
      count: 1,
      avgHeight: 0,
      totalHeight: 5,
      avgWeight: 0,
      totalWeight: 5,
    },
  });
});

