<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>用户列表</BreadcrumbItem>
    </Breadcrumb>
    <Content :class="{ content }">
      <div :class="{ center_box }">
        <div :class="{ form_box }">
          <Form :model="formItem" :label-width="80">
            <div :class="{ header_box }">
              <Row>
                <Col span="5">
                  <FormItem label="ID">
                    <Input v-model="formItem.id" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="用户名">
                    <Input v-model="formItem.user" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="姓名">
                    <Input v-model="formItem.name" placeholder=""></Input>
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
              <Row>
                <Col span="5">
                  <FormItem label="手机号">
                    <Input v-model="formItem.iphone" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="邮箱">
                    <Input v-model="formItem.mail" placeholder=""></Input>
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
                <Col span="5">
                  <FormItem label="每页显示">
                    <Select v-model="pageshow" placeholder="20条">
                      <Option
                        v-for="page in pageList"
                        :value="page"
                        :key="page"
                      >
                        {{ page }}条
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div :class="{ icon_box }">
              <div :class="{ button_box }">
                <Icon
                  type="md-sync"
                  :class="{ update }"
                  @click="updatePage"
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
                  <Dropdown trigger="click" style="margin-left: 20px">
                    <a href="javascript:void(0)">
                      <Button
                        type="primary"
                        :class="{ batch }"
                        @click="handleBatch"
                      >
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
                    @click="handleAdd"
                    >添加</Button
                  >
                  <Button
                    type="primary"
                    :class="{ addbutton }"
                    @click="SendMail"
                    >邮件发送
                    <!-- 邮件发送按钮的modal -->
                    <Modal
                      v-model="modal1"
                      title="消息"
                      :styles="{ top: '0px', width: '780px' }"
                    >
                      <div :class="{ modal_body }">
                        <Form
                          :model="formTop"
                          label-position="top"
                          :rules="ruleValidate"
                        >
                          <Row :gutter="16">
                            <Col span="24">
                              <FormItem label="IDS" prop="ids">
                                <Input
                                  placeholder="1"
                                  disabled
                                ></Input>
                              </FormItem>
                            </Col>
                          </Row>
                          <Row :gutter="16">
                            <Col span="12">
                              <FormItem label="邮件标题" prop="title">
                                <Input placeholder="邮件标题"></Input>
                              </FormItem>
                            </Col>
                            <Col span="12">
                              <FormItem label="上传附件（小于8MB）" prop="img">
                                <Upload
                                  action="http://localhost/admin-api/api/uploads.php"
                                  method="post"
                                >
                                  <Button icon="ios-cloud-upload-outline"
                                    >选择文件</Button
                                  >
                                </Upload>
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col span="24">
                              <FormItem label="邮件内容" prop="context">
                                <Input
                                  v-model="formTop.context"
                                  type="textarea"
                                  :rows="3"
                                  placeholder="邮件内容"
                                />
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
          </Row>
          <!-- 修改密码按钮的modal -->
          <Modal
            v-model="modal2"
            title="修改密码"
            :styles="{ top: '0px', width: '780px' }"
          >
            <div :class="{ modal_body }">
              <Form :model="formTop" label-position="top">
                <Row>
                  <Col span="24">
                    <FormItem label="ID">
                      <Input :placeholder="this.passdata.id" disabled></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row :gutter="16">
                  <Col span="12">
                    <FormItem label="用户名">
                      <Input :placeholder="this.passdata.user" disabled></Input>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="姓名">
                      <Input :placeholder="this.passdata.name" disabled></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row :gutter="16">
                  <Col span="12">
                    <FormItem label="新密码">
                      <Input v-model="formTop.pass"></Input>
                      <span
                        >6~16个字符，区分大小写，<span :class="{ start }"
                          >不修改不用填写</span
                        ></span
                      >
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="确认新密码">
                      <Input v-model="formTop.checkpass"></Input>
                      <span>请再次输入密码</span>
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
                  <Button type="primary" long @click="handleSubmitTwo()"
                    >提交</Button
                  >
                </Col>
                <Col span="8">
                  <Button long @click="modal2 = false">关闭</Button>
                </Col>
              </Row>
            </div>
          </Modal>
        </div>
        <div>
          <Table
            ref="selection"
            :columns="columns"
            :data="datas"
            @on-selection-change="changeSelect"
          ></Table>
        </div>
        <!-- Table表格中用户名弹框 -->
        <Modal
          v-model="modal3"
          title="详情"
          :styles="{ top: '0px', width: '780px' }"
          :data="datas"
        >
          <div :class="{ modal_body }">
            <table>
              <tr>
                <th>ID</th>
                <td>{{this.details.id}}</td>
              </tr>
              <tr>
                <th>用户名</th>
                <td>{{this.details.user}}</td>
              </tr>
               <tr>
                <th>姓名</th>
                <td>{{this.details.name}}</td>
              </tr>
              <tr>
                <th>身份证号</th>
                <td></td>
              </tr> 
              <tr>
                <th>手机号</th>
                <td>{{this.details.iphone}}</td>
              </tr>
              <tr>
                <th>邮箱</th>
                <td>{{this.details.mail}}</td>
              </tr>
               <tr>
                <th>头像</th>
                <td>
                <a :href="this.details.img" target="_blank">
                  <img :src="this.details.img"/>
                  </a>
                </td>
              </tr>  
              <tr>
                <th>添加时间</th>
                <td>{{this.details.logintime}}</td>
              </tr>
               <tr>
                <th>修改时间</th>
                <td>{{this.details.addtime}}</td>
              </tr>  
              <tr>
                <th>访问时间</th>
                <td>{{this.details.addtime}}</td>
              </tr>
               <tr>
                <th>登录次数</th>
                <td>{{this.details.loginnum}}</td>
              </tr>          
            </table>          
          </div>
          <div slot="footer">
            <Row type="flex" justify="center" :gutter="24">
              <Col span="12">
                <Button long @click="updatePage()">刷新</Button>
              </Col>
              <Col span="12">
                <Button long @click="modal3 = false">关闭</Button>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    </Content>
  </div>
