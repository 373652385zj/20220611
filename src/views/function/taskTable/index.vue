<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-30 14:36:05
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-07-04 10:12:37
 * @FilePath: /20220611/src/views/function/taskTable/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="task-table">
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{ date, data }">
        <!-- <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
        </p> -->
        <div class="date-item" :class="data.isSelected ? 'is-selected' : ''">
          <div class="item" @click="openTestDialog(data)">
            {{ data.day.split("-").slice(1).join("-") }}
            {{ data.isSelected ? "✔️" : "" }}
          </div>
        </div>
      </template>
    </el-calendar>
    <!-- 任务列表的弹框 -->
    <el-dialog title="任务列表" :visible.sync="dialogTaskTableVisible">
      <el-empty v-if="!taskTableData.length" description="暂无任务"></el-empty>
      <el-table v-else :data="taskTableData" style="width: 100%">
        <el-table-column
          property="task"
          label="任务内容"
        ></el-table-column>
        <el-table-column
          property="periodOfTime"
          label="时间段"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editTask(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTaskTableVisible = false">返 回</el-button>
        <el-button type="primary" @click="addTask"
          >新 增</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑任务的弹框 -->
    <el-dialog title="编辑任务" :visible.sync="dialogEditFormVisible">
      <el-form :model="editOrForm" label-width="80px">
        <el-form-item label="任务内容">
          <el-input v-model="editOrAddForm.task" style="width: 350px"></el-input>
        </el-form-item>
        <el-form-item label="时间段">
          <el-time-picker
            is-range
            v-model="periodOfTimePicker"
            value-format="HH:mm"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            @change="changePeriodOfTime"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="method === 'edit' ? editTaskItemQuery : addTaskItemQuery"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTaskList, editTaskItem } from '@/api/task.js'
export default {
  data() {
    return {
      value: new Date(),
      activeDate: "",
      // 列表相关
      taskTableData: [
        // {
        //   task: "休息",
        //   periodOfTime: "12:00-15:00",
        // },
      ],
      dialogTaskTableVisible: false,
      method: "add",
      // 编辑相关
      editOrAddForm: {
        task: "", // 任务内容
        periodOfTime: "", // 时间段
      },
      periodOfTimePicker: [],
      dialogEditFormVisible: false,
    };
  },
  methods: {
    // 获取任务列表
    getTaskListQuery() {
      getTaskList({
        phone: this.$store.state.userInfo.phone,
        date: this.activeDate,
      }).then((res) => {
        this.taskTableData = res.data.data;
      });
    },
    // 编辑任务请求
    async editTaskItemQuery() {
      console.log(this.editOrAddForm);
      await editTaskItem(this.editOrAddForm);
      this.dialogEditFormVisible = false;
    },
    // 添加任务请求
    async addTaskItemQuery() {
      console.log(this.editOrAddForm);
      // await addTaskItem(this.editOrAddForm);
      // this.dialogEditFormVisible = false;
    },
    // 时间修改触发
    changePeriodOfTime(val) {
      this.editOrAddForm.periodOfTime = val[0] + "-" + val[1];
    },
    // 任务弹窗
    openTestDialog(data) {
      console.log("openTestDialog", data);
      this.activeDate = data.day;
      this.dialogTaskTableVisible = true;
      this.getTaskListQuery();
    },
    // 任务编辑弹窗
    editTask(item) {
      this.method = "edit";
      console.log("editTask", item);
      this.editOrAddForm = item;
      this.periodOfTimePicker = [
        new Date(`${item.date} ${item.periodOfTime.split("-")[0]}`),
        new Date(`${item.date} ${item.periodOfTime.split("-")[1]}`),
      ];
      this.dialogEditFormVisible = true;
    },
    // 任务添加弹窗
    addTask() {
      this.method = "add";
      this.editOrAddForm = {
        task: "", // 任务内容
        periodOfTime: "", // 时间段
      };
      this.periodOfTimePicker = [];
      this.dialogEditFormVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.task-table {
  .date-item {
    width: 100%;
    height: 100%;
    .item {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
