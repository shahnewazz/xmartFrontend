import { createApp } from 'vue';
import './style.css';
import './template.js';
import 'nprogress/nprogress.css';
import {createPinia} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import "skeleton-screen-css";
import router from './router';
import App from './App.vue';

const pinia = createPinia()
const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(ElementPlus)
app.use(router)

app.config.globalProperties.$filters = {
    currencySymbol(value){
        return "$" + value.toLocaleString()
    },
    makeImagePath(img){
        return import.meta.env.VITE_API_URL + "/" + img
    }
}

app.mount('#app')
