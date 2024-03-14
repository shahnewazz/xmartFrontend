import { defineStore } from "pinia";
import { ElNotification } from "element-plus";


export const useNotification = defineStore("notification", () => {

    function Success(msg){
        ElNotification({
            title: 'Success',
            message: msg,
            type: "success"
          })
    }

    function Error(msg){
        ElNotification({
            title: 'Error',
            message: msg,
            type: "error"
          })
    }

    function Warning(msg){
        ElNotification({
            title: 'Warning',
            message: msg,
            type: "warning"
          })
    }

    function Info(msg){
        ElNotification({
            title: 'Info',
            message: msg,
            type: "info"
          })
    }


    return { Success, Error, Warning, Info}
})