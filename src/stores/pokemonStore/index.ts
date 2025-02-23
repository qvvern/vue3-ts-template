import type { Pokemon } from '@/types/Pokemon';
import { defineStore } from 'pinia';
import actions from '@/stores/pokemonStore/actions';

export interface StatePokemon {
    pokemons: Pokemon[];
    selectedPokemon: Pokemon | null;
}

export const usePokemonStore = defineStore('pokemonStore', {
    state: (): StatePokemon => ({
        pokemons: [],
        selectedPokemon: null,
    }),
    actions,
});
