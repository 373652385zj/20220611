<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-28 19:14:45
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-06-30 14:23:11
 * @FilePath: /20220611/src/views/function/knowledge/components/menus.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="menus">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu
        v-for="(item, index) in menusList"
        :key="index"
        :index="`${index + 1}`"
      >
        <template slot="title">
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(item2, index2) in item.children"
            :key="index2"
            :index="`${index + 1}-${index2 + 1}`"
            @click="menusHandle(item2)"
            >{{ item2.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menusList: [
        {
          name: "node",
          children: [
            { name: "链接", path: "/node/links" },
            { name: "简介", path: "/node/introduction" },
          ],
        },
        {
          name: "nvm",
          children: [
            { name: "链接", path: "/nvm/links" },
            { name: "简介", path: "/nvm/introduction" },
          ],
        },
        {
          name: "vue",
          children: [
            { name: "链接", path: "/vue/links" },
            { name: "简介", path: "/vue/introduction" },
          ],
        },
        {
          name: "express",
          children: [
            { name: "链接", path: "/express/links" },
            { name: "简介", path: "/express/introduction" },
          ],
        },
      ],
    };
  },
  methods: {
    menusHandle(item) {
      this.$router.push({ path: item.path });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.menus {
  width: 200px;
  height: 100%;
  overflow-y: scroll;
  /deep/ .el-menu-vertical-demo {
    height: 100%;
  }
}
</style>
