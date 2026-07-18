// Raw shapes as returned by https://pokeapi.co/api/v2

export interface NamedApiResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  types: {
    slot: number;
    type: NamedApiResource;
  }[];
}

export interface TypeResponse {
  name: string;
  pokemon: {
    slot: number;
    pokemon: NamedApiResource;
  }[];
}

export interface GenerationResponse {
  name: string;
  pokemon_species: NamedApiResource[];
}

// Domain model used by the app/components — decoupled from the API's shape

export type PokemonType = string;

export interface PokemonSummary {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string | null;
  types: PokemonType[];
}
