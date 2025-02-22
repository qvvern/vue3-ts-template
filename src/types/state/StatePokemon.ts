import type { Pokemon } from '@/types/pokemon/Pokemon';

export interface StatePokemon {
	pokemons: Pokemon[];
	selectedPokemon: Pokemon | null;
}
