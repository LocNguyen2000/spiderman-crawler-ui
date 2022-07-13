import { createRouter, createWebHistory } from 'vue-router'

// 1. Định nghĩa / import các component
import CrawlerList from "@/views/crawler/CrawlerList.vue"
import UrlPage from "@/views/url/UrlPage.vue"

// 2. Định nghĩa vị trí route đến component
const routes = [
    { path: '/', redirect: '/CA', },
    {
        path: "/CA", component: CrawlerList,
    },
    {
        path: "/URL", component: UrlPage,
    },

]

// 3. Tạo các instance của router để truyền route
const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: "active",
    routes: routes
})

export default router
