<script setup>
import {useCart} from '@/stores'
import { ProductPrice } from "@/components/product";
import { ref } from 'vue';
const props = defineProps({
    products: {
        type: Object,
        required : true
    }
})

const cart = useCart();
const price = ref()

function addToCart(product){
    if(product.discount){
        let firstprice = product.price;
        let discount = product.discount / 100
        let totalPrice = firstprice - (firstprice * discount);

        price.value = totalPrice.toFixed(2)
    }else{
        price.value = product.price
    }

    cart.addToCart({
        id: product.id,
        name: product.name,
        price: price.value,
        thumbnail: product.thumbnail,
    })
}

</script>

<template>
    <div class="col" v-for="(product, index) in products.data" :key="index">
        <div class="product-card">
            <div class="product-media">
                <div class="product-label">
                <label class="label-text new">{{product.conditions}}</label>
                <label class="label-text sale" v-if="product.discount">{{product.discount}}%</label>
                </div>
                <button class="product-wish wish">
                <i class="fas fa-heart"></i>
                </button>
                <router-link class="product-image" :to="{name: 'product.details'}">
                <img :src="$filters.makeImagePath(product.thumbnail)" alt="product" />
                </router-link>
            </div>
            <div class="product-content">
                <h6 class="product-name">
                    <router-link :to="{name: 'product.details'}">{{product.name}}</router-link>
                </h6>

                <ProductPrice :price="product.price" :discount="product.discount"/>

                <button class="product-add" title="Add to Cart" @click.prevent="addToCart(product)">
                    <i class="fas fa-shopping-basket"></i><span>Add</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>