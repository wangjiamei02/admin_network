<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>友情链接列表</BreadcrumbItem>
    </Breadcrumb>
    <Content :class="{ Content }">
      <div :class="{ center_box }">
        <!-- 顶部输入框 -->
        <div :class="{ form_box }">
          <Form :model="formItem" :label-width="80">
            <div :class="{ header_box }">
              <Row :gutter="16">
                <Col span="5">
                  <FormItem label="编号">
                    <Input v-model="formItem.id" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="申请来源">
                    <Select v-model="formItem.source">
                      <Option
                        v-for="source in sources"
                        :value="source"
                        :key="source"
                        >{{ source }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="审核状态">
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
                  <FormItem label="网站名称">
                    <Input v-model="formItem.name" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="网站网址">
                    <Input v-model="formItem.address" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="显示隐藏">
                    <Select v-model="formItem.showhide">
                      <Option v-for="show in shows" :value="show" :key="show"
                        >{{ show }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="每页显示">
                    <Select v-model="pageList[2]" placeholder="20条">
                      <Option v-for="page in pageList" :value="page" :key="page"
                        >{{ page }}条</Option
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
                <Button type="primary" @click="searchDatas">搜索</Button>
                <Button>全部</Button>
              </div>
            </div>
          </Form>
        </div>
        <!-- 说明 -->
       <div :class="{ explain }">
           <h5>说明:</h5>
           <p>如果对方网站的友情链接的a标签中含有nofollow字样，则取消与其交换</p>
       </div>
        <div :class="{ page_box }">
          <Row>
            <Col span="24">
              <Row>
                <Col span="22">
                  <Button type="error" @click="allDelete">批量删除</Button>
                  <Dropdown trigger="click" style="margin-left: 20px" on-click="handleDrop">
                    <a href="javascript:void(0)">
                      <Button type="primary" :class="{batch}" @click="handleBatch">
                        批量操作
                        <Icon type="ios-arrow-down"></Icon>
                      </Button>
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem v-for="drop in Friendsdrops" :key="drop" :name="drop">{{
                        drop
                      }}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Button
                    type="success"
                    :class="{ addbutton }"
                    @click="modal1 = true"
                    >添加
                    <Modal v-model="modal1" title="添加" :styles="{ top: '0px', width: '780px' }">
                      <div :class="{ modal_body }">
                      <Form
                        :model="formTop"
                        label-position="top"
                        :rules="ruleValidate"
                      >
                        <Row :gutter="16">
                          <Col span="12">
                            <FormItem label="网站名称" prop="name">
                              <Input v-model="formTop.name"></Input>
                              <p>示例：一度好</p>
                            </FormItem>
                          </Col>
                            <Col span="12">
                            <FormItem label="网站网址" prop="address">
                              <Input v-model="formTop.address"></Input>
                              <p>示例：http://www.yiduhao.com</p>
                            </FormItem>       
                          </Col>
                        </Row>
                        <Row :gutter="16">
                          <Col span="12">
                            <FormItem label="联系人邮箱" prop="mail">
                              <Input v-model="formTop.mail"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem label="备注" prop="message">
                              <Input v-model="formTop.message"></Input>
                            </FormItem>
                          </Col>
                          </Row>     
                          <Row :gutter="16">                    
                          <Col span="12">
                            <FormItem label="审核状态" prop="state">
                                <Select v-model="states[1]">
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
                      <FormItem label="推荐置顶" prop="state">
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
                                v-model="formTop.sort"
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
                          <Button type="primary" long @click="handleSubmit()"
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
        <div>
          <Table
            ref="selection"
            :columns="columns"
            :data="datas"
            @on-selection-change="changeSelect"
          ></Table>
        </div>
        <Modal v-model="modal2" title="修改" :styles="{ top: '0px', width: '780px' }">
          <div :class="{ modal_body }">
          <Form
            :model="formTop"
            label-position="top"
            :rules="ruleValidate"
          >
            <Row :gutter="16">
              <Col span="24">
                <FormItem label="编号" prop="id">
                  <Input v-model="this.updatelist.id" disabled></Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="网站名称" prop="name">
                  <Input v-model="this.updatelist.name"></Input>
                  <p>示例：一度好</p>
                </FormItem>
              </Col>
                <Col span="12">
                <FormItem label="网站网址" prop="address">
                  <Input v-model="this.updatelist.address"></Input>
                  <p>示例：http://www.yiduhao.com</p>
                </FormItem>       
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="联系人邮箱" prop="mail">
                  <Input v-model="formTop.mail"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="备注" prop="remark">
                  <Input v-model="this.updatelist.remark"></Input>
                </FormItem>
              </Col>
              </Row>     
              <Row :gutter="16">                    
              <Col span="12">
                <FormItem label="审核状态" prop="state">
                    <Select v-model="states[1]">
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
          <FormItem label="推荐置顶" prop="state">
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
                    v-model="formTop.sort"
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
              <Button type="primary" long @click="handleSubmitTwo()"
                >提交</Button
              >
            </Col>
            <Col span="8">
              <Button long @click="modal2 = false">关闭</Button>
            </Col>
          </Row>
        </div>
        </Modal>
      </div>
    </Content>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
 getFriendlyLink
} from "../../axios/api.js";
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
      pageSpan: "pageSpan",
      addbutton:"addbutton",
       modal_body:" modal_body",
      formItem: { 
          id: "", 
          name: "",
          state:"", 
          date1: "", 
          date1: "",
          context:"",
          mail:"",
          source:"",
          ip:"",
          showhide:"",
          handle:"" 
        },
      formTop: {
        name: "",
        address: "",
        mail:"",
        message:"",
        state:"",
        istop:"",
        showhide:"",
        sort:0
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message:"网站名称不能为空！",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message:"网站网址不能为空！",            
            trigger: "blur",
          },
        ],
      },
      states: ["待审(0)", "通过(1)", "封杀(2)"],
      sources:["后台(0)","前台(1)"],
      explain:"explain",
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      page_box: "page_box",
      batch:"batch",
      updatelist: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "left",
          trueValue: true,
        },
        {
          title: "编号",
          width: 60,
          align: "left",
          key: "id",
        },

        {
          title: "网站名称",
          key: "name",
          align: "left",
        },
        {
          title: "网站网址",
          key: "address",
          align: "left",
          width: 300,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.address
              ),
              h(
                "a",
                {
                  attrs:{
                      href:"http://seo.chinaz.com/http://www.yiduhao.cn/services/webhosting/twhost.asp",
                      target:"_blank",   //跳转到新窗口打开
                  },
                  style: {
                     color: "#337ab7",                  
                  },
                },
                "查看SEO"
              )
            ]);
          }
        },
        {
          title: "审核状态",
          align: "left",
          key: "state",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#5cb85c",
                  },
                },
                params.row.state
              ),
            ]);
          },
        },
        {
          title: "显示隐藏",
          // width: 90,
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
          title: "备注",
          align: "left",
          key: "remark",
        },
        {
          title: "添加时间",
          // width: 90,
          align: "left",
          key: "addtime",
        },
        {
          title: "操作",
          key: "content",
          width: 130,
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
                       this.show(params.index)
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
                  on: {
                    click: () => {
                      this.remove(params.index);
                    },
                  },
                },
                "删除"
              )
            ]);
          },
        },
      ],
      datas: [{id:""}],
      updatelist:"",
      modal1: false,
      modal2: false,
    };
  },
  computed:{
    ...mapState('moduleModule',{
      Friendsdrops: 'Friendsdrops',
      pageList: 'pageList',
      sticks:'sticks',
      shows:'shows',
      })
  },
  methods: {
    // 蓝色图标的刷新
    updatePage() {
      this.$router.go(0);
    },
    //批量审核
    handleBatch() {
      if (this.selectCount <= 0) {
        this.$Modal.warning({
          title: "消息",
          content: "请至少选择一项",
        });
        return;
      } else {
        this.$Modal.confirm({
          title: "消息",
          content: "您正在进行批量操作！确定操作吗？",
          onOk: () => {
            // 操作失败
            this.$Message.error("操作失败，仅供后台演示！");
          },
        });
      }
    },
    // 搜索按钮 
    searchDatas() {
      if (this.formItem.id === "") {
        this.$Message.warning("搜索内容不能为空")
      } else {
        getFriendlyLink(this.formItem.id)
        .then((res) => {
          //splice( 添加或删除的开始位置, 删除的元素个数, 添加的元素(删除后想要在原位置替换的值) )
          this.datas.splice(0,this.datas.length,res);
        })
        .catch((err) => {
          this.datas = []
        });
      }
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
    handleDrop() {
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
          },
        });
      }
    },
    //添加弹框的提交
    handleSubmit() {
    if (this.formTop.name == "") {
          this.$Modal.warning({ title: "消息", content: "请输入网站名称" });
        }else if (this.formTop.address == "") {
          this.$Modal.warning({ title: "消息", content: "请输入网站网址" });
      } else {
        this.$Message.error("操作失败，仅供后台演示");
      }
    },
    //表格修改按钮弹框的提交
    handleSubmitTwo() {
        this.$Message.error("操作失败，仅供后台演示");
    },
    //table表格数据
    getFriendlyLink() {
      getFriendlyLink()
        .then((res) => {
          this.datas = res;
          // console.log(res);
          // console.log(datas);
        })
        .catch((err) => {});
    },
    //修改按钮的数据
    show(index) {
        this.updatelist = this.datas[index]
        console.log(this.updatelist)
        this.modal2 = true;
    },
    // table表格中的删除按钮
    remove(index) {
      this.datas.splice(index, 1);
    },
  },
  created() {
    this.getFriendlyLink()
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
.center_box {
  label {
    font-size: 14px;
    color: #17233d;
    font-weight: 700;
  }
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
.batch {
    margin-left: -10px;
}
.page_box {
  margin-top: 20px;
  margin-bottom: 30px;
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
.explain {
  height: 90px;
  padding: 20px 0px;
  border-bottom: 1px solid #dddddd;
  p {
      color: #a94442;
      padding-top: 10px;
  }
}
.modal_body {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>