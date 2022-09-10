<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>用户添加</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'user' }">返回列表</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :class="{ content }"
    >
      <div :class="{ center_box }">
        <Form :model="formItem" label-position="top">
           <Row type="flex" justify="center" :gutter="24">
                <Col span="12">
                <FormItem>
                    <p><span :class="{ start }">*</span>用户名</p>
                    <Input v-model="formItem.user"></Input>
                    <span>2~16个字母、数字、下划线，以字母开头</span>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem>
                    <p><span :class="{ start }">*</span>姓名</p>
                    <Input v-model="formItem.name"></Input>
                </FormItem>
                </Col>
          </Row>
           <Row type="flex" justify="center" :gutter="24">
                <Col span="12">
                <FormItem>
                    <p><span :class="{ start }">*</span>密码</p>
                    <Input v-model="formItem.pass" type="password"></Input>
                    <span>6~16个字符，区分大小写</span>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem>
                    <p><span :class="{ start }">*</span>确认密码</p>
                    <Input v-model="formItem.checkpass" type="password"></Input>
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
                    <Button icon="ios-cloud-upload-outline">选择文件</Button>
                </Upload>
                <span>格式：jpg、jpeg、gif、png</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p>预览</p>
                <a :href="`http://120.53.104.223/wangjiamei/public/img/` + this.filename" target="_blank">
                <img :src="`http://120.53.104.223/wangjiamei/public/img/` + this.filename"/>
                </a>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>缩略图尺寸</p>
                <Input v-model="formItem.size" ></Input>
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
                    <Input placeholder="" v-model="formItem.status"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem>
                    <p><span :class="{ start }">*</span>性别</p>
                    <Select @on-select="changeSelect">
                    <Option v-for="sex in sexs" :value="sex" :key="sex">{{
                        sex
                    }}</Option> 
                    </Select>
                </FormItem>
                </Col>
          </Row>
           <Row type="flex" justify="center" :gutter="24">
                <Col span="12">
                <FormItem>
                    <p>手机号</p>
                    <Input placeholder="" v-model="formItem.iphone"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem>
                    <p><span :class="{ start }">*</span>邮箱</p>
                    <Input placeholder="" v-model="formItem.mail"></Input>
                    <span>用来找回密码，请认真填写</span>
                </FormItem>
                </Col>
          </Row>
           <Row type="flex" justify="center" :gutter="24">
                <Col span="12">
                  <FormItem>
                    <p>审核状态</p>
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
                <Col span="12">
                  <FormItem>
                    <p>推荐置顶</p>
                    <Select v-model="sticks[0]">
                      <Option
                        v-for="stick in sticks"
                        :value="stick"
                        :key="stick"
                        >{{ stick }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
          </Row>
           <Row type="flex" justify="center" :gutter="24">
                <Col span="12">
                <FormItem>
                    <p>地址</p>
                    <Input placeholder="" v-model="formItem.address"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem>
                    <p>邮编</p>
                    <Input placeholder="" v-model="formItem.code"></Input>
                </FormItem>
                </Col>
          </Row>
           <Row type="flex" justify="center" :gutter="24">
                <Col span="12">
                <FormItem>
                    <p>是否内测</p>
                    <Select v-model="tests[0]">
                      <Option
                        v-for="test in tests"
                        :value="test"
                        :key="test"
                        >{{ test }}</Option
                      >
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
            <Col span="8" >
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
import {
  getItemize
} from "../../axios/api.js";
export default {
  data() {
    return {
      content:"content",
      center_box: "center_box",
      update: "update",
      formItem: {
        user:"",
        name: "",
        pass: "",
        checkpass:"",
        iphone: "",
        mail: "",
        size: "640*480",
        status:"",
        state:"",
        address:"",
        code:""
      },
      value1: 0,
      start: "start",
      picture:"暂无图片",
      sexs: ["保密", "男","女"],
      items: ["有(Y)", "无(N)"],
      states: ["待审(0)", "通过(1)", "封杀(2)"],
      sticks: ["默认(0)", "推荐(1)", "置顶(2)"],
      tests:["否(0)","是(1)"],
      datas: [],
      SelectList: [],
      childrens: "",
      whereMap: { model1: "", model2: "" },
      filename:"",
      changeselect:""
    };
  },
  methods: {
    updatePage() {
      this.$router.go(0);
    },
    returnTop() {
        this.$router.push({name:'user'})
    },
    //分类-二级联动数据
    getItemize() {
      getItemize()
        .then((res) => {
          this.SelectList = res;
          console.log(this.SelectList);
        })
        .catch((err) => {
          //   console.log('出错啦~')
        });
    },
    change(value) {
      for (var i = 0; i < this.SelectList.length; i++) {
        if (value == this.SelectList[i].id) {
          this.childrens = this.SelectList[i].childrens;
        }
      }
      // console.log(this.childrens);
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
  //性别选中状态
  changeSelect(value) {
    this.changeselect = value
    console.log(this.changeselect)
  },
  //提交按钮
    handleSubmit() {
        if (this.formItem.user == "") {
          this.$Modal.warning({ title: "消息", content: "请输入用户名" });
        } else if (this.formItem.user.length < 2) {
          this.$Modal.warning({ title: "消息", content: "用户名格式错误" });
        } else if (this.formItem.name == "") {
          this.$Modal.warning({ title: "消息", content: "请输入姓名" });
        } else if (this.formItem.pass == "") {
          this.$Modal.warning({ title: "消息", content: "请输入密码" });
        } else if (this.formItem.pass.length < 6) {
          this.$Modal.warning({ title: "消息", content: "密码长度错误" });
        } else if (this.formItem.checkpass.length < 6) {
          this.$Modal.warning({ title: "消息", content: "请输入确认密码" });
        } else if (this.formItem.checkpass !== this.formItem.pass) {
          this.$Modal.warning({
            title: "消息",
            content: "密码和确认密码不一致",
          });
        }else if (this.changeselect == "") {
          this.$Modal.warning({ title: "消息", content: "请选择性别" });
        } else if (this.formItem.mail == "") {
          this.$Modal.warning({ title: "消息", content: "请输入邮箱" });
        } else if (this.formItem.mail !== "") {
          var reg =
            /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
          if (!reg.test(this.formItem.mail)) {
            this.$Modal.warning({ title: "消息", content: "邮箱格式错误" });
          }else {
        this.$Message.error("操作失败，仅供后台演示");
      }
        }
    },
  },
  created() {
    this.getItemize();
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
  .delete_picture {
    color: #337ab7;
    margin-left: 10px;
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