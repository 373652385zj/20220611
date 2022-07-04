/*
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-07-01 16:54:02
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-07-01 16:54:44
 * @FilePath: /20220611/src/api/tesk.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import _this from "../main.js";
// 获取任务列表
export function getTaskList(query) {
  return new Promise((resolve, reject) => {
    _this.$axios
      .post("/api/getTaskList", query)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
// 修改任务
export function editTaskItem(query) {
  return new Promise((resolve, reject) => {
    _this.$axios
      .post("/api/editTask", query)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
// 新增任务
export function addTaskItem(query) {
  return new Promise((resolve, reject) => {
    _this.$axios
      .post("/api/addTask", query)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
