import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./css/public.css";

// Vue 3.x 写法
createApp(App).use(router).mount("#app");

// Vue 2.x 写法
// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount("#app");
