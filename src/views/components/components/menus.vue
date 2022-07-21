<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-27 14:54:55
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-07-06 12:01:17
 * @FilePath: /20220611/src/views/components/menus.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="menus">
    <el-menu
      :default-active="activeIndex"
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
              :index="item2.id"
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
      frontPath: "",
    };
  },
  watch: {
    "$store.state.userInfo.role": {
      handler(nval, oval) {
        console.log(nval, oval);
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
              { id: "2-1", name: "用户身份列表", path: "/identify" },
              { id: "2-2", name: "推荐码", path: "/validCode" },
              { id: "2-3", name: "用户列表", path: "/userManage" },
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
              { id: "4-1", name: "任务列表", path: "/taskTable" },
              { id: "4-2", name: "图片列表", path: "/imageList" },
            ],
          },
        ];
        this.menusList = this.menusList.filter((item) => item !== false);
        console.log(this.menusList);
        this.menusList.map((item) => {
          if (!item.children) {
            if (this.frontPath === item.path) {
              this.activeIndex = item.id;
            }
          } else {
            item.children.map((item2) => {
              if (this.frontPath === item2.path) {
                this.activeIndex = item2.id;
              }
            });
          }
        });
        console.log("this.activeIndex", this.activeIndex);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.frontPath = location.hash.split("#")[1];
    console.log("this.frontPath", this.frontPath);
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit("handleSelect", key, keyPath);
    },
    menusHandle(item) {
      console.log(this.frontPath === item.path);
      if (this.frontPath === item.path) return;
      this.frontPath = item.path;
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
