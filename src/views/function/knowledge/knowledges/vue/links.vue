<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-30 11:50:15
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-06-30 14:26:37
 * @FilePath: /20220611/src/views/function/knowledge/knowledges/node/links.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="links">
    <h1>相关知识链接</h1>
    <div v-for="(item, index) in linkList" :key="index">
      <h3>{{ index + 1 }}、{{ item.name }}：</h3>
      <a :href="item.href">{{ item.href }}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkList: [
        {
          name: "vue官网",
          href: "https://cn.vuejs.org/",
        },
      ],
    };
  },
};
</script>
