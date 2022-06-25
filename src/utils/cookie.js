/*
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-18 15:18:16
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-06-18 15:18:25
 * @FilePath: /person/20220611/src/utils/cookie.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  setCookie(cname, cvalue, exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return null;
  },
  removeCookie(cname){
    this.setCookie(cname, '', -1);
  }
}