import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { ROUTE } from '@/constants/route';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: ROUTE.NAME.POKEMONS,
        component: () => import('@/views/ViewPokemons.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
