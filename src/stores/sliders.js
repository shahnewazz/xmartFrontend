import { defineStore } from "pinia";
import axios from "axios";
import { reactive, ref } from "vue";
import axiosInstance from "@/services/axiosService";


export const useSlider = defineStore("slider", () => {

    const sliders = ref({})
    const loading = ref(false)

    async function getSliders() {
        try {
 
            let res = await axiosInstance.get("/sliders")

            if(res.status === 200){
                sliders.value = res.data
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

    return { getSliders, loading, sliders}
})