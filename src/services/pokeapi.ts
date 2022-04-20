import * as superagent from 'superagent';

import { GetPokemonParams, GetPokemonResults, PokemonDetail } from '../models/pokeapi';
import { Results } from '../models/results';

import { ResultsService } from './results';

export class PokeApiService {
  public static async getPokemon({ limit = 20, offset = 0 }: GetPokemonParams, retries = 0): Promise<GetPokemonResults> {
    try {
      const res = await superagent.get('https://pokeapi.co/api/v2/pokemon')
        .query({ limit })
        .query({ offset });
      return res.body;
    } catch (e) {
      if (retries > 5) {
        throw e;
      }

      await new Promise((res) => setTimeout(res, (retries + 1 * 10)));
      return this.getPokemon({ limit, offset }, retries + 1);
    }
  }

  public static async getPokemonDetails(url: string, retries = 0): Promise<PokemonDetail> {
    try {
      const res = await superagent.get(url);
      return res.body;
    } catch (e) {
      if (retries > 5) {
        throw e;
      }

      await new Promise((res) => setTimeout(res, (retries + 1 * 10)));
      return this.getPokemonDetails(url, retries + 1);
    }
  }

  public static async getAverageStats({ offset, limit }): Promise<Results> {
    const pokemon = await this.getPokemon({
      offset,
      limit,
    });
    
    return this.getAllPokemonDetails(pokemon);
  }


  public static async getAllPokemonDetails(pokemon: GetPokemonResults): Promise<Results> {
    let results: Results = {
      all: ResultsService.generateNewResultsCategory(),
    };

    const promises = [];
    for (const poke of pokemon.results) {
      promises.push(PokeApiService.getPokemonDetails(poke.url));
    }

    const responses = await Promise.all(promises);
    responses.forEach(res => {
      results = ResultsService.addToResults(results, res);
    });

    return results;
  }
}
