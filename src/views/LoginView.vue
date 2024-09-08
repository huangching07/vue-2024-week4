<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

const apiUrlBase = 'https://todolist-api.hexschool.io'
const router = useRouter()

const signInFields = ref({
  email: '',
  password: ''
})

const signin = async () => {
  try {
    const res = await axios.post(`${apiUrlBase}/users/sign_in`, signInFields.value)
    alert('登入成功！')
    // 儲存Token
    document.cookie = `todoToken=${res.data.token};`
    // 進入Todo list頁面
    router.push('/todo')
  } catch (error) {
    alert(error.response.data.message)
  }
}
</script>
<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
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
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="email"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
            v-model="signInFields.email"
          />
          <!-- <span>此欄位不可留空</span> -->
          <label class="formControls_label" for="password">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="password"
            id="password"
            placeholder="請輸入密碼"
            required
            v-model="signInFields.password"
          />
          <button type="button" class="formControls_btnSubmit" @click="signin">登入</button>
          <RouterLink to="/signup" class="formControls_btnLink">註冊帳號</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>
