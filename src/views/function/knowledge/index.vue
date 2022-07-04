<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-28 19:10:48
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-06-29 21:04:06
 * @FilePath: /20220611/src/views/function/knowledge/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="knowLedge">
    <menus />
    <div class="menus-router">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menus from './components/menus.vue'
export default {
  components: {
    menus,
  },
};
</script>

<style lang="less" scoped>
.knowLedge {
  display: flex;
  height: 100%;
  .menus-router {
    width: calc(100vw - 200px);
    padding: 10px;
  }
}
</style>
