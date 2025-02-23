<script setup lang="ts">
import PokemonsTable from '@/components/pokemons/PokemonsTable.vue';
import BaseDarkToggleButton from '@/components/base/BaseDarkToggleButton.vue';
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
                <PokemonsTable />
            </div>
        </div>
    </section>
</template>
