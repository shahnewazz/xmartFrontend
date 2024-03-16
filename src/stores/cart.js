import { defineStore } from "pinia";
import axios from "axios";
import { reactive, ref } from "vue";
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
            let index = cartItems.findIndex((i) => i.id === item.id);
                cartItems[index]['quantity'] += 1;
           }else{
            cartItems.push(item)
        }
        }else{
           
            cartItems.push(item)

        }

        cartItemsCount.value += 1;

        console.log(cartItems)
      
    }

    return { addToCart, loading, cartItems, cartItemsCount}
})