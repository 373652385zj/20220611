<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-13 16:32:08
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-07-01 14:49:42
 * @FilePath: /person/20220611/src/views/Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home">
    <h3 style="text-align: center">个人页面，请勿乱点！</h3>
  </div>
</template>

<script>
import { isLogin, logout } from "@/api/user.js";
export default {
  components: {},
  mounted() {},
  methods: {
    resetCookie() {
      isLogin();
    },
    logoutHandle() {
      logout(this.$store.state.userInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  padding: 10px;
}
</style>
