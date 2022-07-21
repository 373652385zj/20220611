/*
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-13 16:32:08
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-07-20 18:14:47
 * @FilePath: /person/20220611/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import {
  Form,
  FormItem,
  Button,
  Select,
  Option,
  Input,
  Message,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Table,
  TableColumn,
  Dialog,
  Calendar,
  Empty,
  TimePicker,
  ButtonGroup,
  Image,
  Transfer,
  Tree,
  Carousel,
  CarouselItem,
} from "element-ui";
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
Vue.use(Option);
Vue.use(Input);
Vue.use(Message);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Calendar);
Vue.use(Empty);
Vue.use(TimePicker);
Vue.use(ButtonGroup);
Vue.use(Image);
Vue.use(Transfer);
Vue.use(Tree);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.prototype.$message = Message;
Vue.prototype.$Dialog = Dialog;

Vue.prototype.$axios = axios.create({
  baseURL: "/",
  timeout: 6000,
  withCredentials: true, // 跨域请求时发送Cookie
});

console.log('process1', process.env.VUE_APP_BASE_API);
axios
  .get(process.env.VUE_APP_BASE_API + "test", {})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
    console.log(err);
  });

let $vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

export default $vue;
