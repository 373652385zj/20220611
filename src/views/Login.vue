<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-13 16:32:08
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-07-01 15:27:02
 * @FilePath: /person/20220611/src/views/Login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="login">
    <div class="form">
      <h1 class="title">Login</h1>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit-btns">
            <el-button type="primary" @click="loginSubmit('loginForm')">
              登录
            </el-button>
            <el-button type="primary" @click="$router.push('/register')">
              去注册
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user.js";
export default {
  data() {
    return {
      loginForm: {
        phone: "15105958774",
        password: "123456",
      },
      loginRules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    loginSubmit(formName) {
      console.log("form", this.loginForm, this.$refs[formName]);
      const params = {
        phone: this.loginForm.phone,
        password: this.loginForm.password,
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(params).then((res) => {
            console.log("login", res);
            this.$message(res.data.message);
            console.log(this.$message);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  .form {
    width: 500px;
    height: 500px;
    margin: 0 auto;
    .title {
      text-align: center;
    }
  }
}
</style>
