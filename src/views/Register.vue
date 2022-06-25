<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-14 11:33:16
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-06-25 10:39:48
 * @FilePath: /person/20220611/src/views/Register.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="register">
    <div class="form">
      <h1>Register</h1>
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="校验码" prop="code">
          <el-input v-model="registerForm.code"></el-input>
          <!-- <el-button
            class="send-btn"
            :disabled="sendDisable"
            @click="sendCodeCountDown"
          >
            {{ sendCodeText }}
          </el-button> -->
        </el-form-item>
        <el-form-item>
          <div class="submit-btns">
            <el-button type="primary" @click="register('registerForm')">
              注册
            </el-button>
            <el-button type="primary" @click="$router.push('/')">
              去登录
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { register } from "@/api/user.js";
export default {
  data() {
    // 校验用户名
    const validatorName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      // 校验 TODO
      if (value.length < 2) {
        return callback(new Error("用户名至少两位"));
      }
      return callback();
    };
    // 校验密码
    const validatorPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      }
      // 校验 TODO
      if (value.length < 6) {
        return callback(new Error("密码至少位6位"));
      }
      return callback();
    };
    // 校验手机号
    const validatorMobileNo = (rule, value, callback) => {
      const regMob = /^1[1-9][0-9]{9}$/;
      if (!value) {
        return callback(new Error("请输入手机号"));
      }
      // 校验 TODO
      if (value && !regMob.test(value)) {
        return callback(new Error("手机号格式不正确"));
      }
      return callback();
    };
    // 校验校验码
    const validatorCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入校验码"));
      }
      // 校验 TODO
      if (value.length !== 5) {
        return callback(new Error("校验码为5位字母"));
      }
      return callback();
    };
    return {
      registerForm: {
        name: "李四",
        password: "123456",
        phone: "15105959877",
        code: "",
      },
      registerRules: {
        name: [{ required: true, validator: validatorName, trigger: "blur" }],
        password: [
          { required: true, validator: validatorPassword, trigger: "blur" },
        ],
        phone: [
          { required: true, validator: validatorMobileNo, trigger: "blur" },
        ],
        code: [{ required: true, validator: validatorCode, trigger: "blur" }],
      },
      sendSecond: 5,
      sendCodeText: "发送验证码",
      sendDisable: false,
    };
  },
  methods: {
    register(formName) {
      console.log("form", this.registerForm, this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.registerForm).then((res) => {
            console.log("register", res);
            this.$message(res.data.message);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 发送验证码
    sendCodeCountDown() {
      console.log("发送验证码！倒计时!");
      this.sendDisable = true;
      const originSendSecond = this.sendSecond;
      const originSendCodeText = this.sendCodeText;
      this.sendCodeText = `${this.sendSecond}秒后可重发`;
      let intervalTime = setInterval(() => {
        console.log(this.sendSecond);
        if (this.sendSecond <= "0") {
          this.sendSecond = originSendSecond;
          this.sendCodeText = originSendCodeText;
          this.sendDisable = false;
          clearInterval(intervalTime);
          return;
        }
        this.sendSecond--;
        this.sendCodeText = `${this.sendSecond}秒后可重发`;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  .form {
    width: 500px;
    height: 500px;
    margin: 0 auto;
  }
}
</style>
