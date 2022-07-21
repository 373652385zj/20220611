/*
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-23 14:18:41
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-07-05 19:40:45
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
      .get(process.env.VUE_APP_BASE_API + "isLogin")
      .then((res) => {
        console.log(res);
        resolve(res);
        // 已经登录的情况下直接进入home页面
        _this.$store.state.isLogin = res.data.data.isLogin;
        if (!res.data.data.isLogin) {
          if (_this.$route.path !== "/") {
            _this.$router.push({ path: "/" });
          }
        } else {
          // 获取用户信息
          _this.$store.commit("setUserInfo");
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
      .post(process.env.VUE_APP_BASE_API + "login", query)
      .then((res) => {
        if (res.data.code === 666) {
          _this.$store.state.isLogin = true;
          _this.$router.push({ path: "/home" });
          _this.$store.commit("setUserInfo", res.data.data);
        }
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
// 获取当前用户信息
export function userInfo(query) {
  return new Promise((resolve, reject) => {
    _this.$axios
      .post(process.env.VUE_APP_BASE_API + "getUserInfo", query)
      .then((res) => {
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
      .post(process.env.VUE_APP_BASE_API + "register", query)
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
      .post(process.env.VUE_APP_BASE_API + "logout", query)
      .then((res) => {
        resolve(res);
        if (res.data.code === 666) {
          _this.$store.state.isLogin = false;
          _this.$store.commit("clearUserInfo");
          _this.$router.push({ path: "/" });
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
// 获取用户信息列表
export function userList(query) {
  return new Promise((resolve, reject) => {
    _this.$axios
      .post(process.env.VUE_APP_BASE_API + "userList", query)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
// 推荐码列表
export function validCodeList(query) {
  return new Promise((resolve, reject) => {
    _this.$axios
      .post(process.env.VUE_APP_BASE_API + "validCodeList", query)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
// 更新推荐码
export function updateValidCode(query) {
  return new Promise((resolve, reject) => {
    _this.$axios
      .post(process.env.VUE_APP_BASE_API + "updateValidCode", query)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
// 获取身份
export function getIdentify(query) {
  return new Promise((resolve, reject) => {
    _this.$axios
      .post(process.env.VUE_APP_BASE_API + "getIdentify", query)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
// 获取身份列表
export function getIdentifyList(query) {
  return new Promise((resolve, reject) => {
    _this.$axios
      .post(process.env.VUE_APP_BASE_API + "getIdentifyList", query)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
