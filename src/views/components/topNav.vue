<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-28 11:23:27
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-06-29 20:33:34
 * @FilePath: /20220611/src/views/components/topNav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="top-nav">
    <div class="logo-block">
      <span class="logo">logo</span>
    </div>
    <div class="menus-block">
      <menus />
    </div>
    <div class="info-block">
      <span class="text">{{ $store.state.userInfo.name }}</span>
      <span class="text">{{ $store.state.userInfo.phone }}</span>
    </div>
    <div class="other-block">
      <i class="el-icon-right" @click="openDialog"></i>
    </div>
    <el-dialog
      :title="dialog.content"
      :visible.sync="dialog.dialogVisible"
      width="30%"
      :before-close="closeDialog">
      <span>{{ dialog.content }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logoutHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import menus from './components/menus.vue'
import { logout } from "@/api/user.js";
export default {
  components: {
    menus,
  },
  data() {
    return {
      dialog: {
        dialogVisible: false,
        title: "温馨提示",
        content: "确定退出登录吗？",
      },
    };
  },
  mounted() {
    console.log(this.$store.state);
  },
  methods: {
    closeDialog() {
      this.dialog.dialogVisible = false;
    },
    openDialog() {
      this.dialog.dialogVisible = true;
    },
    logoutHandle() {
      this.dialog.dialogVisible = false;
      logout(this.$store.state.userInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.top-nav {
  display: flex;
  background: rgb(84, 92, 100);
  .logo-block {
    display: flex;
    align-items: center;
    width: 20%;
    color: white;
    font-weight: 700;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .menus-block {
    width: 50%;
  }
  .info-block {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    font-weight: 700;
    padding: 0 10px;
    box-sizing: border-box;
    .text {
      text-align: right;
    }
  }
  .other-block {
    width: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-icon-right {
      color: white;
      font-size: 30px;
    }
  }
}
</style>
