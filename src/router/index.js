/*
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-13 16:32:08
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-06-30 14:42:40
 * @FilePath: /person/20220611/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "登录",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login,
  },
  {
    path: "/register",
    name: "注册",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/home",
    name: "首页",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/identify",
    name: "用户身份管理",
    component: () => import("../views/function/manage/identify.vue"),
  },
  {
    path: "/userManage",
    name: "用户管理",
    component: () => import("../views/function/manage/userManage.vue"),
  },
  {
    path: "/validCode",
    name: "校验码管理",
    component: () => import("../views/function/manage/validCode.vue"),
  },
  {
    path: "/knowledge",
    name: "知识",
    component: () => import("../views/function/knowledge/index.vue"),
    children: [
      // ======》 node 《======
      {
        path: "/node/links",
        name: "链接",
        component: () => import("../views/function/knowledge/knowledges/node/links.vue"),
      },
      {
        path: "/node/introduction",
        name: "简介",
        component: () => import("../views/function/knowledge/knowledges/node/introduction.vue"),
      },
      // ======》 nvm 《======
      {
        path: "/nvm/links",
        name: "链接",
        component: () => import("../views/function/knowledge/knowledges/nvm/links.vue"),
      },
      {
        path: "/nvm/introduction",
        name: "简介",
        component: () => import("../views/function/knowledge/knowledges/nvm/introduction.vue"),
      },
      // ======》 vue 《======
      {
        path: "/vue/links",
        name: "链接",
        component: () => import("../views/function/knowledge/knowledges/vue/links.vue"),
      },
      {
        path: "/vue/introduction",
        name: "简介",
        component: () => import("../views/function/knowledge/knowledges/vue/introduction.vue"),
      },
      // ======》 express 《======
      {
        path: "/express/links",
        name: "链接",
        component: () => import("../views/function/knowledge/knowledges/express/links.vue"),
      },
      {
        path: "/express/introduction",
        name: "简介",
        component: () => import("../views/function/knowledge/knowledges/express/introduction.vue"),
      },
    ],
  },
  {
    path: "/taskTable",
    name: "任务列表",
    component: () => import("../views/function/taskTable/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
