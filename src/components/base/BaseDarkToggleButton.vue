<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark({
	onChanged(dark: boolean) {
		const element = document.querySelector('html');
		if (dark) {
			element?.classList.add('dark');
			element?.classList.add('p-dark');
		} else {
			element?.classList.remove('dark');
			element?.classList.remove('p-dark');
		}
	},
});

const toggleDark = useToggle(isDark);
</script>

<template>
	<button
		v-tooltip="'i am a tooltip'"
		type="button"
		class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
		@click="toggleDark()"
	>
		Toggle light/dark mode
	</button>
</template>
