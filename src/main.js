import { createApp } from 'vue'
import App from './App.vue'
import router from "./js/router"

import BASE_API from "@/js/resources/resourceAPI"
import ENUM from "@/js/resources/resourceEnum"
import resources from "@/js/resources/resourceMsg"

let app = createApp(App)

// Đặt resource cho API
app.config.globalProperties.BASE_API = BASE_API

// Đặt enum
app.config.globalProperties.ENUM = ENUM

// Đặt resource cho các thông báo message của popup, toast, lỗi
app.config.globalProperties.popupMsg = resources.popupMsg
app.config.globalProperties.toastMsg = resources.toastMsg
app.config.globalProperties.errorMsg = resources.errorMsg
app.use(router)


app.mount('#app')
