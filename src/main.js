import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import router from "./router";
import Notifications from "@kyvg/vue3-notification";

createApp(App).use(router).use(store).use(Notifications).mount("#app");
/* createApp(App).use(store).mount('#app') */