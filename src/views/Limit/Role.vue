<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>角色列表</BreadcrumbItem>
    </Breadcrumb>
    <Content :class="{ Content }">
      <div :class="{ center_box }">
        <div :class="{ form_box }">
          <Form :model="formItem" :label-width="80">
            <div :class="{ header_box }">
              <Row type="flex" justify="space-around" class="code-row-bg" :gutter="16">
                <Col span="5">
                  <FormItem label="ID">
                    <Input v-model="formItem.id" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="角色名称">
                    <Input v-model="formItem.rolename" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="角色值">
                    <Input v-model="formItem.rolenum" placeholder=""></Input>
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
                  <Button
                    type="success"
                    :class="{ addbutton }"
                    @click="modal = true"
                    >添加
                    <Modal v-model="modal" title="添加" :styles="{ top: '0px', width: '780px' }">
                      <div :class="{ modal_body }">
                      <Form
                        :model="formTop"
                        label-position="top"
                        :rules="ruleValidate"
                      >
                        <Row>
                          <Col span="24">
                            <FormItem label="角色名称" prop="name">
                              <Input v-model="formTop.rolename"></Input>
                              <p>示例：新闻编辑</p>
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span="24">
                            <FormItem label="角色值" prop="num">
                              <Input v-model="formTop.rolenum"></Input>
                              <p>示例：edit</p>
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
                            <Button long @click="modal = false">关闭</Button>
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
        </div>
        <div>
          <Table
            ref="selection"
            :columns="columns"
            :data="datas"
            @on-selection-change="changeSelect"
          ></Table>
        </div>
        <!-- table表格修改按钮 -->
        <Modal v-model="modal2" title="修改" :styles="{ top: '0px', width: '780px' }">
          <div :class="{ modal_body }">
          <Form
            :model="formTop"
            label-position="top"
            :rules="ruleValidate"
          >
            <Row>
              <Col span="24">
                <FormItem label="ID" prop="id">
                  <Input v-model="this.updatelist.id" disabled></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="角色名称" prop="name">
                  <Input v-model="this.updatelist.rolename"></Input>
                  <p>示例：新闻编辑</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="角色值" prop="num">
                  <Input v-model="this.updatelist.rolenum"></Input>
                  <p>示例：edit</p>
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
    </Content>
  </div>
</template>

<script>
import { getRole,DisposeData } from "../../axios/api.js";
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
      modal_body:"modal_body",
      formItem: {
        id: "",
        rolename: "",
        rolenum: "",
        date1:"",
        date2:""
      },
      formTop:{
        rolename: "",
        rolenum: "",
      },
      pageModel: "",
      pageSpan: "pageSpan",
      datas: [{id:""}],
      updatelist:"",
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
        },
        {
          title: "角色名称",
          align: "left",
          key: "rolename",
        },
        {
          title: "角色值",
          align: "left",
          key: "rolenum",
        },
        {
          title: "添加时间",
          align: "left",
          key: "addtime",
        },
        {
          title: "操作",
          key: "content",
        //   width: 230,
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
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.dispose(params.index);
                    },
                  },
                },
                "权限配置"
              ),
            ]);
          },
        },
      ],
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      modal: false,
      modal2:false,
      ruleValidate: {
        name: [
          {
            required: true,
            message: "角色名称不能为空！",
            trigger: "blur",
          },
        ],
        num: [
          {
            required: true,
            message: "角色值不能为空！",
            trigger: "blur",
          },
        ],
      },
      disposelist:""
    };
  },
  methods: {
    // 蓝色图标的刷新
    updatePage() {
      this.$router.go(0);
    },
    // 搜索按钮 
    searchDatas() {
      if (this.formItem.id === "") {
        this.$Message.warning("搜索内容不能为空")
      } else {
        getRole(this.formItem.id)
        .then((res) => {
          //splice( 添加或删除的开始位置, 删除的元素个数, 添加的元素(删除后想要在原位置替换的值) )
          this.datas.splice(0,this.datas.length,res);
        })
        .catch((err) => {
          this.datas = []
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
    //添加弹框的提交
    handleSubmit() {
    if (this.formTop.rolename == "") {
          this.$Modal.warning({ title: "消息", content: "请输入角色名称" });
        }else if (this.formTop.rolenum == "") {
          this.$Modal.warning({ title: "消息", content: "请输入角色值" });
      } else {
        this.$Message.error("操作失败，仅供后台演示");
      }
    },
    // 表格修改提交按钮
    handleSubmitTwo() {
      this.$Message.error("操作失败，仅供后台演示");
    },
    // 表格数据
    getRole() {
      getRole()
        .then((res) => {
          console.log(res);
          this.datas = res;
        })
        .catch((err) => {});
    },
    // table表格中的删除按钮
    remove(index) {
      this.datas.splice(index, 1);
    },
    // table表格中的修改按钮
    show(index) {
        this.updatelist = this.datas[index]
        console.log(this.updatelist)
        this.modal2 = true;
    },
    // table表格中的权限配置按钮
    dispose(index) {
        DisposeData(this.datas[index].id).then((res) => {
            this.disposelist = res;
            this.$router.push({ 
                name: "roledispose",
                query: {
                disposelist: JSON.stringify(this.disposelist),
          },
         })
    })
  },
  },
  created() {
    this.getRole();
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
.modal_body {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>