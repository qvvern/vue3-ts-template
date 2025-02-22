import type { StatePokemon } from '@/types/state/StatePokemon';
import { defineStore } from 'pinia';
import actions from '@/stores/pokemonStore/actions';

export const usePokemonStore = defineStore('pokemonStore', {
	state: (): StatePokemon => ({
		pokemons: [],
		selectedPokemon: null,
	}),
	actions,
});
