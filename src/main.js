/*
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-13 16:32:08
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-06-24 16:48:43
 * @FilePath: /person/20220611/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import { Form, FormItem, Button, Select, Input, Message } from "element-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "@/assets/styles/common.less";

Vue.config.productionTip = false;

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Select);
Vue.use(Input);
Vue.use(Message);
Vue.prototype.$message = Message;

Vue.prototype.$axios = axios.create({
  baseURL: "/",
  timeout: 6000,
  withCredentials: true, // 跨域请求时发送Cookie
});

let $vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

export default $vue;
