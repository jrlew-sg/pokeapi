import * as superagent from 'superagent';

import { GetPokemonParams, GetPokemonResults, PokemonDetail } from '../models/pokeapi';

export async function getPokemon({ limit = 20, offset = 0 }: GetPokemonParams): Promise<GetPokemonResults> {
    const res = await superagent.get('https://pokeapi.co/api/v2/pokemon')
        .query({ limit })
        .query({ offset });
    return res.body
}

export async function getPokemonDetails(url: string): Promise<PokemonDetail> {
    const res = await superagent.get(url);
    return res.body
}
