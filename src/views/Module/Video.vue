<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>视频列表</BreadcrumbItem>
    </Breadcrumb>
    <Content :class="{ Content }">
      <div :class="{ center_box }">
        <div :class="{ form_box }">
          <Form :model="formItem" :label-width="80">
            <div :class="{ header_box }">
              <Row :gutter="16">
                <Col span="5">
                  <FormItem label="ID">
                    <Input v-model="formItem.id" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="推荐置顶">
                    <Select  v-model="formItem.sticks">
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
                  <FormItem label="每页显示">
                    <Select v-model="formItem.pageshow" placeholder="20条">
                      <Option v-for="page in pageList" :value="page" :key="page"
                        >{{ page }}条</Option
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
                  <FormItem label="名称">
                    <Input v-model="formItem.name" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="是否内测">
                    <Select v-model="formItem.test">
                      <Option
                        v-for="test in tests"
                        :value="test"
                        :key="test"
                        >{{ test }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="显示隐藏">
                    <Select v-model="formItem.showhide">
                      <Option v-for="show in shows" :value="show" :key="show"
                        >{{ show }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="9">
                  <Row :gutter="16">
                    <FormItem label="分类">
                      <Col span="11">
                        <Select v-model="whereMap.model" @on-change="change">
                          <Option
                            v-for="item in SelectList"
                            :key="item.id"
                            :value="item.id"
                            >{{ item.title }}</Option
                          >
                        </Select>
                      </Col>
                      <Col span="11">
                        <Select v-model="whereMap.model2">
                          <Option
                            v-for="item in childrens"
                            :key="item.id"
                            :value="item.id"
                            >{{ item.title }}</Option
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
                <Button type="primary">搜索</Button>
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
                  <Button
                    type="success"
                    :class="{ addbutton }"
                    @click="addList"
                    >添加</Button>
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
        <p :class="text">暂时没有相关记录</p>
      </div>
    </Content>
  </div>
</template>

<script>
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
      page_box: "page_box",
      addbutton: "addbutton",
      formItem: {
        id: "",
        sticks:"",
        pageshow:"",
        date1:"",
        date2:"",
        name:"",
        test:"",
        showhide:""
      },
      sticks: ["默认(0)", "推荐(1)", "置顶(2)"],
      pageList: [5, 10, 20, 50, 100, 200, 300, 500, 1000, 2000, 5000, 8000],
      shows: ["显示(1)", "隐藏(0)"],
      tests:["内测（1）","非内测（0）"],
      SelectList: [
        {
          id: 1,
          title: "默认",
          childrens: [{ id: 11, title: "经典" }],
        },
      ],
      childrens: "",
      whereMap: { model1: "", model2: "" },
      pageSpan: "pageSpan",
      datas: [],
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      text:"text",
    };
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
      this.$router.push({ name: "videoadd" });
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
    //添加弹框的确定
    ok() {
      this.$Message.error("操作失败，仅供后台演示");
    },
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
.text{
    text-align: center;
    color: #f00;
    font-size: 14px;
}
.addbutton {
  margin-left: 10px;
}
</style>