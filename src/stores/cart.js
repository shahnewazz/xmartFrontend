import { defineStore } from "pinia";
import axios from "axios";
import { computed, reactive, ref } from "vue";
import axiosInstance from "@/services/axiosService";


export const useCart = defineStore("cart", () => {

    const cartItems = reactive([])
    const cartItemsCount = ref(0)
    const loading = ref(false)

    function addToCart(product){
        let item = product;
        item = {...item, quantity: 1}

        if(cartItems.length > 0){
           let hasItem =  cartItems.some((i) => i.id === item.id);

           if(hasItem){
            console.log('has item')
            let index = cartItems.findIndex((i) => i.id === item.id);
                cartItems[index]['quantity'] += 1;
           }else{
            console.log('new item pushed')
            cartItems.push(item)
        }
        }else{
            cartItems.push(item)
        }

        cartItemsCount.value += 1;
      
    }

    const totalPrice = computed(() => {
        let total = 0;
        cartItems.map((item) => {
            total += item.price * item.quantity
        })
 
        return total;
       
    })

    const cartTotalItems = computed(() => {
        let total = 0;
        cartItems.map((item) => {
            total += item.quantity
        })
 
        return total;
       
    })

    async function deleteCartItem(index){
        cartItems.splice(index, 1);
        cartItemsCount.value -= 1;
    }

    async function decrementCartItem(index){
        if(cartItems[index]['quantity'] !== 1){
            cartItems[index]['quantity'] -= 1;
            cartItemsCount.value -= 1;
        }

    }

    async function incrementCartItem(index){
        cartItems[index]['quantity'] += 1;
        cartItemsCount.value += 1;
    }

    return { addToCart, loading, cartItems, cartItemsCount, totalPrice, cartTotalItems, deleteCartItem, decrementCartItem, incrementCartItem}
},
{
    persist: {
        paths: ["cartItems", "cartItemsCount"]
    },
},
)