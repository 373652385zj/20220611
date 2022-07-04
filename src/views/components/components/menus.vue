<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-27 14:54:55
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-07-01 15:44:22
 * @FilePath: /20220611/src/views/components/menus.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="menus">
    <el-menu
      default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <div class="menus-block">
        <div v-for="(item, index) in menusList" :key="index">
          <el-menu-item
            v-if="!item.children"
            :index="item.id"
            @click="menusHandle(item)"
            >{{ item.name }}</el-menu-item
          >
          <el-submenu v-else :index="item.id">
            <template slot="title">{{ item.name }}</template>
            <el-menu-item
              v-for="(item2, index2) in item.children"
              :key="index2"
              :index="`${index + 1}-${index2 + 1}`"
              @click="menusHandle(item2)"
              >{{ item2.name }}</el-menu-item
            >
          </el-submenu>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      activeIndex: "1",
      menusList: [
        // {
        //   name: "首页",
        //   path: "/home",
        // },
      ],
    };
  },
  mounted() {
    this.menusList = [
      {
        id: "1",
        name: "首页",
        path: "/home",
      },
      this.$store.state.userInfo.role === "root" && {
        id: "2",
        name: "管理",
        children: [
          { name: "用户身份列表", path: "/identify" },
          { name: "推荐码", path: "/validCode" },
          { name: "用户列表", path: "/userManage" },
        ],
      },
      {
        id: "3",
        name: "知识",
        path: "/knowledge",
      },
      {
        id: "4",
        name: "个人",
        children: [
          { name: "任务列表", path: "/taskTable" },
        ],
      },
    ];
    // const hash = location.hash.split('/')[1]
    // this.menusList.map((item) => {
    //   if (JSON.stringify(item).indexOf(hash) > -1) {
    //     this.activeIndex = item.id;
    //   }
    // });
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit("handleSelect", key, keyPath);
    },
    menusHandle(item) {
      this.$router.push({ path: item.path });
    },
  },
};
</script>

<style lang="less" scoped>
.menus {
  width: 100%;
  /deep/ .el-menu.el-menu--horizontal {
    border: 0;
    .menus-block {
      display: flex;
      .el-submenu {
        width: 85px;
      }
    }
  }
}
</style>
