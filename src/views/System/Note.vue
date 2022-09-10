<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>短信日志</BreadcrumbItem>
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
                  <FormItem label="手机号/邮箱">
                    <Input v-model="formItem.iphone" placeholder=""></Input>
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
              <Row type="flex" justify="space-around" class="code-row-bg" :gutter="16">
                <Col span="5">
                  <FormItem label="类型">
                    <Select v-model="formItem.type">
                      <Option
                        v-for="type in types"
                        :value="type"
                        :key="type"
                        >{{ type }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="使用状态">
                    <Select v-model="formItem.use">
                      <Option
                        v-for="use in uses"
                        :value="use"
                        :key="use"
                        >{{ use }}</Option
                      >
                    </Select>                    
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="验证码">
                    <Input v-model="formItem.test" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="9">
                  <FormItem label="短信来源">
                    <Select v-model="formItem.note"> 
                      <Option
                        v-for="note in notes"
                        :value="note"
                        :key="note"
                        >{{ note }}</Option
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
      formItem: {
        id: "",
        iphone: "",
        handle:"",
        date1:"",
        date2:"",
        type:"",
        use:"",
        text:"",
        note:""
      },
      handles: ["android","ipad", "iphone", "ipod","linux","macintosh","other","unix","windows"],
      types:["手机号（0）","邮箱（1）"],
      uses:["已使用（0）","未使用（1）"],
      notes:["管理员找回密码（admin_forget_pwd）"],
      pageSpan: "pageSpan",
      datas: [],
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      text:"text"
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
</style>