<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>用户修改</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'user' }">返回列表</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :class="{ content }"
    >
      <div :class="{ center_box }">
        <Form :model="formTop" label-position="top">
          <Row>
            <Col span="24">
              <FormItem>
                <p>ID</p>
                <Input :placeholder="this.updatelist.id" disabled></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p><span :class="{ start }">*</span>用户名</p>
                <Input :placeholder="this.updatelist.user" disabled></Input>
                <span>2~16个字母、数字、下划线，以字母开头</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p><span :class="{ start }">*</span>姓名</p>
                <Input :value="this.updatelist.name"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p><span :class="{ start }">*</span>密码</p>
                <Input v-model="formTop.pass"></Input>
                <span>6~16个字符，区分大小写，<span :class="{ start }">不修改不用填写</span></span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p><span :class="{ start }">*</span>确认密码</p>
                <Input v-model="formTop.checkpass"></Input>
                <span>请再次输入密码</span>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>头像</p>
                <Upload
                       action="http://120.53.104.223/wangjiamei/api/uploads.php"   
                        name="pic"
                        method="post" 
                        :on-success="successEvent"
                        :show-upload-list="false"
                        :before-upload='beforeUploadPicture'                
                >
                    <Button icon="ios-cloud-upload-outline" :class="{upload_button}">选择文件</Button>
                </Upload>
                <span>格式：jpg、jpeg、gif、png</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p>预览<span :class="{ delete_picture }" @click="delectPicture">删除</span></p>
                <a :href="this.updatelist.img" target="_blank">
               <img :src="this.updatelist.img" v-if="changePicture"/>
               </a>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>缩略图尺寸</p>
                <Input v-model="formTop.size"></Input>
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
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>身份证号</p>
                <Input v-model="formTop.pass"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p><span :class="{ start }">*</span>性别</p>
                <Select v-model="sexs[0]">
                  <Option v-for="sex in sexs" :value="sex" :key="sex">{{
                    sex
                  }}</Option> </Select
                >
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>手机号</p>
                <Input v-model="formTop.iphone"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p><span :class="{ start }">*</span>邮箱</p>
                <Input :value="this.updatelist.mail"></Input>
                <span>用来找回密码，请认真填写</span>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>审核状态</p>
                <Select v-model="states[1]">
                  <Option v-for="state in states" :value="state" :key="state">{{
                    state
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
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
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>地址</p>
                <Input v-model="formTop.address"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p>邮编</p>
                <InputNumber
                  :max="10"
                  :min="1"
                  v-model="value1"
                  style="width: 100%"
                ></InputNumber>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>是否内测</p>
                <Select v-model="tests[0]">
                  <Option v-for="test in tests" :value="test" :key="test">{{
                    test
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
          <Row type="flex" justify="center" :gutter="24">
            <Col span="8">
              <FormItem>
                <Button long @click="updatePage()">刷新</Button>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem>
                <Button type="primary" long @click="handleSubmit()">提交</Button>
              </FormItem>
            </Col>
            <Col span="8">
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
export default {
  data() {
    return {
      content:"content",
      center_box: "center_box",
      update: "update",
      datas: "",
      updatelist: "",
      formTop: {
        name: "",
        password: "",
        password2: "",
        iphone: "",
        mail: "",
        look: "",
        size: "640*480",
        watermark: "",
        textarea: "",
        // picture:""
      },
      value1: 0,
      submitButton:'submitButton',
      start: "start",
      items: ["有", "无"],
      sexs:["保密","男","女"],
      states:["待审(0)", "通过(1)", "封杀(2)"],
      sticks: ["默认(0)", "推荐(1)", "置顶(2)"],
      tests: ["否(0)","是(1)"],
      delete_picture: "delete_picture",
      upload_button: "upload_button",
      changePicture:true,
      filename:""
    };
  },
  methods: {
    updatePage() {
      this.$router.go(0);
    },
    returnTop() {
        this.$router.push({name:'user'})
    },
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
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
  beforeUploadPicture(res) {
    console.log(res)
    //控制文件上传格式
    let imgTypeArr = ['image/jpg','image/jpeg','image/gif','image/png'];
    let imgType = imgTypeArr.indexOf(res.type) !== -1
    if (!imgType) {
      this.$Message.error({
        content:  '文件: ' + res.name + '  格式不正确, 请选择格式正确的文件',
        duration: 5 //自定义时长
      });
      return false
    }
    },

 	//图片上传成功钩子
 	successEvent(res,file) {
      console.log(res)
      this.filename = file.name
    },
  //提交按钮
  handleSubmit() {
        this.$Message.error("操作失败，仅供后台演示");   
  },
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
  .submitButton{
    margin-left: 24%;
  }
  .delete_picture {
    color: #337ab7;
    margin-left: 10px;
    cursor: pointer;
  }
  img{
    width: 60px;
    height: 60px;
    border-radius: 6px;
    cursor: pointer;
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