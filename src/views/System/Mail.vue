<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>邮件日志</BreadcrumbItem>
    </Breadcrumb>
    <Content :class="{ Content }">
      <div :class="{ center_box }">
        <div :class="{ form_box }">
          <Form :model="formItem" :label-width="80">
            <div :class="{ header_box }">
              <Row type="flex" justify="space-around" class="code-row-bg" :gutter="16">
                <Col span="5">
                  <FormItem label="编号">
                    <Input v-model="formItem.id" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="收件人邮箱">
                    <Input v-model="formItem.mail" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="附件名称">
                    <Input v-model="formItem.annex" placeholder=""></Input>
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
                  <FormItem label="邮件标题">
                    <Input v-model="formItem.title" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="收件人姓名">
                  <Input v-model="formItem.name" placeholder=""></Input>                   
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="操作IP">
                    <Input v-model="formItem.ip" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="操作系统">
                    <Select v-model="formItem.handle">
                      <Option
                        v-for="handle in handles"
                        :value="handle"
                        :key="handle"
                        >{{ handle }}</Option
                      >
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
                    @click="modal = true"
                    >邮件发送
                    <Modal v-model="modal" title="邮件发送" :styles="{ top: '0px', width: '780px' }">
                      <div :class="{ modal_body }">
                      <Form
                        :model="formTop"
                        label-position="top"
                        :rules="ruleValidate"
                      >
                        <Row :gutter="16">
                          <Col span="12">
                            <FormItem label="收件人邮箱" prop="mail">
                              <Input v-model="formTop.mail" placeholder="收件人邮箱"></Input>
                              <p>示例：wangjiamei@123.com</p>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="收件人姓名" prop="name">
                              <Input v-model="formTop.name" placeholder="收件人姓名"></Input>
                              <p>示例：二月</p>
                            </FormItem>
                          </Col>
                        </Row>
                        <Row :gutter="16">
                          <Col span="12">
                            <FormItem label="邮件标题" prop="title">
                              <Input v-model="formTop.title" placeholder="邮件标题"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="上传附件" prop="upload">
                                <Upload action="http://localhost/ch04/api/uploads.php" method="post">
                                    <Button icon="ios-cloud-upload-outline">选择文件</Button>
                                </Upload>
                              <p>小于8MB</p>
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span="24">
                            <FormItem label="邮箱内容" prop="context">
                                <Input
                                v-model="formTop.context"
                                type="textarea"
                                placeholder="邮箱内容"
                                :rows="4"
                                />
                            </FormItem>
                          </Col>
                        </Row>
                      </Form>
                      </div>
           <div slot="footer">
            <Row type="flex" justify="center" :gutter="24">
              <Col span="8">
                <Button long @click="updatePage">刷新</Button>
              </Col>
              <Col span="8">
                <Button type="primary" long @click="handleSubmit">提交</Button>
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
      modal_body:"modal_body",
      handles: ["android","ipad", "iphone", "ipod","linux","macintosh","other","unix","windows"],
      pageSpan: "pageSpan",
      datas: [],
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      text:"text",
      modal: false,
      formItem:{
        id:"",
        mail:"",
        annex:"",
        date1:"",
        date2:"",
        title:"",
        name:"",
        ip:"",
        handle:""
      },
      formTop: {
        mail: "",
        name:"",
        title:"",
        upload:"",
        context:"",
      },
      ruleValidate: {
        mail: [
          {
            required: true,
            message: "请输入收件人邮箱！",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入收件人姓名！",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "请输入邮件标题！",
            trigger: "blur",
          },
        ],
        context: [
          {
            required: true,
            message: "请输入邮件内容！",
            trigger: "blur",
          },
        ],
      },
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
    //邮件发送的弹框
    handleSubmit() {
    if (this.formTop.mail == "") {
          this.$Modal.warning({ title: "消息", content: "请输入邮箱" });
        } else if (this.formTop.mail !== "") {
          var reg =
            /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(this.formTop.mail)) {
            this.$Modal.warning({ title: "消息", content: "邮箱格式错误" });
          }
        } else if (this.formTop.name == "") {
          this.$Modal.warning({ title: "消息", content: "请输入收件人姓名" });
      } else {
        this.$Message.error("操作失败，仅供后台演示");
      }
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
.addbutton {
  margin-left: 10px;
}
.modal_body {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>