<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-13 16:32:08
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-06-30 17:12:12
 * @FilePath: /person/20220611/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <top-nav v-if="$store.state.isLogin"></top-nav>
    <div :class="{ 'router-view': $store.state.isLogin }">
      <router-view />
    </div>
  </div>
</template>

<script>
import TopNav from "@/views/components/topNav.vue";
import { isLogin } from "@/api/user.js";
export default {
  components: {
    TopNav,
  },
  created() {
    this.$nextTick(async () => {
      await isLogin();
    });
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .router-view {
    height: calc(100vh - 60px);
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 10px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
