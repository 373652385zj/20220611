<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-28 15:12:09
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-06-29 17:52:05
 * @FilePath: /20220611/src/views/home/userManage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="table-block user-manage">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="refreshList">刷新列表</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="序号"> </el-table-column>
      <el-table-column prop="role" label="身份"> </el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getIdentifyList } from "@/api/user.js";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.refreshList();
  },
  methods: {
    refreshList() {
      getIdentifyList().then((res) => {
        this.tableData = res.data.data;
      });
    },
    editHandle(row) {
      console.log(row);
    },
  },
};
</script>

<style lang="less" scoped>
.user-manage {
  padding: 10px;
}
</style>
