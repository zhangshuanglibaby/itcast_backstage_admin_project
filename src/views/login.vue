//这是登录页面的当文件组件
<template>
  <div class="login">
    <div class="container">
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <img src="../assets/timg (2).jpg" alt="" class="avatar">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon='myicon myicon-user'></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon='myicon myicon-key'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="onlogin('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 引入接口请求
import { login } from '@/api/login.js'
export default {
  data () {
    return {
      // 数据对象需要与数据库的名称一样,后续传参需要使用
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // required是必须的,message是提示信息,tigger是触发类型
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onlogin (formName) {
      // 在点击登录的时候,实现2次验证表单数据是否填写正确--参数是数据对象
      this.$refs[formName].validate(valid => {
        // 如果填写格式正确则会返回true
        if (valid) {
          // 发送验证请求--参数是数据对象
          login(this.loginForm)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 200) {
                // 在登录成功的时候,设置状态保持,跳转页面
                localStorage.setItem('itcast_admin_token', res.data.data.token)
                this.$router.push({ name: 'home' })
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          // 提示信息
          this.$message.warning('请填写所必须的信息')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('../assets/timg (1).jpg');
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: rgba(0, 0, 0, .6);
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      margin-bottom: 20px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
