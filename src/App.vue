<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <notifications position="top center" />
    <router-view v-bind="{ ...route.params, ...route.query }" />
</template>
