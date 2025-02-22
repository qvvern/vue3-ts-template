import type { ApiListResponse } from '@/types/api/ApiListResponse';
import type { Pokemon } from '@/types/pokemon/Pokemon';
import { axiosPokeapi } from '@/axios';

export default {
	fetchPokemonsAsync(params?: Record<string, unknown>): Promise<ApiListResponse<Pokemon>> {
		return axiosPokeapi
			.get<ApiListResponse<Pokemon>>('/v2/pokemon', {
				params,
			})
			.then((response) => response.data)
			.catch((error: unknown) => {
				throw error;
			});
	},
};
