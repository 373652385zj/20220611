<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-13 16:32:08
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-06-24 16:20:02
 * @FilePath: /person/20220611/src/views/Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home">
    <h1>首页</h1>
    <el-button @click="resetCookie">reset cookies</el-button>
    <el-button @click="logout">logout</el-button>
  </div>
</template>

<script>
import { isLogin, logout } from "@/api/user.js";
export default {
  mounted() {
    console.log(111);
    this.$nextTick(() => {
      isLogin();
    });
  },
  methods: {
    resetCookie() {
      isLogin();
    },
    logout() {
      console.log(this.$store.state);
      logout(this.$store.state.userInfo);
    },
  },
};
</script>
