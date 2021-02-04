import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Users from '@/views/Users.vue'
import ProductShow from '@/views/products/ProductShow.vue'
import ProductEdit from '@/views/products/ProductEdit.vue'
import Products from '@/components/Products.vue'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/products',
        name: 'products',
        component:Products,
        children:[
            {
                path: ':id',
                name: 'productShow',
                component: ProductShow},
            {
                path: 'edit/:id',
                name: 'productEdit',
                component: ProductEdit},
        ]
    },
    {
        path: '/users/:id',
        name: 'userShow',
        component:Users,

    },
    {
        path: '/404',
        name: '404',
        component: NotFound
    },
    {
        path:'*',
        redirect:{name:'404'}
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
