import { createPinia } from 'pinia';
import { vTooltip } from 'floating-vue';
import Notifications from '@kyvg/vue3-notification';
import router from '@/router';
import App from '@/App.vue';
import '@/assets/styles/_all.scss';
import '@/assets/styles/tailwind.css';

const app = createApp(App);
app.directive('tooltip', vTooltip);

app.use(createPinia());
app.use(router);
app.use(Notifications);

app.mount('#app');
