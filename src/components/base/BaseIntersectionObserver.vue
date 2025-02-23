<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';

const emit = defineEmits(['intersecting']);
const root = ref(null);
const intersector = useTemplateRef<HTMLElement>('intersector');
const isVisible = shallowRef(false);

useIntersectionObserver(
    intersector,
    ([entry]) => {
        isVisible.value = entry?.isIntersecting || false;
    },
    { root },
);

watch(
    () => isVisible.value,
    (intersecting) => {
        emit('intersecting', intersecting);
    },
    { immediate: true },
);
</script>

<template>
    <div ref="intersector"></div>
</template>
