<template>
  <div>
    <Breadcrumb :class="{ breadcrumb }" >
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <!-- 当你给一个组件绑定事件的时候，要加上.native，不加的话绑定的事件会无效。如果是普通的html元素，就不需要 -->
      <BreadcrumbItem @click.native="one">一级菜单</BreadcrumbItem>
      <BreadcrumbItem @click.native="two">北京市</BreadcrumbItem>
      <BreadcrumbItem @click.native="three">东城区</BreadcrumbItem>  
      <BreadcrumbItem @click.native="four">东华门街道</BreadcrumbItem>   
    </Breadcrumb>
    <Content :class="{ Content }">
      <div :class="{ center_box }">
        <div :class="{ form_box }">
          <Form :model="formItem" :label-width="80">
            <div :class="{ header_box }">
              <Row type="flex" justify="space-around" class="code-row-bg">
                <Col span="5">
                  <FormItem label="编号">
                    <Input v-model="formItem.id" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="名称">
                    <Input v-model="formItem.name" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="层级">
                    <Input v-model="formItem.rank" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="显示隐藏">
                    <Select v-model="pageModel">
                      <Option v-for="show in shows" :value="show" :key="show"
                        >{{ show }}条</Option
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
                  @click="updatePage"
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
                    @click="modal1 = true"
                    >添加
                    <Modal v-model="modal1" title="添加" :styles="{ top: '0px', width: '780px' }">
                      <Form
                        :model="formTop"
                        label-position="top"
                        :rules="ruleValidate"
                      >
                        <Row :gutter="16">
                          <Col span="12">
                            <FormItem label="上级分类" prop="high">
                                <Select v-model="highs[0]" disabled>
                                <Option
                                    v-for="high in highs"
                                    :value="high"
                                    :key="high"
                                    >{{ high }}</Option
                                >
                                </Select>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="层级" prop="rank">
                              <Input v-model="formTop.rank" placeholder="1" disabled></Input>
                            </FormItem>
                          </Col>
                        </Row>
                        <Row :gutter="16">
                          <Col span="12">
                            <FormItem label="名称" prop="name">
                              <Input v-model="formTop.name"></Input>
                              <p>示例：哈哈省（鼠标移出后“拼音”将自动填充）</p>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="拼音" prop="name">
                              <Input v-model="formTop.name"></Input>
                              <p>示例：ha ha sheng</p>                              
                            </FormItem>
                          </Col>
                        </Row>
                        <Row :gutter="16">
                          <Col span="12">
                            <FormItem label="显示隐藏" prop="showhide">
                                <Select v-model="shows[0]">
                                <Option v-for="show in shows" :value="show" :key="show"
                                    >{{ show }}</Option
                                >
                                </Select>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="排序" prop="sort">
                              <InputNumber
                                :max="10"
                                :min="1"
                                v-model="formTop.value"
                                style="width: 100%"
                              ></InputNumber>
                              <p>值越大越靠前，默认为0</p>                              
                            </FormItem>
                          </Col>
                        </Row>
                      </Form>
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
                          <Button long @click="modal1 = false">关闭</Button>
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
        <!-- <router-view></router-view> -->
    <Table
      ref="selection"
      :columns="columns"
      :data="datas"
      @on-selection-change="changeSelect"
    ></Table>
    <Modal
      v-model="modal1"
      title="修改"
      :styles="{ top: '0px', width: '780px' }"
    >
      <div :class="{ modal_body }">
        <Form :model="formTop" label-position="top" :rules="ruleValidate">
          <Row>
            <Col span="24">
              <FormItem label="编号">
                <Input v-model="this.updatelist.id" disabled></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <FormItem label="上级分类" prop="high">
                <Select v-model="highs[0]" disabled>
                  <Option v-for="high in highs" :value="high" :key="high">{{
                    high
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="层级" prop="rank">
                <Input v-model="this.updatelist.rank" disabled></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <FormItem label="名称" prop="name">
                <Input v-model="this.updatelist.name"></Input>
                <p>示例：哈哈省（鼠标移出后“拼音”将自动填充）</p>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="拼音">
                <Input v-model="this.updatelist.letter"></Input>
                <p>示例：ha ha sheng</p>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <FormItem label="显示隐藏" prop="showhide">
                <Select v-model="shows[0]">
                  <Option v-for="show in shows" :value="show" :key="show">{{
                    show
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="排序" prop="sort">
                <InputNumber
                  :max="10"
                  :min="1"
                  v-model="formTop.value"
                  style="width: 100%"
                ></InputNumber>
                <p>值越大越靠前，默认为0</p>
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
            <Button type="primary" long @click="handleSubmit()">提交</Button>
          </Col>
          <Col span="8">
            <Button long @click="modal1 = false">关闭</Button>
          </Col>
        </Row>
      </div>
    </Modal>
      </div>
    </Content>
  </div>
</template>

<script>
import { getArea } from "../../axios/api.js";
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
      breadcrumb:"breadcrumb",
      formItem: {
        id: "",
        ip: "",
        state:"",
        date1:"",
        date2:""
      },
      formTop: {
        name: "",
        high:"",
        rank:"",
        sort:"",
        value:0
      },
      pageModel: "",
      states: ["请选择","待审(0)", "通过(1)", "封杀(2)"],
      times:["请选择","1天","3天","7天","30天","90天","180天","360天"],
      shows: ["显示(1)", "隐藏(0)"],
      highs:["一级分类"],
      pageSpan: "pageSpan",
      datas: [],
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      modal1: false,
      drops: ["待审", "通过", "封杀"],
      ruleValidate: {
        high: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message:"请输入名称",
            trigger: "blur",
          },
        ],
      },
      text:"text",
      modal1: false,
      formTop: {
        name: "",
        high: "",
        rank: "",
        sort: "",
        value: 0,
      },
      highs: ["一级分类","一级分类-北京市","一级分类-北京市-东城区"],
      shows: ["显示(1)", "隐藏(0)"],
      modal_body: "modal_body",
      ruleValidate: {
        high: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          trueValue: true,
        },
        {
          title: "编号",
          align: "left",
          key: "id",
        },
        {
          title: "名称",
          key: "name",
          align: "left",
        },
        {
          title: "拼音",
          align: "left",
          key: "letter",
        },
        {
          title: "层级",
          align: "left",
          key: "rank",
        },
        {
          title: "显示隐藏",
          align: "left",
          key: "showhide",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#5cb85c",
                  },
                },
                params.row.showhide
              ),
            ]);
          },
        },
        {
          title: "排序",
          align: "left",
          key: "sort",
        },
        {
          title: "操作",
          key: "content",
          width: 220,
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
                      this.modal1 = true;
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
                  on: {
                    click: () => {
                      this.handleHref(params.index);
                    },
                  },
                },
                "子菜单（18）"
              ),
            ]);
          },
        },
      ],
      datas: [],
      id:1,
      updatelist:""
    };
  },
  methods: {
    // 蓝色图标的刷新
    updatePage() {
      this.$router.go(0);
    },
  one() {
       getArea(1)
        .then((res) => {
          //   this.datas = res;  //这样写会报错，数据格式不对！！！
         this.datas.splice(0,this.datas.length,res);
        //  console.log(this.axios.params.id)
        })
        .catch((err) => {
          this.datas = []
        });   
  },
  two() {
       getArea(2)
        .then((res) => {
          //   this.datas = res;  //这样写会报错，数据格式不对！！！
         this.datas.splice(0,this.datas.length,res);
        })
        .catch((err) => {
          this.datas = []
        });   
  },
  three() {
       getArea(3)
        .then((res) => {
          //   this.datas = res;  //这样写会报错，数据格式不对！！！
         this.datas.splice(0,this.datas.length,res);
        })
        .catch((err) => {
          this.datas = []
        });   
  },
  four() {
       getArea(4)
        .then((res) => {
          //   this.datas = res;  //这样写会报错，数据格式不对！！！
         this.datas.splice(0,this.datas.length,res);
        })
        .catch((err) => {
       this.datas = []
        });   
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
    // 搜索按钮 
    searchDatas() {
      if (this.formItem.id === "") {
        this.$Message.warning("搜索内容不能为空")
      } else {
        getArea(this.formItem.id)
        .then((res) => {
          //splice( 添加或删除的开始位置, 删除的元素个数, 添加的元素(删除后想要在原位置替换的值) )
          this.datas.splice(0,this.datas.length,res);
        })
        .catch((err) => {
          this.datas = []
        });
      }
    },
    //table表格数据
    getArea() {
      getArea(1)
        .then((res) => {
          //   this.datas = res;  //这样写会报错，数据格式不对！！！
          this.datas.push(res);
          this.updatelist = res
        })
        .catch((err) => {});
    },
    // on-selection-change事件
    //只要选中项发生变化时就会触发 返回:已选项数据
    changeSelect(data) {
      //selectList = 已选项数据
      this.selectList = data;
      //selectCount = 已选项数据的长度
      this.selectCount = data.length;
    },
    //table表格子菜单按钮
    handleHref(index) {
      getArea( ++ this.id )
        .then((res) => {
          //   this.datas = res;  //这样写会报错，数据格式不对！！！
         this.datas.splice(0,this.datas.length,res);
          this.updatelist = res
        })
        .catch((err) => {
           this.datas = []         
        });
    },
    //提交按钮
    handleSubmit() {
        this.$Message.error("操作失败，仅供后台演示");
    },
    //添加弹框的提交
    handleSubmitTwo() {
    if (this.formTop.name == "") {
          this.$Modal.warning({ title: "消息", content: "请输入名称" });
        }else {
        this.$Message.error("操作失败，仅供后台演示");
      }
    },
  },
  created() {
    this.getArea();
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
.text{
    text-align: center;
    color: #f00;
    font-size: 14px;
}
.breadcrumb {
    margin: 24px 0;
    font-weight: 700;
    color: #515a6e;
    cursor: pointer;
}
</style>