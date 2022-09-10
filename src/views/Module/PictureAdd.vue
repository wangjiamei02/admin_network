<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>图片添加</BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'picture' }">返回列表</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :class="{ content }"
    >
      <div :class="{ center_box }">
        <Form :model="formTop" label-position="top">
           <Row>
            <Col span="24">

              <FormItem>
                <p><span :class="{ start }">*</span>分类</p>
                <Row type="flex" justify="center" :gutter="24">
                  <Col span="12">
                        <Select v-model="whereMap.model" @on-change="change" @on-select="changeSelect">
                          <Option
                            v-for="item in SelectList"
                            :key="item.id"
                            :value="item.id"
                            >{{ item.title }}</Option
                          >
                        </Select>
                  </Col>
                  <Col span="12">
                        <Select v-model="whereMap.model2" @on-select="changeSelectTwo">
                          <Option
                            v-for="item in childrens"
                            :key="item.id"
                            :value="item.id"
                            >{{ item.title }}</Option
                          >
                        </Select>
                  </Col>
                </Row>
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
                        :before-upload="beforeUploadPicture"
                >
                    <Button icon="ios-cloud-upload-outline" :class="{upload_button}">选择文件</Button>
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
                <Input v-model="formTop.size" ></Input>
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
          <Row>
            <Col span="24">
              <FormItem>
                <p><span :class="{ start }">*</span>名称</p>
                <Input v-model="formTop.name"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" :gutter="24">
            <Col span="12">
              <FormItem>
                <p>是否封面</p>
                    <Select v-model="covers[0]">
                      <Option
                        v-for="cover in covers"
                        :value="cover"
                        :key="cover"
                        >{{ cover }}</Option
                      >
                    </Select>
                    <span>一个相册只允许设置一个封面</span>
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
export default {
  data() {
    return {
      content:"content",
      center_box: "center_box",
      update: "update",
      formTop: {
        size: "640*480",
        name:""
      },
      value1: 0,
      page_select: "page_select",
      start: "start",
      items: ["有(Y)", "无(N)"],
      shows: ["显示(1)", "隐藏(0)"],
      sticks: ["默认(0)", "推荐(1)", "置顶(2)"],
      covers:["非封面（0）","封面（1）"],
      delete_picture: "delete_picture",
      upload_button: "upload_button",
      datas: [],
      SelectList: [   //二级联动数据
        {
          id: 1,
          title: "请选择",
          childrens: [{ id: 11, title: "请选择" }],
        },
        {
          id: 2,
          title: "默认",
          childrens: [{ id: 12, title: "经典" }],
        },
      ],
      childrens: "",
      whereMap: { model1: "", model2: "" },
      changeselect:"",
      changeselecttwo:"",
      upload:"",
      filename:"",
    };
  },
  methods: {
    updatePage() {
      this.$router.go(0);
    },
    returnTop() {
        this.$router.push({name:'picture'})
    },
    //分类-二级联动
    change(value) {
      for (var i = 0; i < this.SelectList.length; i++) {
        if (value == this.SelectList[i].id) {
          this.childrens = this.SelectList[i].childrens;
        }
      }
      // console.log(this.childrens);
    },
  //一级分类选中状态
  changeSelect(value) {
    this.changeselect = value
    console.log(this.changeselect)
  },
  //一级分类选中状态
  changeSelectTwo(value) {
    this.changeselecttwo = value
    console.log(this.changeselect)
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

  //提交按钮
  handleSubmit() {
     if (this.changeselect == "") {
          this.$Modal.warning({ title: "消息", content: "请选择一级分类" });
        } else if (this.changeselecttwo == "") {
          this.$Modal.warning({ title: "消息", content: "请选择二级分类" });
        }else if (this.filename == "") {
          this.$Modal.warning({ title: "消息", content: "请上传图片" });
      }else if (this.formTop.name == "") {
          this.$Modal.warning({ title: "消息", content: "请输入图片名称" });
      }else {
        this.$Message.error("操作失败，仅供后台演示");
      }    
  },
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