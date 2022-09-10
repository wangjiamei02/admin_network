<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem :style="{ color: '#999' }">广告修改</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'adverts' }">返回列表</BreadcrumbItem>
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
                <Input :placeholder="this.updatelist.id" disabled></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem>
                <p><span :class="{ start }">*</span>分类</p>
                <Row :gutter="16">
                  <Col span="12">
                      <Select v-model="whereMap.model1" @on-change="change">  
                          <Option
                            v-for="first in SelectList"
                            :value="first.id"
                            :key="first.id"
                            >{{ first.title }}</Option
                          >
                        </Select>
                  </Col>
                  <Col span="12">
                        <Select v-model="whereMap.model2">
                          <Option
                            v-for="second in childrens"
                            :value="second.id"
                            :key="second.id"
                            >{{ second.title }}</Option
                          >
                        </Select>
                  </Col>
                </Row>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem>
                <p><span :class="{ start }">*</span>名称</p>
                <Input :value="this.updatelist.title"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16"> 
            <Col span="12">
              <FormItem>
                <p>缩略图</p>
                <Upload 
                        action="http://120.53.104.223/wangjiamei/api/uploads.php" 
                        name="pic"
                        method="post" 
                        :before-upload='beforeUploadPicture'   
                        :on-success="successEvent"
                        :show-upload-list="false"             
                >
                    <Button icon="ios-cloud-upload-outline" :class="{upload_button}">选择文件</Button>
                </Upload>
                <span>格式：jpg、jpeg、gif、png</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <p>预览<span :class="{ delete_picture }" @click="delectPicture">删除</span></p>
                <div>
                  <a :href="this.updatelist.img" target="_blank">
                    <img :src="this.updatelist.img" v-if="changePicture"/>
                    </a>
                </div>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
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
          <Row>
            <Col span="24">
              <FormItem>
                <p><span :class="{ start }">*</span>简介</p>
                <Input
                  type="textarea"
                  :rows="2"
                  :value="this.updatelist.title"
                />
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="16">
            <Col span="12">
            <FormItem>
                <p>跳转链接</p>
                <Input :value="this.updatelist.href"></Input>
            
        </FormItem>
        </Col>
        <Col span="12">
              <FormItem>
                <p>推荐置顶</p>
                <Select v-model="sticks[1]">
                  <Option v-for="stick in sticks" :value="stick" :key="stick">{{
                    stick
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
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
      formTop: {
        size: "640*480",
        textarea: "",
      },
      value1: 0,
      start: "start",
      delete_picture: "delete_picture",
      changePicture:true,
      picture: "picture",
      upload_button: "upload_button",
      filename:"",  // 上传图片文件名
      SelectList: [ //二级联动数据
        {
          id: 1,
          title: "前台广告",
          childrens: [{ id: 11, title: "通用顶部轮播大图" }],
        },
      ],
      childrens: "",
      whereMap: { model1: "", model2: "" },
    };
  },
 computed:{
    ...mapState('moduleModule',{
      items:'items',
      sticks: 'sticks',
      shows: 'shows',
      })
  },
  methods: {
    updatePage() {
      this.$router.go(0);
    },
    returnTop() {
        this.$router.push({name:'adverts'})
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
    //提交按钮
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
    },
    //二级联动
    change(value) {
      for (var i = 0; i < this.SelectList.length; i++) {
        if (value == this.SelectList[i].id) {
          this.childrens = this.SelectList[i].childrens;
          console.log(this.childrens)
        }
      }
      // console.log(this.childrens);
    },
  },
  mounted() {
    // this.updatelist = this.$route.params.updatelist
    this.updatelist = JSON.parse(this.$route.query.updatelist);
    // console.log(this.updatelist)
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
    cursor: pointer;
  }
  img{
    width: 230px;
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