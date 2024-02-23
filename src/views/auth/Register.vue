<script setup>
import { reactive, ref } from 'vue';
import { useAuth } from '@/stores/auth';
import {storeToRefs} from "pinia"
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus'
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required(),
  password: yup.string().required().min(4),
  password_confirmation: yup.string().required().min(4).oneOf([yup.ref("password"), null], "Password dose not match"),
});

const router = useRouter()

const auth = useAuth();
const {user} = storeToRefs(auth);

const form = reactive({
  phone : '',
  password : ''
});

const onSubmit = async(values, {setErrors}) => {
  let response = await auth.register(form)
  if(response.data){
    sendOTP.value = true
    ElNotification({
      title: 'Success',
      message: "Redirecting to Home Page",
      type: "success"
    })

  }else{
    setErrors(response)
  }
}

const showPassword = ref(false)

function togglePassword(){
  showPassword.value = !showPassword.value
}


// otp options

const otpSchema = yup.object({
  otp_code: yup.number().required(),
});

const sendOTP = ref(false)

const otpSubmit = (values)=>{

}
</script>
 
<template>
<div>
    <section class="user-form-part">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-6">
              <div class="user-form-card">
                <div class="user-form-title">
                  <h2>Customer Register</h2>
                  <p>Use your credentials to access</p>
                </div>
               
                <div class="user-form-group" id="axiosForm" v-if="!sendOTP">
                  <Form class="user-form" @submit="onSubmit" :validation-schema="schema" v-slot="{errors, isSubmitting}">
                    
                    <div class="form-group">
                      <Field
                        type="text"
                        class="form-control"
                        placeholder="Name"
                        name="name"
                        v-model="form.name"
                        :class="{'is-invalid': errors.name}"
                      />
                      <span  class="text-danger" v-if="errors.name">{{ errors.name }}</span>
                    </div>
                    <div class="form-group">
                      <Field
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        name="email"
                        v-model="form.email"
                        :class="{'is-invalid': errors.email}"
                      />
                      <span  class="text-danger" v-if="errors.email">{{ errors.email }}</span>
                    </div>
                    <div class="form-group">
                      <Field
                        type="text"
                        class="form-control"
                        placeholder="phone no"
                        name="phone"
                        v-model="form.phone"
                        :class="{'is-invalid': errors.phone}"
                      />
                      <span  class="text-danger" v-if="errors.phone">{{ errors.phone }}</span>
                    </div>
                    <div class="form-group">
                      <Field
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control password"
                        placeholder="password"
                        name="password" 
                        v-model="form.password"
                        :class="{'is-invalid': errors.password}"
                      />
                      <span class="view-password" @click="togglePassword">
                        <i class="fas text-success fa-eye" :class="{'fa-eye-slash':showPassword, 'fa-eye': !showPassword}"></i>
                      </span>
                      
                      <span  class="text-danger" v-if="errors.password">{{ errors.password }}</span>
                    </div>
                    <div class="form-group">
                      <Field
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control password"
                        placeholder="Confrim Password"
                        name="password_confirmation" 
                        v-model="form.password_confirmation"
                        :class="{'is-invalid': errors.password_confirmation}"
                      />
                      <span class="view-password" @click="togglePassword">
                        <i class="fas text-success fa-eye" :class="{'fa-eye-slash':showPassword, 'fa-eye': !showPassword}"></i>
                      </span>
                      
                      <span  class="text-danger" v-if="errors.password_confirmation">{{ errors.password_confirmation }}</span>
                    </div>
                    <div class="form-check mb-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="check"
                        value=""
                      /><label class="form-check-label" for="check"
                        >Remember Me</label
                      >
                    </div>
                    <div class="form-button">
                      <button type="submit" :disabled="isSubmitting">
                        login
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                      </button>
                      
                      <p>
                        Forgot your password?<a
                          href="reset-password.html"
                          class=""
                          >reset here</a
                        >
                      </p>
                    </div>
                  </Form>
                </div>
               
                <div class="user-form-group" id="axiosForm" v-else>
                  <Form class="user-form" @submit="otpSubmit" :validation-schema="otpSchema" v-slot="{errors, isSubmitting}">
                    
                    <div class="form-group">
                      <Field
                        type="text"
                        class="form-control"
                        placeholder="OTP"
                        name="otp_code"
                        v-model="form.otp_code"
                        :class="{'is-invalid': errors.otp_code}"
                      />
                      <span  class="text-danger" v-if="errors.otp_code">{{ errors.otp_code }}</span>
                    </div>
 
                    <div class="form-button">
                      <button type="submit" :disabled="isSubmitting">
                        Verify OTP
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                      </button>
                      
                    </div>
                  </Form>
                </div>
              </div>
              <div class="user-form-remind">
                <p>
                  Don't have any account?
                    <router-link :to="{name:'user.register'}">Register here</router-link>
                </p>
              </div>
              <div class="user-form-footer"></div>
            </div>
          </div>
        </div>
      </section>
</div>
</template>
 
<style scoped>
 
</style>