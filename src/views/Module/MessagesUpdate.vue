<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>留言修改</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'messages' }">返回列表</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :class="{ content }"
    >
      <div :class="{ center_box }">
        <Form :model="formTop" label-position="top">
          <Row>
            <Col span="24">
              <FormItem>
                <p>编号</p>
                <Input :value="this.updatelist.id" disabled></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem>
                <p><span :class="{ start }">*</span>内容</p>
                <Input
                  type="textarea"
                  :rows="10"
                  :value="this.updatelist.content"
                />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <FormItem>
                <p><span :class="{ start }">*</span>昵称</p>
                <Input
                v-model="this.updatelist.name"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p><span :class="{ start }">*</span>邮箱</p>
                <Input
                  v-model="this.updatelist.mail"
                />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <FormItem>
                <p>推荐置顶</p>
                <Select v-model="sticks[0]">
                  <Option v-for="stick in sticks" :value="stick" :key="stick">{{
                    stick
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p>显示隐藏</p>
                <Select v-model="shows[0]">
                  <Option v-for="show in shows" :value="show" :key="show">{{
                    show
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <FormItem>
                <p>是否公开</p>
                <Select v-model="overts[0]">
                  <Option v-for="overt in overts" :value="overt" :key="overt">{{
                    overt
                  }}</Option>
                </Select>
              </FormItem>
            </Col>

            <Col span="12">
              <FormItem>
                <p>排序</p>
                <InputNumber
                  :max="10"
                  :min="1"
                  v-model="value1"
                  style="width: 100%"
                ></InputNumber>
                <span>值越大越靠前，默认为0</span>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-between" class="code-row-bg">
            <Col span="7">
              <FormItem>
                <Button long @click="updatePage()">刷新</Button>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem>
                <Button type="primary" long @click="handleSubmit()">提交</Button>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem>
                <Button long @click="returnTop()">返回</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </Content>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      content:"content",
      center_box: "center_box",
      update: "update",
      datas: "",
      updatelist: "",
      page_select: "page_select",
      formTop: {
        content:"",
        name: "",
        mail: "",
      },
      value1: 0,
      submitButton:'submitButton',
      start: "start",
      overts: ["是(1)","否(0)"],
    };
  },
  computed:{
    ...mapState('moduleModule',{
      shows: 'shows',
      sticks:'sticks',
      })
  },
  methods: {
    updatePage() {
      this.$router.go(0);
    },
    returnTop() {
        this.$router.push({name:'messages'})
    },
  //提交按钮
  handleSubmit() {
        this.$Message.error("操作失败，仅供后台演示");
  }
  },
  mounted() {
    this.updatelist = JSON.parse(this.$route.query.updatelist);
  },
};
</script>

<style lang="less" scoped>
.content{
  padding: 24px;
  min-height: 280px;
  background-color: #fff;
}
.center_box {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 18px 14px 10px 14px;
  p {
    font-size: 14px;
    color: #17233d;
    font-weight: 700;
  }
  .start {
    color: #f00;
  }
}
.update {
  color: #337ab7;
  font-weight: bold;
  font-size: 22px;
  transform: rotate(-52deg);
  line-height: 12px;
}

</style>