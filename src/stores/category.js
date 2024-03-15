import { defineStore } from "pinia";
import axios from "axios";
import { reactive, ref } from "vue";
import axiosInstance from "@/services/axiosService";


export const useCategory = defineStore("category", () => {

    const categories = ref({})
    const loading = ref(false)

    async function getCategories() {
        try {
 
            let res = await axiosInstance.get("/categories")

            if(res.status === 200){
                categories.value = res.data
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

    return { getCategories, loading, categories}
})