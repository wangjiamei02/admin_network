<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>后台演示</BreadcrumbItem>
    </Breadcrumb>
    <Content :class="{ content }">
      <div :class="{ center_box }">
        <div :class="{ form_box }">
          <Form :model="formItem" :label-width="80">
            <div :class="{ header_box }">
              <Row>
                <Col span="5">
                  <FormItem label="编号">
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
                    @click="modal1 = true"
                    >添加
                    <Modal
                      v-model="modal1"
                      title="添加"
                      :styles="{ top: '0px', width: '780px' }"
                    >
                      <div :class="{ modal_body }">
                        <Form
                          :model="formTop"
                          label-position="top"
                          :rules="ruleValidate"
                        >
                          <Row :gutter="16">
                            <Col span="12">
                              <FormItem label="用户名" prop="user">
                                <Input v-model="formTop.user"></Input>
                                <p>2~16个字母、数字、下划线，以字母开头</p>
                              </FormItem>
                            </Col>
                            <Col span="12">
                              <FormItem label="姓名" prop="name">
                                <Input v-model="formTop.name"></Input>
                              </FormItem>
                            </Col>
                          </Row>
                          <Row :gutter="16">
                            <Col span="12">
                              <FormItem label="密码" prop="pass">
                                <Input
                                  v-model="formTop.pass"
                                  type="password"
                                ></Input>
                                <p>6~16个字符，区分大小写</p>
                              </FormItem>
                            </Col>
                            <Col span="12">
                              <FormItem label="确认密码" prop="checkpass">
                                <Input
                                  v-model="formTop.checkpass"
                                  type="password"
                                ></Input>
                                <p>请再次输入密码</p>
                              </FormItem>
                            </Col>
                          </Row>
                          <Row :gutter="16">
                            <Col span="12">
                              <FormItem label="手机号" prop="iphone">
                                <Input v-model="formTop.iphone"></Input>
                                <p>示例：13512345678</p>
                              </FormItem>
                            </Col>
                            <Col span="12">
                              <FormItem label="邮箱" prop="mail">
                                <Input v-model="formTop.mail"></Input>
                                <p>用来找回密码，请认真填写</p>
                              </FormItem>
                            </Col>
                          </Row>
                          <Row :gutter="16">
                            <Col span="12">
                              <FormItem label="头像" prop="img">
                                <Upload
                                  action="http://120.53.104.223/wangjiamei/api/uploads.php" 
                                  name="pic"
                                  method="post"
                                  :on-success="successEvent"
                                  :show-upload-list="false"
                                  :before-upload="beforeUploadPicture"
                                >
                                  <Button icon="ios-cloud-upload-outline"
                                    >选择文件</Button
                                  >
                                </Upload>
                                <p>格式：jpg、jpeg、gif、png</p>
                              </FormItem>
                            </Col>
                            <Col span="12">
                              <FormItem label="预览" prop="look">
                                <a
                                  :href="
                                    `http://120.53.104.223/wangjiamei/public/img/` +
                                    this.filename
                                  "
                                  target="_blank"
                                >
                                  <img
                                    :src="
                                      `http://120.53.104.223/wangjiamei/public/img/` +
                                      this.filename
                                    "
                                  />
                                </a>
                              </FormItem>
                            </Col>
                          </Row>
                          <Row :gutter="16">
                            <Col span="12">
                              <FormItem label="角色" prop="role">
                                <Select @on-select="handleSelect">
                                  <Option :value="formTop.role">{{
                                    formTop.role
                                  }}</Option>
                                </Select>
                              </FormItem>
                            </Col>
                            <Col span="12">
                              <FormItem label="审核状态" prop="audit">
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
        <div>
          <Table
            ref="selection"
            :columns="columns"
            :data="datas"
            @on-selection-change="changeSelect"
          ></Table>
        </div>
        <!-- Table表格中修改按钮弹框 -->
        <Modal
          v-model="modal2"
          title="修改"
          :styles="{ top: '0px', width: '780px' }"
          :data="datas"
        >
          <div :class="{ modal_body }">
            <Form :model="formTop2" label-position="top" :rules="ruleValidate2">
              <Row>
                <Col span="24">
                  <FormItem label="编号">
                    <Input
                      v-model="updatelist.id"
                      disabled
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="用户名">
                    <Input
                      v-model="updatelist.user"
                      disabled
                    ></Input>
                    <p>2~16个字母、数字、下划线，以字母开头</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="姓名" prop="name">
                    <Input v-model="updatelist.name"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="密码">
                    <Input v-model="formTop2.pass" type="password"></Input>
                    <p>6~16个字符，区分大小写</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="确认密码">
                    <Input v-model="formTop2.checkpass" type="password"></Input>
                    <p>请再次输入密码</p>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="手机号">
                    <Input v-model="updatelist.iphone"></Input>
                    <p>示例：13512345678</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="邮箱">
                    <Input v-model="updatelist.mail" prop="mail"></Input>
                    <p>用来找回密码，请认真填写</p>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="头像">
                    <Upload
                      action="http://120.53.104.223/wangjiamei/api/uploads.php" 
                      name="pic"
                      method="post"
                      :on-success="successEvent"
                      :show-upload-list="false"
                      :before-upload="beforeUploadPicture"
                    >
                      <Button icon="ios-cloud-upload-outline">选择文件</Button>
                    </Upload>
                    <p>格式：jpg、jpeg、gif、png</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem>
                    <p>预览<span :class="{ delete_picture }" @click="delectPicture">删除</span></p>
                    <a :href="this.details.img" target="_blank">
                  <img :src="this.details.img" v-if="changePicture"/>
                  </a>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem>
                    <p>缩略图尺寸</p>
                    <Input v-model="formTop2.size"></Input>
                    <span>真实宽高：Y，指定宽高如：400*300</span>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem>
                    <p>缩略图水印</p>
                    <Select v-model="items[1]">
                      <Option v-for="item in items" :value="item" :key="item">{{
                        item
                      }}</Option> </Select
                    ><br />
                    <span>是否添加水印</span>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="角色" prop="role">
                    <Select v-model="formTop2.role">
                      <Option :value="formTop2.role">{{
                        formTop2.role
                      }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="审核状态">
                    <Select v-model="states[1]">
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
        <!-- Table表格中修改密码按钮弹框 -->
        <Modal
          v-model="modal3"
          title="修改密码"
          :styles="{ top: '0px', width: '780px' }"
          :data="datas"
        >
          <div :class="{ modal_body }">
            <Form :model="formTop2" label-position="top">
              <Row>
                <Col span="24">
                  <FormItem label="编号">
                    <Input
                      v-model="this.updatelistTwo.id"
                      disabled
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="用户名">
                    <Input
                      v-model="this.updatelistTwo.user"
                      disabled
                    ></Input>
                    <p>2~16个字母、数字、下划线，以字母开头</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="姓名">
                    <Input v-model="this.updatelistTwo.name" disabled ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="密码">
                    <Input v-model="formTop2.pass" type="password"></Input>
                    <p>
                      6~16个字符，区分大小写，<span :class="{ start }"
                        >不修改不用填写</span
                      >
                    </p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="确认密码">
                    <Input v-model="formTop2.checkpass" type="password"></Input>
                    <p>请再次输入密码</p>
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
                <Button type="primary" long @click="handleSubmitThree()"
                  >提交</Button
                >
              </Col>
              <Col span="8">
                <Button long @click="modal3 = false">关闭</Button>
              </Col>
            </Row>
          </div>
        </Modal>
        <!-- Table表格中用户名弹框 -->
        <Modal
          v-model="modal4"
          title="详情"
          :styles="{ top: '0px', width: '780px' }"
          :data="datas"
        >
          <div :class="{ modal_body }">
            <table>
              <tr>
                <th>编号</th>
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
                <Button long @click="modal4 = false">关闭</Button>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    </Content>
  </div>
</template>

<script>
import { getAdmin } from "../../axios/api";
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
      page_select: "page_select",
      pageSpan: "pageSpan",
      modal_body: "modal_body",
      start: "start",
      pageModel: "",
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
      states: ["待审(0)", "通过(1)", "封杀(2)"],
      drops: ["待审", "通过", "封杀"],
      items: ["有(Y)", "无(N)"],
      input_box: "input_box",
      page_box: "page_box",
      addbutton: "addbutton",
      batch: "batch",
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
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
          key: "id",
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
                  src: params.row.img,
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
                "span",
                {
                  style: {
                    color: "#337ab7",
                    cursor: "pointer",
                  },                 
                  on: {
                    click: () => {
                      this.handleDetails(params.index);
                    },
                  },
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
          title: "角色",
          align: "left",
          key: "role",
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
                      this.show(params.index)
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
                      this.showTwo(params.index)
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
      updatelist:[],
      updatelistTwo:"",
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      formTop: {
        id: "",
        user: "",
        name: "",
        pass: "",
        checkpass: "",
        iphone: "",
        mail: "",
        role: "后台演示（3）",
      },
      formTop2: {
        id: "",
        user: "",
        name: "",
        pass: "",
        checkpass: "",
        iphone: "",
        mail: "",
        size: "400*400",
        role: "后台演示（3）",
      },
      ruleValidate: {
        user: [
          {
            required: true,
            message: "用户名不能为空！",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空！",
            trigger: "blur",
          },
        ],
        pass: [
          {
            required: true,
            message: "密码不能为空！",
            trigger: "blur",
          },
        ],
        checkpass: [
          {
            required: true,
            message: "请再次填写密码！",
            trigger: "blur",
          },
        ],
        mail: [
          {
            required: true,
            message: "邮箱不能为空！",
            trigger: "blur",
          },
        ],
        role: [
          {
            required: true,
            message: "角色不能为空！",
            trigger: "blur",
          },
        ],
      },
      ruleValidate2: {
        name: [
          {
            required: true,
            message: "姓名不能为空！",
            trigger: "blur",
          },
        ]
      },
      roleState: "",
      filename: "",
      details:"",
      delete_picture:"delete_picture",
      changePicture:true,
    };
  },
  methods: {
    updatePage() {
      this.$router.go(0);
    },
    // 搜索按钮 
    searchDatas() {
      if (this.formItem.id === "") {
        this.$Message.warning("搜索内容不能为空")
      } else {
        getAdmin(this.formItem.id)
        .then((res) => {
          //splice( 添加或删除的开始位置, 删除的元素个数, 添加的元素(删除后想要在原位置替换的值) )
          this.datas.splice(0,this.datas.length,res);
        })
        .catch((err) => {
          this.datas = []
        });
      }
    },
    //图片预览-删除
    delectPicture() {
        this.$Modal.confirm({
          title: "消息",
          content: "删除后数据不可恢复！确定删除吗？",
        //   点击确定的回调
          onOk: () => {
            // 操作失败
            // this.$Message.error("没有操作权限！");
            this.changePicture = false
          },
        //   点击取消的回调
          onCancel: () => {
            this.changePicture = true
          }
        });       
    },
    //点击用户名弹框
    handleDetails(index) {
      this.details = this.datas[index]
      this.modal4 = true
    },
    getAdmin() {
      getAdmin()
        .then((res) => {
          this.datas = res;
          console.log(this.datas[0]);
        })
        .catch((err) => {});
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
    // table表格中的删除按钮
    remove(index) {
      this.datas.splice(index, 1);
    },
    //被选中时调用，参数为选中项的 value (或 key) 值
    //角色选中状态
    handleSelect(value) {
      this.roleState = value;
      console.log(this.roleState);
    },
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
    beforeUploadPicture(res) {
      //控制文件上传格式
      let imgTypeArr = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
      let imgType = imgTypeArr.indexOf(res.type) !== -1;
      if (!imgType) {
        this.$Message.error({
          content: "文件: " + res.name + "  格式不正确, 请选择格式正确的文件",
          duration: 5, //自定义时长
        });
        return false;
      }
    },
    //图片上传成功钩子
    successEvent(res, file) {
      console.log(res);
      this.filename = file.name;
    },
    //添加弹框的提交按钮
    handleSubmit() {
      if (this.formTop.user == "") {
        this.$Modal.warning({ title: "消息", content: "请输入用户名" });
      } else if (this.formTop.user.length < 2) {
        this.$Modal.warning({ title: "消息", content: "用户名格式错误" });
      } else if (this.formTop.name == "") {
        this.$Modal.warning({ title: "消息", content: "请输入姓名" });
      } else if (this.formTop.pass == "") {
        this.$Modal.warning({ title: "消息", content: "请输入密码" });
      } else if (this.formTop.pass.length < 6) {
        this.$Modal.warning({ title: "消息", content: "密码长度错误" });
      } else if (this.formTop.checkpass.length < 6) {
        this.$Modal.warning({ title: "消息", content: "请输入确认密码" });
      } else if (this.formTop.checkpass !== this.formTop.pass) {
        this.$Modal.warning({
          title: "消息",
          content: "密码和确认密码不一致",
        });
      } else if (this.formTop.mail == "") {
        this.$Modal.warning({ title: "消息", content: "请输入邮箱" });
      } else if (this.formTop.mail !== "") {
        var reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
        if (!reg.test(this.formTop.mail)) {
          this.$Modal.warning({ title: "消息", content: "邮箱格式错误" });
        } else if (this.roleState == "") {
          this.$Modal.warning({ title: "消息", content: "请选择角色" });
        } else {
          this.$Message.error("操作失败，仅供后台演示");
        }
      }
    },
    //修改按钮的数据
        show(index) {
        this.updatelist = this.datas[index]
        console.log(this.updatelist)
        this.modal2 = true;
    },
    //修改密码按钮的数据
        showTwo(index) {
        this.updatelistTwo = this.datas[index]
        console.log(this.updatelistTwo)
        this.modal3 = true;
    },
    // 修改按钮弹框的提交按钮
    handleSubmitTwo() {
      this.$Message.error("操作失败，仅供后台演示");
    },
    // 修改密码按钮的提交按钮
    handleSubmitThree() {
      this.$Message.error("操作失败，仅供后台演示");
    },

  },
  created() {
    this.getAdmin();
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
.delete_picture {
    color: #337ab7;
    margin-left: 10px;
    cursor: pointer;
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    cursor: pointer;
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
.modal_body {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  th {
    width: 90px;
  }
}
.start {
  color: #f00;
}
</style>