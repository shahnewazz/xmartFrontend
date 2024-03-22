<script setup>

import {useAuth, useCart} from "@/stores";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus'


const cart = useCart();
const {cartItemsCount, cartTotalItems, totalPrice } = storeToRefs(cart)

const auth = useAuth()
const {user, loading} = storeToRefs(auth)

const router = useRouter()
const userLogout = async () => {
  const res = await auth.logout();

  if(res.status){
    router.push({name:"home"})
    ElNotification({
      title: 'Success',
      message: "Logged Out",
      type: "success"
    })

  }
} 
 function headerSearch(){
    $(".header-form").toggleClass("active"),
    $('.header-src').children(".fa-search").toggleClass("fa-times");

 }

 function menu(){

    $("body").css("overflow", "hidden"),
      $(".nav-sidebar").addClass("active"),
      $(".nav-close").on("click", function () {
        $("body").css("overflow", "inherit"),
          $(".nav-sidebar").removeClass("active"),
          $(".backdrop").fadeOut();
      });

 }

 function cartOpen(){
  $(".backdrop").fadeIn(),
  $("body").css("overflow", "hidden"),
      $(".cart-sidebar").addClass("active"),
      $(".cart-close").on("click", function () {
        $("body").css("overflow", "inherit"),
          $(".cart-sidebar").removeClass("active"),
          $(".backdrop").fadeOut();
      });
 }


</script>
 
<template>
    <div>
      <div class="header-top">
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-lg-5">
              <div class="header-top-welcome">
                <p>Welcome to Ecomart in Your Dream Online Store!</p>
              </div>
            </div>
            <div class="col-md-5 col-lg-3"></div>
            <div class="col-md-7 col-lg-4">
              <ul class="header-top-list">
                <li><router-link :to="{name: 'seller.apply'}">Seller Apply</router-link></li>
                <li><a href="faq.html">need help</a></li>
                <li><a href="contact.html">contact us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <header class="header-part">
        <div class="container">
          <div class="header-content">
            <div class="header-media-group">
              <button class="header-user" @click="menu">
                <img src="@/assets/images/menu.png" alt="user" />
              </button>
              <router-link :to="{name:'home'}"><img src="@/assets/images/logo.png" alt="logo" /></router-link>
              <button class="header-src" @click="headerSearch">
                <i class="fas fa-search"></i>
              </button>
            </div>


            <router-link :to="{name:'home'}" class="header-logo"><img src="@/assets/images/logo.png" alt="logo" /></router-link>

            <form class="header-form">
              <input type="text" placeholder="Search anything..." /><button>
                <i class="fas fa-search"></i>
              </button>
            </form>
            <div class="header-widget-group hover-nav">
              <li class="nav-item dropdown">
                <a class="nav-link header-widget" href="#"><i class="fas fa-user"></i></a>
                <ul class="dropdown-menu dropdown-menu-end" v-if="!user.meta">
                  <li>
                    <router-link class="dropdown-item" :to="{name: 'user.login'}">
                      Login
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{name: 'user.register'}">
                      Register
                    </router-link>
                  </li>
                </ul>

                <ul class="dropdown-menu dropdown-menu-end" v-else>
                  <li>
                    <router-link class="dropdown-item" :to="{name: 'user.profile'}">
                      My Profile
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{name: 'user.orders'}">
                      Orders
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" :to="{name: 'user.wishlist'}">
                      Wishlist
                    </router-link>
                  </li>
                  <li>
                    <button class="dropdown-item" @click.prevent="userLogout" :disabled="loading">
                      Logout
                      <span v-show="loading" class="spinner-border spinner-border-sm mr-1"></span>
                    </button>
                  </li>
                </ul>
              </li>

              <a href="wishlist.html" class="header-widget" title="Wishlist">
                <i class="fas fa-heart"></i>
                <sup>0</sup>
              </a>
              <button class="header-widget header-cart" title="Cartlist" @click="cartOpen">
                <i class="fas fa-shopping-basket"></i>
                <sup>{{cartTotalItems}}</sup>
                <span>total price<small>{{ $filters.currencySymbol(totalPrice) }}</small></span>
              </button>
            </div>
          </div>
        </div>
    </header>
    </div>
</template>
 
<style scoped>
 .hover-nav .nav-item .dropdown-menu{
  display: none;
  margin-top: 0;
 }
 .hover-nav .nav-item:hover .dropdown-menu{
  display: block;
 }
</style>