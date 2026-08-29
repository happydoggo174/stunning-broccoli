import './assets/main.css'
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
import { init_auth } from './auth'
const app=createApp(App);
init_auth().then(()=>{});
app.use(
    router
).mount("#app")
