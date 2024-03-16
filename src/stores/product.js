import { defineStore } from "pinia";
import axios from "axios";
import { reactive, ref } from "vue";
import axiosInstance from "@/services/axiosService";


export const useProduct = defineStore("product", () => {

    const products = ref({})
    const sale = ref({})
    const popular = ref({})
    const newProduct = ref({})
    const winter = ref({})
    const feature = ref({})
    const loading = ref(false)

    async function getProducts(type = "") {
        try {
 
            let res = await axiosInstance.get("/products?conditions="+type)

            if(res.status === 200){
                if(type == 'sale'){
                    sale.value = res.data
                }
                else if(type == 'popular'){
                    popular.value = res.data
                }
                else if(type == 'winter'){
                    winter.value = res.data
                }
                else if(type == 'new'){
                    newProduct.value = res.data
                }
                else if(type == 'feature'){
                    feature.value = res.data
                }
                else{
                    products.value = res.data
                }

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

    return { getProducts, loading, products, sale, popular, newProduct, winter, feature}
})