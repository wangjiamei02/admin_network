<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>说说添加</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'says' }">返回列表</BreadcrumbItem>
    </Breadcrumb>
    <Content :class="{ content }">
      <div :class="{ center_box }">
        <Form :model="formTop" label-position="top">
          <Row>
            <Col span="24">
              <FormItem>
                <p><span :class="{ start }">*</span>内容</p>
                <Input
                  v-model="formTop.content"
                  type="textarea"
                  :rows="10"
                  placeholder=""
                />
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>缩略图</p>
               <Upload 
                        action="http://120.53.104.223/wangjiamei/api/uploads.php"  
                        name="pic"
                        method="post" 
                        :on-success="successEvent"
                        :show-upload-list="false"
                        :before-upload='beforeUploadPicture'  
                >
                  <Button
                    icon="ios-cloud-upload-outline"
                    :class="{ upload_button }"
                    >选择文件</Button
                  >
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
                <Input v-model="formTop.size"></Input>
                <span>真实宽高：Y，指定宽高如：400*300</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p>缩略图水印</p>
                <Select v-model="items[0]">
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
          <Row>
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
                <Button type="primary" long
                  @click="handleSubmit()">提交</Button
                >
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
import { mapState } from 'vuex'
export default {
  data() {
    return {
      content: "content",
      center_box: "center_box",
      update: "update",
      formTop: {
        size: "640*480",
        content: "",
      },
      value1: 0,
      start: "start",
      delete_picture: "delete_picture",
      picture: "picture",
      upload_button: "upload_button",
      filename:"",  //上传的图片名字
    };
  },
  computed:{
    ...mapState('moduleModule',{
      sticks: 'sticks',
      items: 'items',
      shows: 'shows',
      originals:'originals',
      tests:'tests'
      
      })
  },
  methods: {
    //刷新按钮
    updatePage() {
      this.$router.go(0);
    },
    //返回按钮
    returnTop() {
        this.$router.push({name:'says'})
    },
  //提交按钮
  handleSubmit() {
     if (this.formTop.content == "") {
          this.$Modal.warning({ title: "消息", content: "请输入说说内容" });
        }else {
        this.$Message.error("操作失败，仅供后台演示");
      }    
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
    },
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
  // border: 1px solid #ddd;
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