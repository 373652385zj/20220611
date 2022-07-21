<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-07-12 09:15:19
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-07-20 20:30:00
 * @FilePath: /20220611/src/views/function/imageList/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="image-folder" @click="rightClickDialogShow = false">
    <div class="left-tree">
      <el-tree
        :data="treeData"
        node-key="id"
        :draggable="draggable"
        :default-expanded-keys="defaultExpandedKeys"
        @node-click="handleClick"
        @node-contextmenu="handleContextmenu"
      >
      </el-tree>
      <div
        class="right-click-Dialog"
        :style="`
          display: ${rightClickDialogShow ? 'block' : 'none'};
          top: ${rightClickDialogTop};
          left: ${rightClickDialogLeft}
        `"
      >
        <ul class="right-click-content-ul">
          <li @click="openImagesNumDialog">图片数量设置</li>
          <li>占位符1</li>
          <li>占位符2</li>
          <li>占位符3</li>
        </ul>
      </div>
      <el-dialog
        title="操作"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="right-pic-show">
      <div class="top-block">
        <el-carousel
          ref="carouselBlock"
          class="carousel-block"
          :autoplay="false"
          :interval="0"
        >
          <el-carousel-item v-for="(item, index) in imgViewList" :key="index">
            <div class="view-block">
              <!-- <img class="img-view" :src="item.src" alt="" srcset=""> -->
              <el-image
                class="img-view"
                :src="httpPath + item.src"
                :preview-src-list="[httpPath + item.previewSrcList]"
              >
              </el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="bottom-block">
        <div class="img-list-block">
          <div
            class="img-view-block"
            v-for="(item, index) in imgViewList"
            :key="index"
            @click="$refs.carouselBlock.setActiveItem(index)"
          >
            <!-- @click="imgViewHandle(index)" -->
            <img class="img-view" :src="httpPath + item.src" alt="" srcset="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgList from "@/utils/images.json";
export default {
  data() {
    return {
      httpPath: "http://localhost:8066/",
      // 树形目录
      treeData: [],
      draggable: false, // 拖拽
      defaultExpandedKeys: [],
      // 右键浮窗
      rightClickDialogShow: false,
      rightClickDialogTop: "",
      rightClickDialogLeft: "",
      // 设置图片数量弹窗
      dialogVisible: false,
      // 走马灯
      initialIndex: 0,
      imgViewList: [],
      imagesSum: 10, // 每页几张图片
      imagesSumSelects: [
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 30, label: "30" },
        { value: 40, label: "40" },
      ],
    };
  },
  async mounted() {
    this.init();
  },
  methods: {
    init() {
      this.setTreeData();
      this.query(1);
    },
    imagesSumChange(val) {
      this.imagesSum = val;
      this.init();
    },
    setTreeData() {
      this.treeData = [
        {
          id: 0,
          label: "汉口江滩",
          children: [],
        },
      ];
      var l = 0;
      if (
        imgList.length / this.imagesSum >
        parseInt(imgList.length / this.imagesSum)
      ) {
        l = parseInt(imgList.length / this.imagesSum) + 1;
      } else {
        l = parseInt(imgList.length / this.imagesSum);
      }
      for (let i = 0; i < l; i++) {
        this.treeData[0].children.push({
          id: i + 1,
          label: `第${i + 1}页`,
        });
      }
    },
    async query(id) {
      let list = [];
      await imgList.map((item, index) => {
        if (
          index > id * this.imagesSum - this.imagesSum &&
          index <= id * this.imagesSum
        ) {
          list.push({
            src: item,
            previewSrcList: "originImages/" + item.split("/")[1],
          });
        }
      });
      this.imgViewList = list;
      console.log(this.imgViewList);
    },
    openImagesNumDialog() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      done();
    },
    handleClick(data) {
      if (this.rightClickDialogShow) {
        this.rightClickDialogShow = false;
        return;
      }
      console.log("左键");
      console.log(data);
      this.query(data.id);
    },
    handleContextmenu(ev, data) {
      console.log("右键");
      console.log(ev, data);
      if (data.id === 0) {
        this.rightClickDialogShow = true;
        this.rightClickDialogLeft = ev.clientX + "px";
        this.rightClickDialogTop = ev.clientY + "px";
        console.log(this.rightClickDialogTop, this.rightClickDialogLeft);
      } else {
        this.rightClickDialogShow = false;
      }
    },
    imgViewHandle(index) {
      console.log(index);
      this.initialIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
.image-folder {
  display: flex;
  height: 100%;
  .left-tree {
    width: 20%;
    height: 100%;
    border-right: 1px solid #545c64;
    .right-click-Dialog {
      height: 200px;
      position: fixed;
      top: 0;
      left: 30px;
      background: white;
      box-shadow: 7px 7px 12px 2px #545c64;
      z-index: 99;
      .right-click-content-ul {
        padding: 10px;
        margin: 0;
        list-style: none;
        li {
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
      }
    }
  }
  .right-pic-show {
    width: 80%;
    height: 100%;
    .top-block {
      height: 60%;
      background: black;
      /deep/ .carousel-block {
        height: 100%;
        .el-carousel__container {
          height: 100%;
          .view-block {
            width: 100%;
            height: 100%;
            text-align: center;
            .img-view {
              height: 100%;
            }
          }
        }
        .el-carousel__indicators {
          display: none;
        }
      }
    }
    .bottom-block {
      height: 40%;
      padding: 10px;
      box-sizing: border-box;
      .img-list-block {
        width: 100%;
        height: 100%;
        overflow: scroll;
        display: flex;
        flex-wrap: wrap;
        .img-view-block {
          width: 20%;
          margin-right: 5%;
          .img-view {
            width: 100%;
          }
          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }
    }
  }

  // .el-carousel__item h3 {
  //   color: #475669;
  //   font-size: 14px;
  //   opacity: 0.75;
  //   line-height: 150px;
  //   margin: 0;
  // }

  // .el-carousel__item:nth-child(2n) {
  //    background-color: #99a9bf;
  // }
  
  // .el-carousel__item:nth-child(2n+1) {
  //    background-color: #d3dce6;
  // }
}
</style>
