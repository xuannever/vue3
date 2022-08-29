<template>
  <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <el-input
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width:100%;"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span><br>
        </el-button>
        <el-button @click="remove()">清除token</el-button>
        <!-- <el-button @click="getCode()">图片</el-button> -->
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2022 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>
<script setup>
import { getCodeImg , login} from "@/api/login" 
import Cookies from "js-cookie"
import { getToken ,removeToken } from "@/utils/auth";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import useUseStore from '@/store/modules/user'

const userStore = useUseStore()
const { reactive, getCurrentInstance }=require("vue-demi");
const { ref } = require("vue-demi")
const codeUrl = ref("");
const captchaOnOff = ref(true)
const { proxy } =getCurrentInstance();
const loading = ref(false);
const register = ref(false)
const redirect = ref(undefined)


const loginForm = ref({
    username: Cookies.get("username"),
    password: "admin123",
    rememberMe: true,
    code: "",
    uuid: ""
})

const loginRules = {
  username: [{ require: true, trigger: "blur", message: "请输入账号"}],
  password: [{ require:true, trigger:"blur", message: "请输入密码"}],
  code: [{require:true, trigger:"blur", message:"请输入验证码"}]
}

function getCode() {
  getCodeImg().then(res => {
    captchaOnOff.value = res.captchaOnOff === undefined ? true : res.captchaOnOff;
    if (captchaOnOff.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginForm.value.uuid = res.uuid;
    }
  });
}

// function handleLogin() {
//  login(loginForm.value.username,loginForm.value.password,loginForm.value.code,loginForm.value.uuid).then(res => {
// if(res.code){
//   console.log(loginForm.value)
//   Cookies.set("username", loginForm.value.username)
//   Cookies.set("Admin-Token", res.token)
// }
//  })
// }

function handleLogin() {
  proxy.$refs.loginRef.validate(valid => {
      if (valid) {
        loading.value = true;
        if(loginForm.value.rememberMe) {
          Cookies.set("username", loginForm.value.username, { expires: 30});
          Cookies.set("password",encrypt(loginForm.value.password), { expires: 30});
          Cookies.set("rememberMe", loginForm.value.rememberMe, {expires: 30});
        } else {
          Cookies.remove("username");
          Cookies.remove("password");
          Cookies.remove("rememberMe");
        }
        userStore.login(loginForm.value).then(() => {
          router.push({path :redirect.value || "/"});
        }).catch(() => {
          loading.value = false;
          if(captchaOnOff.value){
            getCode();
          }
        })
      }
  })
}

function getCookie(){
  const username = Cookies.get("username");
  const password = Cookies.get("password");
  const rememberMe = Cookies.get("rememberMe");
  loginForm.value = {
    username : username === undefined ? loginForm.username : username,
    password : password === undefined ? loginForm.password : decrypt(password),
    rememberMe : rememberMe === undefined ? false : Boolean(rememberMe)
  }
}

function remove(){
  Cookies.remove("username")
}
getCode();
// getCookie();
</script>
<style lang='scss' scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%!important;
  height: 100%!important;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
  background-attachment: fixed;
  position: absolute;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
