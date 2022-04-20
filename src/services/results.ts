import { PokemonDetail } from '../models/pokeapi';
import { CategoryResults, Results } from '../models/results';

export class ResultsService {

  public static generateNewResultsCategory(): CategoryResults {
    return {
      count: 0,
      averageHeight: 0,
      totalHeight: 0,
      averageWeight: 0,
      totalWeight: 0,
    };
  }

  public static addToResults(results: Results, pokemonDetails: PokemonDetail) {
    results.all.count++;
    results.all.totalHeight += pokemonDetails.height;
    results.all.totalWeight += pokemonDetails.weight;

    pokemonDetails.types.forEach(type => {
      const typeName = type.type.name;
      if (!Object.prototype.hasOwnProperty.call(results, typeName)) {
        results[typeName] = this.generateNewResultsCategory();
      }
      results[typeName].count++;
      results[typeName].totalHeight += pokemonDetails.height;
      results[typeName].totalWeight += pokemonDetails.weight;
    });

    return results;
  }

  public static calculateAverages(results: Results) {
    for (const type in results) {
      results[type].averageHeight = parseFloat((results[type].totalHeight / results[type].count).toFixed(2));
      results[type].averageWeight = parseFloat((results[type].totalWeight / results[type].count).toFixed(2));
    }
    return results;
  }
}
