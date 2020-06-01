<template>
  <div id="loginBox" class="h-full flex items-center justify-center">
    <div class="login-container">
      <div class="login-title ">SAPI发布系统</div>
      <div class="login-main flex">
        <div class="login-img"></div>
        <el-form class="loginForm login-form" ref="loginForm" :model="loginForm">
          <div class="login-form-title">登录</div>
          <el-form-item prop="name">
            <el-input v-model="loginForm.user_name" size="small" @keyup.enter.native="loginSub" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.user_pwd" size="small" @keyup.enter.native="loginSub" placeholder="密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-button" type="primary" @click="loginSub">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        user_name: '',
        user_pwd: ''
      }
    }
  },
  methods: {
    loginSub () {
      if (this.loginForm.user_name === 'admin' && this.loginForm.user_pwd === 'admin') {
        this.$router.push({ path: '/indexPage' })
      } else {
        this.$message({
          type: 'error',
          message: '用户名或密码不能为空'
        })
      }
      // this.$http({
      //   url: this.$http.adornUrl('/sys/login'),
      //   method: 'post',
      //   data: this.$http.adornData({
      //     'username': this.dataForm.userName,
      //     'password': this.dataForm.password,
      //     'uuid': this.dataForm.uuid,
      //     'captcha': this.dataForm.captcha
      //   })
      // }).then(({ data }) => {
      //   if (data && data.code === 0) {
      //     this.$cookie.set('token', data.token)
      //     this.$router.replace({ name: 'indexPage' })
      //     // this.$message.success("登录成功")
      //   } else {
      //     // this.getCaptcha()
      //     this.$message.error(data.msg)
      //   }
      // })
    }
  }
}
</script>

<style  lang="scss" scoped>
#loginBox {
  background: #477de9 url(../assets/image/login-bg.png) no-repeat;
  background-size: cover;
  min-width: 1180px;
  min-height: 650px;
  height: 100%;
  .login-container {
    width: 912px;
    height: 465px;
    .login-title {
      color: #fff;
      text-align: center;
      font-size: 32px;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }
    .login-main {
      background: rgba(13, 40, 66, 0.38);
      display: flex;
    }
    .login-img {
      width: 460px;
      height: 406px;
      max-width: 100%;
      background: url(../assets/image/login-left.png) no-repeat;
      background-size: cover;
    }
    .login-form {
      display: flex;
      flex-direction: column;
      color: #fff;
      padding: 45px 73px 23px 73px;
      box-shadow: 0 2px 26px 6px rgba(0, 0, 0, 0.15);
      .login-form-title {
        text-align: center;
        font-size: 1.4285714286rem;
        margin-bottom: 35px;
      }
      /deep/ .el-input__inner {
        border-width: 1px;
        border-radius: 9999px;
        padding: 0 30px 0 45px;
        width: 100%;
        height: 42px;
        border-color: rgba(255, 255, 255, 0.5);
        background-color: transparent;
        color: #fff;
        margin-bottom: 10px;
      }
      /deep/ .el-input__prefix {
        height: 42px;
        color: #c0c4cc;
        position: absolute;
        left: 15px;
        top: 0;
        line-height: 46px;
        .el-input__icon {
          font-size: 20px;
          opacity: 0.5;
        }
      }
      .login-button {
        background-color: #477de9;
        color: #fff;
        line-height: 1;
        margin-top: 35px;
        height: 42px;
        border-radius: 21px;
        width: 100%;
      }
    }
  }
}

.items-center {
  align-items: center;
}
.flex {
  display: flex;
}
.h-full {
  height: 100%;
}
.justify-center {
  justify-content: center;
}
</style>
