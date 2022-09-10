<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <!-- <BreadcrumbItem>Components</BreadcrumbItem> -->
      <BreadcrumbItem>广告列表</BreadcrumbItem>
    </Breadcrumb>
    <Content :class="{ Content }">
      <div :class="{ center_box }">
        <div :class="{ form_box }">
          <Form :model="formItem" :label-width="80">
            <div :class="{ header_box }">
              <Row :gutter="16">
                <Col span="5">
                  <FormItem label="编号">
                    <Input v-model="formItem.id" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="名称">
                    <Input v-model="formItem.title" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="每页显示">
                    <Select v-model="pageList[2]" placeholder="20条">
                      <Option v-for="page in pageList" :value="page" :key="page"
                        >{{ page }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="9">
                  <FormItem label="添加时间">
                    <Row>
                      <Col span="11">
                        <DatePicker
                          type="date"
                          placeholder=""
                          v-model="formItem.date1"
                        ></DatePicker>
                      </Col>
                      <Col span="3" style="text-align: center">-</Col>
                      <Col span="10">
                        <DatePicker
                          type="date"
                          placeholder=""
                          v-model="formItem.date2"
                        ></DatePicker>
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div :class="{ header_box }">
              <Row :gutter="16">
                <Col span="5">
                  <FormItem label="跳转链接">
                    <Input v-model="formItem.href" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="推荐置顶">
                    <Select>
                      <Option
                        v-for="stick in sticks"
                        :value="stick"
                        :key="stick"
                        >{{ stick }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="显示隐藏">
                    <Select v-model="formItem.showhide">
                      <Option v-for="show in shows" :value="show" :key="show"
                        >{{ show }}条</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="9">
                  <Row :gutter="16">
                    <FormItem label="分类">
                      <Col span="11">
                      <!-- 这里的方法名change千万不要加()!!! -->
                        <Select v-model="whereMap.model1" @on-change="change">  
                          <Option
                            v-for="first in SelectList"
                            :value="first.id"
                            :key="first.id"
                            >{{ first.title }}</Option
                          >
                        </Select>
                      </Col>
                      <Col span="11">
                        <Select v-model="whereMap.model2">
                          <Option
                            v-for="second in childrens"
                            :value="second.id"
                            :key="second.id"
                            >{{ second.title }}</Option
                          >
                        </Select>
                      </Col>
                    </FormItem>
                  </Row>
                </Col>
              </Row>
            </div>
            <div :class="{ icon_box }">
              <div :class="{ button_box }">
                <Icon
                  type="md-sync"
                  :class="{ update }"
                  @click="updatePage()"
                />
                <Button type="primary" @click="searchDatas">搜索</Button>
                <Button>全部</Button>
              </div>
            </div>
          </Form>
        </div>
        <div :class="{ page_box }">
          <Row>
            <Col span="24">
              <Row>
                <Col span="22">
                  <Button type="error" @click="allDelete">批量删除</Button>
                  <Button type="success" :class="{ addbutton }" @click="addList"
                    >添加</Button
                  >
                </Col>
                <Col span="2">
                  <span :class="{ pageSpan }"
                    >每页20条/共{{ this.datas.length }}条</span
                  >
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div>
          <Table
            ref="selection"
            :columns="columns"
            :data="datas"
            @on-selection-change="changeSelect"
          ></Table>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getAdverts,
  UpdateAdvertsData,
} from "../../axios/api.js";
export default {
  data() {
    return {
      Content: "Content",
      center_box: "center_box",
      update: "update",
      form_box: "form_box",
      header_box: "header_box",
      icon_box: "icon_box",
      button_box: "button_box",
      pageSpan: "pageSpan",
      formItem: { id: "", user: "", date1: "", date1: "",showhide:""},
      stateModel: "",
      SelectList: [
        {
          id: 1,
          title: "前台广告",
          childrens: [{ id: 11, title: "通用顶部轮播大图" }],
        },
      ],
      childrens: "",
      whereMap: { model1: "", model2: "" },
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      input_box: "input_box",
      page_box: "page_box",
      addbutton: "addbutton",
      updatelist: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          trueValue: true,
        },
        {
          title: "编号",
          align: "left",
          width: 60,
          key: "id",
          sortType:"desc" //设置初始化排序。值为 asc 和 desc
        },

        {
          title: "图片",
          key: "img",
          width: 130,
          align: "left",
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.img
                },
                style: {
                  width: "100px",
                  height: "30px",
                  paddingTop: "6px",
                  paddingRight: "6px",
                },
              }),
            ]);
          },
        },
        {
          title: "名称",
          key: "title",
          align: "left",
          width:180
        },
        {
          title: "分类",
          align: "left",
          width:140,
          key: "itemize",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                params.row.itemone
              ),
              h(
                "p",
                params.row.itemtwo
              ),
            ]);
          },
        },
        {
          title: "跳转链接",
          align: "left",
          key: "href",
        },
        {
          title: "推荐置顶",
          align: "left",
          key: "istop",
        },
        {
          title: "显示隐藏",
          align: "left",
          key: "showhide",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#5cb85c",
                  },
                },
                params.row.showhide
              ),
            ]);
          },
        },
        {
          title: "排序",
          align: "left",
          key: "sort",
        },
        {
          title: "添加时间",
          // width: 90,
          align: "left",
          key: "addtime",
        },
        {
          title: "操作",
          key: "content",
          width: 170,
          align: "left",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.updateList(params.index);
                    },
                  },
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      datas: [],
    };
  },
  computed:{
    ...mapState('moduleModule',{
      sticks: 'sticks',
      shows: 'shows',
      pageList:'pageList',
      })
  },
  methods: {
    // 蓝色图标的刷新
    updatePage() {
      this.$router.go(0);
    },
    // 批量删除
    allDelete() {
      if (this.selectCount <= 0) {
        this.$Modal.warning({
          title: "消息",
          content: "请至少选择一项",
        });
        return;
      } else {
        this.$Modal.confirm({
          title: "消息",
          content: "删除后数据不可恢复！确定删除吗？",
          onOk: () => {
            // 操作失败
            this.$Message.error("操作失败，仅供后台演示！");
            this.getDataList();
          },
        });
      }
    },
    // 搜索按钮 
    searchDatas() {
      if (this.formItem.id === "") {
        this.$Message.warning("搜索内容不能为空")
      } else {
        UpdateAdvertsData(this.formItem.id)
        .then((res) => {
          //splice( 添加或删除的开始位置, 删除的元素个数, 添加的元素(删除后想要在原位置替换的值) )
          this.datas.splice(0,this.datas.length,res);
        })
        .catch((err) => {
          this.datas = []
        });
      }
    },
    // on-selection-change事件
    //只要选中项发生变化时就会触发 返回:已选项数据
    changeSelect(data) {
      //selectList = 已选项数据
      this.selectList = data;
      //selectCount = 已选项数据的长度
      this.selectCount = data.length;
    },
    // 添加按钮
    addList() {
      this.$router.push({ name: "advertsadd" });
    },
    //二级联动
    change(value) {
      for (var i = 0; i < this.SelectList.length; i++) {
        if (value == this.SelectList[i].id) {
          this.childrens = this.SelectList[i].childrens;
          console.log(this.childrens)
        }
      }
      // console.log(this.childrens);
    },
    //table表格数据
    getAdverts() {
      getAdverts()
        .then((res) => {
          this.datas = res;
          // console.log(res);
          // console.log(datas);
        })
        .catch((err) => {});
    },
    // table表格中的删除按钮
    remove(index) {
      this.datas.splice(index, 1);
    },
    // table表格中的修改按钮
    updateList(index) {
      UpdateAdvertsData(this.datas[index].id).then((res) => {
        this.updatelist = res;
        this.$router.push({
          name: "advertsupdate",
          query: {
            // name:'wjm'
            updatelist: JSON.stringify(this.updatelist),
            // updatelist: this.updatelist,
          },
        });
        console.log(this.updatelist);
      });
    },
  },
  //一般来说我们都希望在页面渲染之前就将数据请求下来并保存下来。
  created() {
    //所以我们在生命周期函数create()中调用我们写好的函数，这里为了结构清晰我们将函数抽离在methods中。
    this.getAdverts();
  },
};
</script>

<style lang="less" scoped>
//Content组件的样式
.Content {
  padding: 24px;
  min-height: 280px;
  background: #fff;
}
.center_box {
  label {
    font-size: 14px;
    color: #17233d;
    font-weight: 700;
  }
}
.update {
  color: #337ab7;
  font-weight: bold;
  font-size: 22px;
  transform: rotate(-52deg);
  line-height: 12px;
}
.form_box {
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #000000;
  font-size: 14px;
}
.header_box {
  display: flow-root;
  padding-top: 7px;
  padding-right: 44px;
  border-bottom: 1px solid #dddddd;
  height: 50px;
}
.icon_box {
  background-color: #f5f5f5;
  height: 50px;
  border-radius: 0px 0px 3px 3px;
  padding: 9px;
}
.button_box {
  float: right;
  button {
    margin-left: 10px;
  }
}
.addbutton {
  margin-left: 10px;
}
.page_box {
  margin-top: 20px;
  margin-bottom: 30px;
}
.pageSpan {
    color: #777;
    font-size: 12px;
    display: inline-block;
    border: #ddd 1px solid;
    padding: 5px 6px;
    border-radius: 3px;
    cursor: not-allowed;
}
</style>