</template>

<script>
import { getUser, UserUpdateData } from "../../axios/api.js";
export default {
  data() {
    return {
      update: "update",
      content: "content",
      center_box: "center_box",
      form_box: "form_box",
      header_box: "header_box",
      icon_box: "icon_box",
      button_box: "button_box",
      pageSpan: "pageSpan",
      start: "start",
      pageshow: "",
      formItem: {
        id: "",
        user: "",
        name: "",
        date1: "",
        date1: "",
        iphone: "",
        mail: "",
        state: "",
        pageshow: "",
      },
      pageList: [5, 10, 20, 50, 100, 200, 300, 500, 1000, 2000, 5000, 8000],
      states: ["请选择", "待审(0)", "通过(1)", "封杀(2)"],
      drops: ["待审", "通过", "封杀"],
      input_box: "input_box",
      page_box: "page_box",
      addbutton: "addbutton",
      batch: "batch",
      modal_body: "modal_body",
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      modal1:false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          trueValue: true,
        },
        {
          title: "ID",
          align: "left",
          key: "id",
          width: 50,
        },

        {
          title: "头像",
          key: "img",
          width: 100,
          align: "left",
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.img
                },
                style: {
                  width: "70px",
                  height: "70px",
                  paddingTop: "6px",
                  paddingRight: "6px",
                },
              }),
            ]);
          },
        },
        {
          title: "用户名",
          key: "user",
          align: "left",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                {
                  style: {
                    color: "#337ab7",
                    cursor:"pointer"
                  },
                  on: {
                    click: () => {
                      this.handleDetails(params.index);
                    },
                  }
                },
                params.row.user
              ),
            ]);
          },
        },
        {
          title: "姓名",
          align: "left",
          key: "name",
        },
        {
          title: "手机号",
          align: "left",
          key: "iphone",
        },
        {
          title: "邮箱",
          align: "left",
          key: "mail",
        },
        {
          title: "审核状态",
          align: "left",
          key: "state",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#5cb85c",
                  },
                },
                params.row.state
              ),
            ]);
          },
        },
        {
          title: "登录时间",
          align: "left",
          key: "logintime",
        },
        {
          title: "登录次数",
          align: "left",
          key: "loginnum",
        },
        {
          title: "操作系统",
          align: "left",
          key: "handle",
        },
        {
          title: "添加时间",
          align: "center",
          key: "addtime",
        },
        {
          title: "操作",
          key: "content",
          width: 190,
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
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.updatePass(params.index);
                    },
                  },
                },
                "修改密码"
              ),
            ]);
          },
        },
      ],
      datas: [{ id: "" }],
      passdata:"",
      modal1: false,
      modal2: false,
      modal3: false,
      details:"",
      updatelist: "",
      formTop: {
        ids: "",
        title: "",
        context: "",
      },
      ruleValidate: {
        ids: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "邮件标题不能为空！",
            trigger: "blur",
          },
        ],
        context: [
          {
            required: true,
            message: "邮件内容不能为空！",
            trigger: "blur",
          },
        ],
      },
      changeselect:""
    };
  },
  methods: {
    updatePage() {
      this.$router.go(0);
    },
    //点击用户名弹框
    handleDetails(index) {
      this.details = this.datas[index]
      this.modal3 = true
    },
    getUser() {
      getUser()
        .then((res) => {
          this.datas = res;
          console.log(this.datas);
        })
        .catch((err) => {});
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
          },
        });
      }
    },
    // 搜索按钮 
    searchDatas() {
      if (this.formItem.id === "") {
        this.$Message.warning("搜索内容不能为空")
      } else {
        UserUpdateData(this.formItem.id)
        .then((res) => {
          //splice( 添加或删除的开始位置, 删除的元素个数, 添加的元素(删除后想要在原位置替换的值) )
          this.datas.splice(0,this.datas.length,res);
        })
        .catch((err) => {
          this.datas = []
        });
      }
    },
  //批量审核选中状态
  changeSelect(value) {
    this.changeselect = value
    console.log(this.changeselect)
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
    handleAdd() {
      this.$router.push({ name: "useradd" });
    },
    //邮件发送
    SendMail() {
      if (this.selectCount <= 0) {
        this.$Modal.warning({
          title: "消息",
          content: "请至少选择一项",
        });
        return;
      } else {
        this.modal1 = true;
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
    // table表格中的删除按钮
    remove(index) {
      this.datas.splice(index, 1);
    },
    //邮件发送的弹框
    handleSubmit() {
      if (this.formTop.title == "") {
        this.$Modal.warning({ title: "消息", content: "请输入邮箱标题" });
      } else if (this.formTop.context == "") {
        this.$Modal.warning({ title: "消息", content: "请输入邮箱内容" });
      } else {
        this.$Message.error("操作失败，仅供后台演示");
      }
    },
    // 修改密码按钮弹框的提交按钮
    handleSubmitTwo() {
      this.$Message.error("操作失败，仅供后台演示");
    },
    // table表格中的修改按钮
    updateList(index) {
      UserUpdateData(this.datas[index].id).then((res) => {
        this.updatelist = res;
        this.$router.push({
          name: "userupdate",
          query: {
            updatelist: JSON.stringify(this.updatelist),
          },
        });
        // console.log(this.updatelist);
      });
    },
    // table表格中的修改密码按钮
    updatePass(index) {
      this.passdata = this.datas[index]
      this.modal2 = true;
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 24px;
  min-height: 280px;
  background-color: #fff;
}
.center_box {
  border-radius: 4px;
  padding: 18px 14px 10px 14px;
  p {
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
.batch {
  margin-left: -10px;
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
.start {
  color: #f00;
}
.modal_body {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  th {
    width: 90px;
  }
 img{
   width: 60px;
    height: 60px;
    border-radius: 6px;
    cursor: pointer;
 }
}
</style>