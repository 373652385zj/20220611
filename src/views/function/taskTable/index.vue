<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-30 14:36:05
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-07-06 14:33:54
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
        <div
          v-if="!dateIsDisabled(data)"
          class="date-item"
          :class="{ 'is-selected': data.isSelected }"
        >
          <div class="item">
            {{ data.day.split("-").slice(1).join("-") }}
            {{ data.isSelected ? "✔️" : "" }}
            <div class="absolute-block right-bottom">
              <span
                class="symbol"
                :class="{
                  'symbol-color': dateTaskMount[data.day] ? true : false,
                }"
                @click="openTestDialog(data)"
              >
                <i class="el-icon-document"></i>
                {{ dateTaskMount[data.day] ? dateTaskMount[data.day] : 0 }}
              </span>
            </div>
            <!-- <div class="absolute-block right-middle">
              <span class="symbol">
                <i class="el-icon-chat-dot-square"></i>
                1
              </span>
            </div> -->
          </div>
        </div>
        <div v-else class="date-item disabled">
          <div class="item">
            {{ data.day.split("-").slice(1).join("-") }}
          </div>
        </div>
      </template>
    </el-calendar>
    <!-- 任务列表的弹框 -->
    <el-dialog title="任务列表" :visible.sync="dialogTaskTableVisible">
      <el-empty v-if="!taskTableData.length" description="暂无任务"></el-empty>
      <el-table v-else :data="taskTableData" style="width: 100%">
        <el-table-column property="task" label="任务内容"></el-table-column>
        <el-table-column
          property="periodOfTime"
          label="时间段"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editTask(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="delTaskItemQuery(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTaskTableVisible = false">返 回</el-button>
        <el-button type="primary" @click="addTask">新 增</el-button>
      </div>
    </el-dialog>
    <!-- 编辑任务的弹框 -->
    <el-dialog
      :title="method === 'edit' ? '编辑任务' : '新增任务'"
      :visible.sync="dialogEditFormVisible"
    >
      <el-form
        ref="editOrAddForm"
        :model="editOrAddForm"
        :rules="editOrAddRules"
        label-width="80px"
      >
        <el-form-item label="任务内容" prop="task">
          <el-input
            v-model="editOrAddForm.task"
            style="width: 350px"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间段" prop="periodOfTime">
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
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTaskList,
  editTaskItem,
  addTaskItem,
  delTaskItem,
  getTaskDateList,
} from "@/api/task.js";
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
      editOrAddRules: {
        task: [{ required: true, message: "请输入任务内容", trigger: "blur" }],
        periodOfTime: [
          { required: true, message: "请选择时间段", trigger: "blur" },
        ],
      },
      periodOfTimePicker: [new Date(), new Date()],
      dialogEditFormVisible: false,
      dateTaskMount: {},
    };
  },
  watch: {
    "$store.state.userInfo.phone": {
      handler(nval, oval) {
        console.log(nval, oval);
        nval && this.getTaskDateListQuery();
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.getTaskDateListQuery();
  },
  methods: {
    dateIsDisabled(data) {
      let now = new Date();
      let y = now.getFullYear();
      let m = now.getMonth() + 1;
      let d = now.getDate();
      return (
        new Date(data.day).getTime() <= new Date(`${y}-${m}-${d}`).getTime()
      );
    },
    // 获取当前所有存在任务的日期
    getTaskDateListQuery() {
      this.$store.state.userInfo.phone &&
        getTaskDateList({ phone: this.$store.state.userInfo.phone }).then(
          (res) => {
            let dates = [];
            res.data.data.map((item) => {
              dates.push(item.date);
            });
            let dateList = Array.from(new Set(dates));
            this.dateTaskMount = [];
            dateList.map((item) => {
              this.$set(this.dateTaskMount, item, this.ItemMounted(dates, item));
            });
            console.log("dateTaskMount", this.dateTaskMount);
          }
        );
    },
    // 某元素在数组中的数量
    ItemMounted(arr, ele) {
      var temp = [];
      for (var index = 0; index < arr.length; index++) {
        if (arr[index] == ele) {
          temp.push(true);
        }
      }
      return temp.length;
    },
    // 获取任务列表
    getTaskListQuery() {
      getTaskList({
        phone: this.$store.state.userInfo.phone,
        date: this.activeDate,
      }).then((res) => {
        this.taskTableData = res.data.data;
        this.getTaskDateListQuery();
      });
    },
    submit() {
      this.$refs["editOrAddForm"].validate((valid) => {
        if (!this.$store.state.userInfo.phone) {
          this.$message("电话号码不存在");
          return;
        }
        if (!this.activeDate) {
          this.$message("当前日期不存在");
          return;
        }
        if (valid) {
          if (this.method === "edit") {
            this.editTaskItemQuery();
          } else {
            this.addTaskItemQuery();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑任务请求
    async editTaskItemQuery() {
      console.log("editTaskItemQuery", this.editOrAddForm);
      await editTaskItem(this.editOrAddForm);
      this.dialogEditFormVisible = false;
      this.getTaskListQuery();
    },
    // 添加任务请求
    async addTaskItemQuery() {
      this.editOrAddForm.phone = this.$store.state.userInfo.phone;
      this.editOrAddForm.date = this.activeDate;
      console.log("addTaskItemQuery", this.editOrAddForm);
      await addTaskItem(this.editOrAddForm);
      this.dialogEditFormVisible = false;
      this.getTaskListQuery();
    },
    // 删除任务请求
    async delTaskItemQuery(item) {
      console.log("addTaskItemQuery", this.editOrAddForm);
      await delTaskItem({ id: item.id });
      this.getTaskListQuery();
    },
    // 时间修改触发
    changePeriodOfTime(val) {
      this.editOrAddForm.periodOfTime = val[0] + "-" + val[1];
    },
    // 任务弹窗
    openTestDialog(data) {
      if (this.dateIsDisabled(data)) {
        this.$message("该时间已过期");
        return;
      }
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
      this.periodOfTimePicker = [new Date(), new Date()];
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
    &.disabled {
      cursor: not-allowed;
      .item {
        color: #c0c4cc;
      }
    }
    .item {
      width: 100%;
      height: 100%;
      position: relative;
      cursor: default;
      .absolute-block {
        position: absolute;
        .symbol {
          display: inline-block;
          min-width: 25px;
          padding: 0 10px;
          box-sizing: border-box;
          height: 25px;
          line-height: 25px;
          text-align: center;
          color: white;
          background: #2c3e50;
          margin-left: 2px;
          cursor: pointer;
        }
        .symbol-color {
          background: red;
        }
      }
      .right-bottom {
        right: -8px;
        bottom: -8px;
      }
      .right-middle {
        right: -8px;
        top: 50%;
        margin-top: -12.5px;
      }
    }
  }
}
</style>
