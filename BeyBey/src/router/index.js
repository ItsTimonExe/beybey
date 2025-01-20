import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/app',
        redirect: '/app'
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component:() => import('../views/dashboard.vue')

    },
    {
        path: '/login',
        name: 'login',
        component:() => import('../views/login.vue')

    },
    {
        path: '/checkout',
        name: 'checkout',
        component:() => import('../views/checkout.vue')

    },
    {
        path: '/cart',
        name: 'cart',
        component:() => import('../views/cart.vue')

    },
    {
        path: '/contact',
        name: 'contact',
        component:() => import('../views/contact.vue')

    },
    {
        path: '/shop',
        name: 'shop',
        component:() => import('../views/shop.vue')

    },
    {
        path: "/product/:id", // Chemin pour accéder à un produit spécifique
        name: "ProductPage",
        component:() => import('../views/product.vue'),
        props: true,
    },
    {
        path: '/',
        name: 'home',
        component:() => import('../views/home.vue')

    },
    {

        path: '/NotFound',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue')
    },
    {

        path: '/RequestPassword',
        name: 'RequestPassword',
        component: () => import('../views/RequestPassword.vue')
    },
    {

        path: '/ResetPassword',
        name: 'ResetPassword',
        component: () => import('../views/ResetPassword.vue')
    },
    {

        path: '/Register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    }
    ,
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/NotFound.vue')
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
})



export default router;
