<script setup lang="ts">
import type { ApiListResponse } from '@/types/ApiListResponse';
import type { BaseTableColumn } from '@/types/BaseTableColumn';
import type { Pokemon } from '@/types/Pokemon';
import { notify } from '@kyvg/vue3-notification';
import { usePokemonStore } from '@/stores/pokemonStore';
import { API } from '@/constants/api';
import { usePokemonAbility } from '@/composables/usePokemonAbility';
import BaseTable from '@/components/base/BaseTable.vue';
import BaseIntersectionObserver from '@/components/base/BaseIntersectionObserver.vue';
import BaseSpinner from '@/components/base/BaseSpinner.vue';

const pokemonStore = usePokemonStore();

const isLoading = ref(true);
const failedToLoad = ref(false);
const isLoadingMore = ref<boolean>(false);
const hasfetchedAll = ref<boolean>(false);
const total = ref<number>(0);

const columns: BaseTableColumn[] = [
    { key: 'total', label: '#' },
    { key: 'name', label: 'Name' },
    { key: 'url', label: 'Url' },
];

async function loadAsync(): Promise<void> {
    isLoading.value = true;
    await pokemonStore
        .fetchPokemonsAsync()
        .then((response) => {
            total.value = response.count;
            if (response.count < API.PAGE_SIZE) {
                hasfetchedAll.value = true;
            }
        })
        .finally(() => {
            isLoading.value = false;
        })
        .catch(() => {
            failedToLoad.value = true;
        });
}

async function loadMoreAsync(intersecting: boolean): Promise<void> {
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

onMounted(async () => {
    await loadAsync();
});

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
    <div v-if="isLoading" class="w-full h-full flex justify-center">
        <BaseSpinner class="self-center" />
    </div>
    <div v-if="failedToLoad" class="w-full h-full flex justify-center">
        <div class="self-center">Sorry, something went wrong.</div>
    </div>
    <template v-else>
        <BaseTable
            v-model="pokemonStore.selectedPokemon"
            :rows="pokemonStore.pokemons"
            :columns="columns"
            :loading-more="isLoadingMore"
        >
            <template #cell="{ cell, column, index }">
                <span v-if="column.key === 'total'"> {{ index + 1 }} </span>
                <span v-else>
                    {{ cell }}
                </span>
            </template>
            <template #foot="{ column }">
                <template v-if="column.key === 'total'"> {{ pokemonStore.pokemons.length }} of {{ total }} </template>
            </template>
        </BaseTable>
        <BaseIntersectionObserver v-if="!hasfetchedAll" @intersecting="loadMoreAsync" />
    </template>
</template>
