import './assets/main.css'
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue';
import { init_auth } from './auth'
const app=createApp(App);
init_auth(app).then(()=>{});
app.use(
    createPinia()
).use(
    router
).mount("#app")
