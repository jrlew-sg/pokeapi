import { PokemonDetail } from '../models/pokeapi';
import { Results } from '../models/results';
import { ResultsService } from './results';

describe("generateNewResultsCategory", () => {
  test('Should Add New Category to Results', () => {
    const results: Results = {
      all: {
        count: 0,
        averageHeight: 0,
        totalHeight: 0,
        averageWeight: 0,
        totalWeight: 0,
      },
    };
    results.test = ResultsService.generateNewResultsCategory();
    expect(results).toEqual({
      all: {
        count: 0,
        averageHeight: 0,
        totalHeight: 0,
        averageWeight: 0,
        totalWeight: 0,
      },
      test: {
        count: 0,
        averageHeight: 0,
        totalHeight: 0,
        averageWeight: 0,
        totalWeight: 0,
      },
    });
  });
});

describe("addToResults", () => {
  it('Should Update Existing Key Results', () => {
    let results: Results = {
      all: {
        count: 1,
        averageHeight: 0,
        totalHeight: 1,
        averageWeight: 0,
        totalWeight: 1,
      },
      test: {
        count: 1,
        averageHeight: 0,
        totalHeight: 5,
        averageWeight: 0,
        totalWeight: 5,
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
        averageHeight: 0,
        totalHeight: 6,
        averageWeight: 0,
        totalWeight: 6,
      },
      test: {
        count: 2,
        averageHeight: 0,
        totalHeight: 10,
        averageWeight: 0,
        totalWeight: 10,
      },
    });
  });

  it('Should Add New Key to Results', () => {
    let results: Results = {
      all: {
        count: 1,
        averageHeight: 0,
        totalHeight: 1,
        averageWeight: 0,
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
        averageHeight: 0,
        totalHeight: 6,
        averageWeight: 0,
        totalWeight: 6,
      },
      test: {
        count: 1,
        averageHeight: 0,
        totalHeight: 5,
        averageWeight: 0,
        totalWeight: 5,
      },
    });
  });
});

describe("calculateAverages", () => {
  it("Should Calculate Averages For All Entries", () => {
    let results: Results = {
      all: {
        count: 2,
        averageHeight: 0,
        totalHeight: 6,
        averageWeight: 0,
        totalWeight: 6,
      },
      test: {
        count: 3,
        averageHeight: 0,
        totalHeight: 15,
        averageWeight: 0,
        totalWeight: 15,
      }
    };

    results = ResultsService.calculateAverages(results);
    expect(results.all.averageHeight).toBe(3);
    expect(results.all.averageWeight).toBe(3);
    expect(results.test.averageHeight).toBe(5);
    expect(results.test.averageWeight).toBe(5);
  });

  it("Should Round to 2 Decimal Places", () => {
    let results: Results = {
      all: {
        count: 3,
        averageHeight: 0,
        totalHeight: 10,
        averageWeight: 0,
        totalWeight: 20,
      },
    };

    results = ResultsService.calculateAverages(results);
    expect(results.all.averageHeight).toBe(3.33);
    expect(results.all.averageWeight).toBe(6.67);
  });
});
