import './assets/main.css'
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue';
import { init_auth0 } from './api';
const app=createApp(App);
const auth0=createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
        redirect_uri: window.location.origin+`/${import.meta.env.VITE_BASE}/`,
        audience:"mathapi"
    },
    cacheLocation:'localstorage'
});
init_auth0(auth0);
app.use(
   auth0 
).use(
    createPinia()
).use(
    router
).mount("#app")
