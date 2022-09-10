<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <!-- <BreadcrumbItem>Components</BreadcrumbItem> -->
      <BreadcrumbItem>修改个人信息</BreadcrumbItem>
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
                <Input disabled :value="this.datas[0].id"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>用户名</p>
                <Input disabled :value="this.datas[0].user"></Input>
              </FormItem>
            </Col>
            <Col span="12" >
              <FormItem>
                <p><span :class="{ start }">*</span>姓名</p>
                <Input v-model="this.datas[0].name"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>密码</p>
                <Input v-model="formTop.password"></Input>
                <span
                  >6~16个字符，区分大小写，<span :class="{ start }"
                    >不修改不用填写</span
                  ></span
                >
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p>确认密码</p>
                <Input v-model="formTop.password2"></Input>
                <span>请再次输入密码</span>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>手机号</p>
                <Input v-model="this.datas[0].iphone"></Input>
                <span>示例：13512345678</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p><span :class="{ start }">*</span>邮箱</p>
                <Input v-model="this.datas[0].mail"></Input>
                <span>用来找回密码，请认真填写</span>
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
                <!-- <input type="file" /> -->
                <!-- <Input type="file" @click="fileChange()"></Input> -->
                <span>格式：jpg、jpeg、gif、png</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p>预览<span :class="{ delete_picture }" @click="delectPicture">删除</span></p>
                <a :href="this.datas[0].img" target="_blank">
                <img :src="this.datas[0].img" v-show="changePicture"/>
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
              <Button type="primary" long @click="handleSubmit">提交</Button>
              <!-- <Input type="button" @click="fileChange()" value="提交"></Input> -->
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem>
              <Button long @click="updatePage()">刷新</Button>
              <!-- <Input type="button" @click="fileChange()" value="刷新"></Input> -->
            </FormItem>
          </Col>
        </Row>
        </Form>
      </div>
    </Content>
  </div>
</template>

<script>
import { getAdmin } from "../../axios/api";
export default {
  data() {
    return {
      content:"content",
      center_box: "center_box",
      update: "update",
      formTop: {
        name: "",
        password: "",
        password2: "",
        iphone: "",
        mail: "",
        look: "",
        size: "400*400",
        watermark: "",
        // picture:""
      },
      start: "start",
      items: ["有(Y)", "无(N)"],
      delete_picture: "delete_picture",
      upload_button:'upload_button',
      datas:[{id:""}],
      filename:"",
      changePicture:true
    };
  },
  methods: {
    updatePage() {
      this.$router.go(0);
    },
    // 表单数据
    getAdmin() {
      getAdmin()
        .then((res) => {
          this.datas = res;
          console.log(this.datas);
        })
        .catch((err) => {});
    },
    // 提交按钮
    handleSubmit() {
        this.$Message.error("操作失败，仅供后台演示");
    },
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
  beforeUploadPicture(res) {
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
      console.log(this.filename)
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
  },
  created() {
    this.getAdmin();
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
  padding: 18px 14px 26px 14px;
  p {
    font-size: 14px;
    color: #17233d;
    font-weight: 700;
  }
  .start {
    color: #f00;
  }
  .delete_picture {
    color: #337ab7;
    margin-left: 10px;
    cursor: pointer;
  }
  .upload_button{
    width: 100%;
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
  // padding-top: 18px;
  transform: rotate(-52deg);
  line-height: 12px;
}

</style>
