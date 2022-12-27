import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// bootstrap 5.1.x
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.css";

const appInstance = createApp(App);
// appInstance.config.compilerOptions.isCustomElement = (tag) => {
//   tag.startsWith("video-");
// };
appInstance.use(router);
appInstance.use(store);
appInstance.mount("#app");
