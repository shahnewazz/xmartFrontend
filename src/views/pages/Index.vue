<script setup>
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { storeToRefs } from 'pinia';
import { ProductCard } from '@/components/product'
import { HomeSliderScreen, CategoryScreen, ProductScreen } from '@/components/skeleton'
import { useSlider, useCategory, useProduct } from '@/stores';
import { ProductPrice } from "@/components/product";
import 'swiper/css';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css/pagination';
import 'swiper/css/navigation';



const modules = ref([Pagination, Autoplay])
const newSlide = ref([Navigation, Autoplay])

const slider = useSlider();
const { sliders } = storeToRefs(slider);

const category = useCategory();
const { categories } = storeToRefs(category);

const product = useProduct();
const { products, sale, popular, winter, newProduct, feature } = storeToRefs(product);


onMounted(() => {
  slider.getSliders()
  category.getCategories()
  product.getProducts()
  product.getProducts("sale")
  product.getProducts("popular")
  product.getProducts("winter")
  product.getProducts("new")
  product.getProducts("feature")
})



</script>

<template>
  <div>

    <section class="banner-part">
      <div class="">
        <div class="row">
          <div class="col-lg-12 order-0 order-lg-1 order-xl-1">
            <div class="home-grid-slider slider-arrow slider-dots">

              <template v-if="sliders.data">
                <swiper :pagination="{ clickable: true }" :modules="modules" :autoplay="{
                delay: 2000,
                disableOnInteraction: false,
              }" class="mySwiper">

                  <swiper-slide v-for="(slider, index) in sliders.data" :key="index">
                    <a href="#" class="w-100 d-block">
                      <img :src="$filters.makeImagePath(slider.image)" alt="" />
                    </a>
                  </swiper-slide>

                </swiper>
              </template>

              <template v-else>
                <HomeSliderScreen />
              </template>

            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- category area -->
    <section class="section suggest-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h3 style="float: left">SHOP BY CATEGORIES</h3>
            </div>
          </div>
        </div>

        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">

          <template v-if="categories.data">
            <div class="col" v-for="(category, index) in categories.data" :key="index">
              <div class="product-card">
                <ul>
                  <li>
                    <a class="suggest-card" :href="category.slug">
                      <img :src="$filters.makeImagePath(category.image)" alt="" />
                    </a>
                  </li>
                </ul>

                <h6 class="text-center mt-2">{{ category.name }}</h6>
              </div>
            </div>
          </template>

          <template v-else>
            <CategoryScreen :dataAmount="10"/>
          </template>


          
        </div>
      </div>
    </section>
    <!-- category area -->

    <!-- Sale area -->
    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>recently sold items</h2>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">

          

          <template v-if="sale.data">
            <ProductCard :products="sale" />
          </template>

          <template v-else>
            <ProductScreen :dataAmount="10"/>
          </template>

        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"><i class="fas fa-eye"></i><span>show more</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Sale area -->

    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Popular items</h2>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          
          <template v-if="popular.data">
            <ProductCard :products="popular" />
          </template>

          <template v-else>
            <ProductScreen :dataAmount="10"/>
          </template>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"><i class="fas fa-eye"></i><span>show more</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Feature items</h2>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          
          <template v-if="feature.data">
            <ProductCard :products="feature" />
          </template>

          <template v-else>
            <ProductScreen :dataAmount="10"/>
          </template>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"><i class="fas fa-eye"></i><span>show more</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section newitem-part">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section-heading">
              <h2>collected new items</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">

            <div class="new-slider slider-arrow">

              <swiper :slidesPerView="5" :spaceBetween="30" :slidesPerGroup="1" :pagination="{ clickable: true }"
                :autoplay="{ delay: 2000 }" :navigation="true" :loop="true" :modules="newSlide" class="mySwiper">

                <swiper-slide v-for="(product, index) in newProduct.data" :key="index">
                  <div class="product-card">
                    <div class="product-media">
                      <div class="product-label">
                        <label class="label-text new">{{ product.conditions }}</label>
                        <label class="label-text sale" v-if="product.discount">{{ product.discount }}%</label>
                      </div>
                      <button class="product-wish wish">
                        <i class="fas fa-heart"></i>
                      </button>
                      <router-link class="product-image" :to="{ name: 'product.details' }">
                        <img :src="$filters.makeImagePath(product.thumbnail)" alt="product" />
                      </router-link>
                    </div>
                    <div class="product-content">
                      <h6 class="product-name">
                        <router-link :to="{ name: 'product.details' }">{{ product.name }}</router-link>
                      </h6>

                      <ProductPrice :price="product.price" :discount="product.discount" />

                      <button class="product-add" title="Add to Cart">
                        <i class="fas fa-shopping-basket"></i><span>Add</span>
                      </button>
                    </div>
                  </div>
                </swiper-slide>

              </swiper>

            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"><i class="fas fa-eye"></i><span>show more</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>