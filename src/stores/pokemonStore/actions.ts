import type { StatePokemon } from '.';
import type { ApiListResponse } from '@/types/ApiListResponse';
import type { Pokemon } from '@/types/Pokemon';
import api from '@/api/pokemonApi';
import { API } from '@/constants/api';

export default {
    async fetchPokemonsAsync(this: StatePokemon, append?: boolean | null): Promise<ApiListResponse<Pokemon>> {
        try {
            const response = await api.fetchPokemonsAsync({
                limit: API.PAGE_SIZE,
                offset: this.pokemons.length,
            });
            if (append) {
                this.pokemons = this.pokemons.concat(response.results ?? []);
            } else {
                this.pokemons = response.results ?? [];
            }
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
