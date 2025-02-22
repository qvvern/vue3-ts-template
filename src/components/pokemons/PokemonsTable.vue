<script setup lang="ts">
import type { Pokemon } from '@/types/pokemon/Pokemon';
import type { ApiListResponse } from '@/types/api/ApiListResponse';
import { notify } from '@kyvg/vue3-notification';
import { usePokemonStore } from '@/stores/pokemonStore';
import { API } from '@/constants/api';
import { COLUMNS } from '@/constants/columns';
import { usePokemonAbility } from '@/composables/usePokemonAbility';
import BaseTable from '@/components/base/BaseTable.vue';
import BaseIntersectionObserver from '@/components/base/BaseIntersectionObserver.vue';

const props = defineProps({
	total: { type: Number, default: 0 },
});

const pokemonStore = usePokemonStore();

const isLoadingMore = ref<boolean>(false);
const hasfetchedAll = ref<boolean>(pokemonStore.pokemons.length < API.PAGE_SIZE);

async function loadMore(intersecting: boolean): Promise<void> {
	if (!intersecting || isLoadingMore.value) return;
	isLoadingMore.value = true;
	await pokemonStore
		.fetchPokemonsAsync(true)
		.then((response: ApiListResponse<Pokemon>) => {
			if (response?.count < API.PAGE_SIZE || response?.count === pokemonStore.pokemons.length) {
				hasfetchedAll.value = true;
			}
		})
		.finally(() => {
			isLoadingMore.value = false;
		});
}

watch(
	() => pokemonStore.selectedPokemon,
	(pokemon) => {
		if (pokemon) {
			notify({
				title: `${pokemon.name} attacked!`,
				text: `and gave ${usePokemonAbility()} damage!`,
			});
		}
	},
);
</script>

<template>
	<BaseTable v-model="pokemonStore.selectedPokemon" :rows="pokemonStore.pokemons" :columns="COLUMNS.POKEMONS" :loading-more="isLoadingMore">
		<template #cell="{ cell, column, index }">
			<span v-if="column.key == 'total'"> {{ index + 1 }} </span>
			<span v-else>
				{{ cell }}
			</span>
		</template>
		<template #foot="{ column }">
			<template v-if="column.key == 'total'"> {{ pokemonStore.pokemons.length }} of {{ props.total }} </template>
		</template>
	</BaseTable>
	<BaseIntersectionObserver v-if="!hasfetchedAll" @intersecting="loadMore" />
</template>
