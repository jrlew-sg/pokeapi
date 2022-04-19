export interface GetPokemonParams {
    limit: number,
    offset: number,
}

export interface GetPokemonResults {
    count: number,
    next: string | null,
    previous: string | null,
    results: PokemonSummary[],
}

export interface PokemonSummary {
    name: string,
    url: string,
}

export interface GetPokemonDetailsResults {

}

export interface PokemonDetail {
    height: number,
    weight: number,
    types: {
        slot: number,
        type: Type
    }[],
}

export interface Type {
    name: string,
    url: string,
}
