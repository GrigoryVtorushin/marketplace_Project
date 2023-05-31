import {createRouter, createWebHistory} from "vue-router";
import Catalog from "@/components/Catalog.vue";
import Cart from "@/components/Cart.vue";
import ProductPage from "@/pages/ProductPage.vue"
import FavouritePage from '@/pages/FavouritePage.vue'
import MainPage from '@/pages/MainPage.vue'

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/catalog',
        component: Catalog
    },
    {
        path: '/cart',
        component: Cart,
        props: true
    },
    {
        name: 'productPage',
        path: '/catalog/:id',
        component: ProductPage,
        props: true
    },
    {
        path: '/favourites',
        component: FavouritePage,
        props: true
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})


export default router;