<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

const apiUrlBase = 'https://todolist-api.hexschool.io'
const router = useRouter()

const signUpFields = ref({
  email: '',
  password: '',
  nickname: ''
})

const signup = async () => {
  try {
    const res = await axios.post(`${apiUrlBase}/users/sign_up`, signUpFields.value)
    alert('註冊成功！')
    router.push('/login')
  } catch (error) {
    alert(error.response.data.message)
  }
}
</script>

<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#">
          <img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="email"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
            v-model="signUpFields.email"
          />
          <label class="formControls_label" for="nickname">您的暱稱</label>
          <input
            class="formControls_input"
            type="text"
            name="nickname"
            id="nickname"
            placeholder="請輸入您的暱稱"
            v-model="signUpFields.nickname"
          />
          <label class="formControls_label" for="password">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="password"
            id="password"
            placeholder="請輸入密碼"
            required
            v-model="signUpFields.password"
          />
          <label class="formControls_label" for="confirmPassword">再次輸入密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="請再次輸入密碼"
            required
          />
          <button type="button" class="formControls_btnSubmit" @click="signup">註冊帳號</button>
          <RouterLink to="/login" class="formControls_btnLink">登入</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>
