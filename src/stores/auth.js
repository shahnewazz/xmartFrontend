import { defineStore } from "pinia";
import axios from "axios";
import { reactive, ref } from "vue";
import axiosInstance from "@/services/axiosService";


const url = import.meta.env.VITE_API_URL;

export const useAuth = defineStore("auth", () => {

    const user = ref({})
    const loading = ref(false)

    async function login(formData) {
        try {
 
            let res = await axiosInstance.post("/user/login", formData)

            if(res.status === 200){
               
                user.value = res.data

                return new Promise((resolve) => {
                    resolve(res.data)
                })
            }
        } catch (error) {
            if(error.response.data){
                return new Promise((reject) => {
                    reject(error.response.data.errors)
                })
            }
            
        }

        
    };

    async function register(formData) {
        try {
 
            let res = await axiosInstance.post("/user/register", formData)

            if(res.status === 201){
               
                return new Promise((resolve) => {
                    resolve(res)
                })
            }
        } catch (error) {
            if(error.response.data){
                return new Promise((reject) => {
                    reject(error.response.data.errors)
                })
            }
            
        }

        
    };

    async function logout(){
        try {
            loading.value = true
            let res = await axiosInstance.post("/user/logout"); 
          
            if(res.status === 200){
                user.value = {}
                return new Promise(resolve => {
                    resolve(res)
                })
            }
        } catch (error) {
            if(error.response){
                throw error.response
            }
        }finally{
            loading.value = false
        }
    };

    return { login, user, logout, loading, register}
},
{
    persist: {
        paths: ["user"]
    },
},
)