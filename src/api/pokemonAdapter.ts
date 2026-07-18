import type {
  Pokemon,
  PokemonDetailResponse,
  PokemonListResponse,
  PokemonSummary,
  TypeResponse,
} from "./types";

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";

async function pokeApiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${POKE_API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`PokeAPI error ${response.status}: ${path}`);
  }

  return response.json() as Promise<T>;
}

function toPokemon(detail: PokemonDetailResponse): Pokemon {
  return {
    id: detail.id,
    name: detail.name,
    imageUrl:
      detail.sprites.other?.["official-artwork"]?.front_default ??
      detail.sprites.front_default,
    types: detail.types.map((t) => t.type.name),
  };
}

export function fetchPokemonList(
  limit = 20,
  offset = 0,
): Promise<PokemonListResponse> {
  return pokeApiFetch<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`,
  );
}

export function fetchPokemonByName(
  name: string,
): Promise<PokemonDetailResponse> {
  return pokeApiFetch<PokemonDetailResponse>(`/pokemon/${name}`);
}

export function fetchPokemonById(id: number): Promise<PokemonDetailResponse> {
  return pokeApiFetch<PokemonDetailResponse>(`/pokemon/${id}`);
}

export function fetchPokemonByType(type: string): Promise<TypeResponse> {
  return pokeApiFetch<TypeResponse>(`/type/${type}`);
}

export async function getPokemonDetail(name: string): Promise<Pokemon> {
  const detail = await fetchPokemonByName(name);
  return toPokemon(detail);
}

export async function getPokemonSummariesByType(
  type: string,
): Promise<PokemonSummary[]> {
  const res = await fetchPokemonByType(type);
  return res.pokemon.map((p) => p.pokemon);
}
