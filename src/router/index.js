import { createRouter, createWebHistory } from "vue-router";
import {Index, Shop, SellerPage, SellerStore, SellerApply, ProductDetails, Checkout} from '@/views/pages';
import {Login, Register} from '@/views/auth';
import {MyProfile, MyOrderList, MyWishList} from '@/views/user';
import { useAuth } from "@/stores";
import NProgress from "nprogress";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Index,
        meta: {title: "Home"}
    },
    // user auth
    {
        path: '/auth/login',
        name: 'user.login',
        component: Login,
        meta: {title: "Login", guest: true}
    },
    {
        path: '/auth/register',
        name: 'user.register',
        component: Register,
        meta: {title: "Register", guest: true}
    },
    {
        path: '/my/profile',
        name: 'user.profile',
        component: MyProfile,
        meta: {
            title: "My Profile",
            requiresAuth: true
        }
    },
    {
        path: '/my/orders',
        name: 'user.orders',
        component: MyOrderList,
        meta: {title: "My Orders", requiresAuth: true}
    },
    {
        path: '/my/wishlist',
        name: 'user.wishlist',
        component: MyWishList,
        meta: {title: "My Wishlist", requiresAuth: true}
    },

    // shop page
    {
        path: '/shop',
        name: 'shop.page',
        component: Shop,
        meta: {title: "Shop"}
    },
    {
        path: '/product/details',
        name: 'product.details',
        component: ProductDetails,
        meta: {title: "Product Details"}
    },
    {
        path: '/checkout',
        name: 'checkout.page',
        component: Checkout,
        meta: {title: "Checkout"}
    },

    // seller page
    {
        path: '/seller-list',
        name: 'seller.page',
        component: SellerPage,
        meta: {title: "Seller List"}
    },
    {
        path: '/seller-store',
        name: 'seller.store',
        component: SellerStore,
        meta: {title: "Seller Store"}
    },
    {
        path: '/seller-apply',
        name: 'seller.apply',
        component: SellerApply,
        meta: {title: "Seller Apply"}
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

const DEFAULT_TITLE = "404 Not Found"

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || DEFAULT_TITLE;
    NProgress.start()
    const loggedIn = useAuth();

    if(to.matched.some((reocrd) => reocrd.meta.requiresAuth)){
        if(!loggedIn.user.meta){
            next({name: "user.login"})
        }else{
            next()
        }
    }
    else if(to.matched.some((reocrd) => reocrd.meta.guest)){
        if(loggedIn.user.meta){
            next({name: "user.profile"})
        }else{
            next()
        }
    }
    else{
        next();
    }
});

router.afterEach(()=>{
    NProgress.done()
})

export default router;