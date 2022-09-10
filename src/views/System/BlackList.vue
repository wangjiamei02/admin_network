<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>黑名单列表</BreadcrumbItem>
    </Breadcrumb>
    <Content :class="{ Content }">
      <div :class="{ center_box }">
        <div :class="{ form_box }">
          <Form :model="formItem" :label-width="80">
            <div :class="{ header_box }">
              <Row type="flex" justify="space-around" class="code-row-bg">
                <Col span="5">
                  <FormItem label="编号">
                    <Input v-model="formItem.id" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="IP">
                    <Input v-model="formItem.ip" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="审核状态">
                    <Select v-model="formItem.state">
                      <Option
                        v-for="state in states"
                        :value="state"
                        :key="state"
                        >{{ state }}</Option
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
                  <Dropdown trigger="click" style="margin-left: 20px">
                    <a href="javascript:void(0)">
                      <Button type="primary" :class="{batch}" @click="handleBatch">
                        批量审核
                        <Icon type="ios-arrow-down"></Icon>
                      </Button>
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem v-for="drop in drops" :key="drop">{{
                        drop
                      }}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Button
                    type="success"
                    :class="{ addbutton }"
                    @click="modal1 = true"
                    >添加
                    <Modal v-model="modal1" title="添加" :styles="{ top: '0px', width: '780px' }">
                      <div :class="{ modal_body }">
                      <Form
                        :model="formTop"
                        label-position="top"
                        :rules="ruleValidate"
                      >
                        <Row :gutter="16">
                          <Col span="12">
                            <FormItem label="IP" prop="ip">
                              <Input v-model="formTop.ip"></Input>
                              <p>示例：125.100.126.210</p>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="审核状态" prop="state">
                                <Select v-model="formItem.state">
                                <Option
                                    v-for="state in states"
                                    :value="state"
                                    :key="state"
                                    >{{ state }}</Option
                                >
                                </Select>
                            </FormItem>
                          </Col>
                        </Row>
                        <Row :gutter="16">
                          <Col span="12">
                            <FormItem label="封杀时长" prop="time">
                                <Select v-model="formItem.state" @on-select="handleSelect">
                                <Option
                                    v-for="time in times"
                                    :value="time"
                                    :key="time"
                                    >{{ time }}</Option
                                >
                                </Select>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="备注" prop="message">
                              <Input v-model="formTop.message"></Input>
                            </FormItem>
                          </Col>
                        </Row>
                      </Form>
                      </div>
                      <div slot="footer">
                      <Row type="flex" justify="center" :gutter="24">
                        <Col span="8">
                          <Button long @click="updatePage()">刷新</Button>
                        </Col>
                        <Col span="8">
                          <Button type="primary" long @click="handleSubmit()"
                            >提交</Button
                          >
                        </Col>
                        <Col span="8">
                          <Button long @click="modal1 = false">关闭</Button>
                        </Col>
                      </Row>
                    </div>
                    </Modal>
                  </Button>
                </Col>
                <Col span="2">
                  <span :class="{ pageSpan }"
                    >每页20条/共{{ this.datas.length }}条</span
                  >
                </Col>
              </Row>
            </Col>
            <!-- <Col span="6">
              <Page :total="100" prev-text="上一页" next-text="下一页" />
            </Col> -->
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
      batch:"batch",
      batch:"batch",
      modal_body:"modal_body",
      formItem: {
        id: "",
        ip: "",
        state:"",
        date1:"",
        date2:""
      },
      formTop: {
        ip: "",
        state: "",
        time:"",
        message:"",
      },
      states: ["请选择","待审(0)", "通过(1)", "封杀(2)"],
      times:["请选择","1天","3天","7天","30天","90天","180天","360天"],
      pageSpan: "pageSpan",
      datas: [],
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      modal1: false,
      drops: ["待审", "通过", "封杀"],
      ruleValidate: {
        ip: [
          {
            required: true,
            message: "ip地址不能为空！",
            trigger: "blur",
          },
        ]
      },
      text:"text",
      timeState:""
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
    //批量审核
    handleBatch() {
      if (this.selectCount <= 0) {
        this.$Modal.warning({
          title: "消息",
          content: "请至少选择一项",
        });
        return;
      } else {
        this.$Modal.confirm({
          title: "消息",
          content: "您正在进行批量操作！确定操作吗？",
          onOk: () => {
            // 操作失败
            this.$Message.error("操作失败，仅供后台演示！");
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
    //被选中时调用，参数为选中项的 value (或 key) 值
    //添加弹框封杀时长的选中状态
    handleSelect(value) {
      this.timeState = value;
      console.log(this.timeState)
    },
    //添加弹框的提交
    handleSubmit() {
    if (this.formTop.ip == "") {
          this.$Modal.warning({ title: "消息", content: "请输入IP" });
        }else if (this.timeState == "") {
          this.$Modal.warning({ title: "消息", content: "请选择封杀时长" });
      } else {
        this.$Message.error("操作失败，仅供后台演示");
      }
    }
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
.addbutton {
  margin-left: 10px;
}
.batch {
    margin-left: -10px;
}
.page_box {
  margin-top: 20px;
  margin-bottom: 30px;
}
.page_select {
  margin-left: 20px;
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
.modal_body {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>