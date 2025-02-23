<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore';
import PokemonsTable from '@/components/pokemons/PokemonsTable.vue';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import BaseDarkToggleButton from '@/components/base/BaseDarkToggleButton.vue';

const pokemonStore = usePokemonStore();
const isPageLoading = ref(true);
const failedToLoadPage = ref(false);
const total = ref<number>(0);

onMounted(async () => {
    await loadPokemonsAsync();
});

async function loadPokemonsAsync(): Promise<void> {
    isPageLoading.value = true;
    await pokemonStore
        .fetchPokemonsAsync()
        .then((response) => {
            total.value = response.count;
        })
        .finally(() => {
            isPageLoading.value = false;
        })
        .catch(() => {
            failedToLoadPage.value = true;
        });
}
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="max-w-screen-xl px-4 pt-4 mx-auto lg:pt-8 lg:px-6">
            <div class="max-w-screen-md mx-auto mb-6 text-center lg:mb-8">
                <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Example</h2>
                <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum pretium lobortis. Etiam arcu
                    sapien, pharetra sit amet nibh quis, venenatis tincidunt est.
                </p>
                <BaseDarkToggleButton />
            </div>
            <div class="w-full">
                <div v-if="isPageLoading" class="w-full h-full flex justify-center">
                    <BaseSpinner class="self-center" />
                </div>
                <div v-if="failedToLoadPage" class="w-full h-full flex justify-center">
                    <div class="self-center">Sorry, something went wrong.</div>
                </div>
                <PokemonsTable v-else :total="total" />
            </div>
        </div>
    </section>
</template>
