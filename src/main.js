import { createApp } from 'vue'
import App from './App.vue'
import router from "./js/router"

let app = createApp(App).use(router)

app.mount('#app')
