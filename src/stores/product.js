import { defineStore } from "pinia";
import axios from "axios";
import { reactive, ref } from "vue";
import axiosInstance from "@/services/axiosService";


export const useProduct = defineStore("product", () => {

    const products = ref({})
    const loading = ref(false)

    async function getProducts() {
        try {
 
            let res = await axiosInstance.get("/products")

            if(res.status === 200){
                products.value = res.data
                return new Promise((resolve) => {
                    resolve(res.data)
                })
            }
        } catch (error) {
            if(error.response.data){
                console.log(error.response.data)
            }
            
        }

        
    };

    return { getProducts, loading, products}
})