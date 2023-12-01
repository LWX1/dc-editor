import { RouteRecordRaw } from 'vue-router';

export const Routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        component: import('src/views/home/index.vue'),
    },
    {
        path: '/record',
        component: import('src/views/record/index.vue'),
    },
];
