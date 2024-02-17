import { defineStore } from "pinia";
import axios from "axios";
import { reactive, ref } from "vue";


const url = import.meta.env.VITE_API_URL;
const version = import.meta.env.VITE_API_VERSION

export const useAuth = defineStore("auth", () => {


    const user = ref({})


    async function login(formData) {
        try {
            let res = await axios.post(url + "/api/"+ version +"/user/login", formData)

            if(res.status === 200){
               
                user.value = res.data

                return new Promise((resolve) => {
                    resolve(res.data)
                })
            }
        } catch (error) {
            return new Promise((reject) => {
                reject(error.response.data.errors)
            })
            
        }

        
    }
    return { login, user}
},
{
    persist: {
        paths: ["user"]
    },
},
)