/*
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-23 14:18:41
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-06-24 16:59:36
 * @FilePath: /20220611/src/api/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import _this from "../main.js";
// 是否登录
export function isLogin() {
  return new Promise((resolve, reject) => {
    console.log(_this, _this.$route.path);
    console.log("登录状态判断");
    _this.$axios
      .get("/isLogin")
      .then((res) => {
        console.log(res);
        resolve(res);
        // 已经登录的情况下直接进入home页面
        if (res.data.data.isLogin) {
          if (_this.$route.path !== "/home") {
            _this.$router.push({ path: "/home" });
          }
        } else {
          if (_this.$route.path !== "/") {
            _this.$router.push({ path: "/" });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
// 登录
export function login(query) {
  return new Promise((resolve, reject) => {
    _this.$axios
      .post("/login", query)
      .then((res) => {
        if (res.data.code === 666) {
          _this.$router.push({ path: "/home" });
        }
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
// 注册
export function register(query) {
  return new Promise((resolve, reject) => {
    _this.$axios
      .post("/register", query)
      .then((res) => {
        if (res.data.code === 666) {
          _this.$router.push({ path: "/" });
        }
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
// 退登
export function logout(query) {
  return new Promise((resolve, reject) => {
    _this.$axios
      .post("/logout", query)
      .then((res) => {
        resolve(res);
        if (res.data.code === 666) {
          _this.$router.push({ path: "/" });
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
