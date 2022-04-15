import { createRouter, createWebHistory } from 'vue-router'

// 1. Định nghĩa / import các component
import CrawlerPage from "@/views/setting/CrawlerPage.vue"
import CrawlerList from "@/views/crawler/CrawlerList.vue"
import OutputList from "@/views/output/OutputList.vue"

// 2. Định nghĩa vị trí route đến component
const routes = [
    { path: "/", redirect: '/crawlers' },
    { path: "/setting", component: CrawlerPage },
    { path: "/crawlers", component: CrawlerList },
    { path: "/output", component: OutputList }
]

// 3. Tạo các instance của router để truyền route
const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: "active",
    routes: routes
})

export default router
