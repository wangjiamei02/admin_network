<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>留言列表</BreadcrumbItem>
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
                  <FormItem label="昵称">
                    <Input v-model="formItem.name" placeholder=""></Input>
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
                  <FormItem label="留言内容">
                    <Input v-model="formItem.context" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="邮箱">
                    <Input v-model="formItem.mail" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="留言来源">
                    <Select v-model="formItem.source">
                      <Option v-for="source in sources" :value="source" :key="source"
                        >{{ source }}</Option
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
            <div :class="{ header_box }">
              <Row :gutter="16">
                <Col span="5">
                  <FormItem label="留言IP">
                    <Input v-model="formItem.ip" placeholder=""></Input>
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
        <!-- 说明 -->
       <div :class="{ explain }">
           <h5>说明:</h5>
           <p>封杀：不显示留言；黑名单：不显示留言，限制发言</p>
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
                      <DropdownItem v-for="drop in messagesDrops" :key="drop" :name="drop">{{
                        drop
                      }}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
        <!-- 表格来源-查看 -->
        <Modal
          v-model="modal"
          title="文章详情【一】"
          :styles="{ top: '0px', width: '780px' }"
          :data="datas"
        >
          <div :class="{ modal_body }">
            <h3>{{this.details.title}}</h3>
            <h4>ID:{{this.details.id}} 发表时间:{{this.details.addtime}} 阅读量:{{this.details.read}}</h4>
            <p>{{this.details.content}}</p>
          </div>
          <div slot="footer">
            <Row type="flex" justify="center" :gutter="24">
              <Col span="12">
                <Button long @click="updatePage()">刷新</Button>
              </Col>
              <Col span="12">
                <Button long @click="modal = false">关闭</Button>
              </Col>
            </Row>
          </div>
        </Modal>
        <!-- 详情按钮 -->
        <Modal
          v-model="modal2"
          title="详情"
          :styles="{ top: '0px', width: '780px' }"
          :data="datas"
        >
          <div :class="{ modal_body }">
            <table>
              <tr>
                <th>编号</th>
                <td>{{this.details.id}}</td>
              </tr>
              <tr>
                <th>昵称</th>
                <td>{{this.details.name}}</td>
              </tr>
               <tr>
                <th>邮箱</th>
                <td>{{this.details.mail}}</td>
              </tr>
              <tr>
                <th>留言时间</th>
                <td>{{this.details.time}}</td>
              </tr> 
              <tr>
                <th>留言内容</th>
                <td>{{this.details.content}}</td>
              </tr>
              <tr>
                <th>来源页面/IP</th>
                <td>{{this.details.source}}</td>
              </tr>
               <tr>
                <th>回复</th>
                <td>{{this.details.reply}}</td>
              </tr> 
              <tr>
                <th>操作系统</th>
                <td>{{this.details.handle}}</td>
              </tr>
               <tr>
                <th>操作系统详情</th>
                <td></td>
              </tr>            
            </table>          
          </div>
          <div slot="footer">
            <Row type="flex" justify="center" :gutter="24">
              <Col span="12">
                <Button long @click="updatePage()">刷新</Button>
              </Col>
              <Col span="12">
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
  getMessage,
  messageCheck,
  UpdateMessageData
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
      page_box: "page_box",
      batch:"batch",      
      explain:"explain",
      modal_body:"modal_body",
      formItem: { id: "", name: "",state:"", date1: "", date1: "",context:"",mail:"",source:"",ip:"",showhide:"",handle:"" },
      sources:["message","news"],
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
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
          title: "留言信息",
          key: "information",
          width: 360,
          align: "left",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                ["【昵称】",h("span",params.row.name)]
              ),
              h(
                "p",
                ["【邮箱】",h("span",params.row.mail)]
              ),
              h(
                "p",
                ["【来源】",h("span",params.row.source)]
              ),    
              h(
                "p",
                ["【IP值】",h("span",params.row.ip)]
              ),
              h(
                "p",
                ["【内容】",h("span",params.row.content)]
              ),           
            ]);
          }
        },
        {
          title: "来源",
          key: "sourcetitle",
          align: "left",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                params.row.sourcetitle
              ),
              h(
                "p",
                {
                  style: {
                     color: "#337ab7",                  
                     cursor:"pointer"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    },
                  },
                },
                "查看"
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
                    color: "#d9534f",
                  },
                },
                params.row.state
              ),
            ]);
          },
        },
        {
          title: "回复",
          align: "left",
          key: "reply",
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
          title: "操作系统",
          // width: 90,
          align: "left",
          key: "system",
        },
        {
          title: "留言时间",
          // width: 90,
          align: "left",
          key: "time",
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
                      this.updateList(params.index);
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
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginTop: "5px",
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.handleDetails(params.index);
                    },
                  },
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginTop: "5px",
                  },
                  on: {
                    click: () => {
                      this.reply(params.index);
                    },
                  },
                },
                "回复"
              ),
            ]);
          },
        },
      ],
      datas: [],
      news:[],
      updatelist: "",
      modal:false,
      details:"",
      modal2:false,
    };
  },
  computed:{
    ...mapState('moduleModule',{
      pageList: 'pageList',
      shows: 'shows',
      messagesDrops:'messagesDrops',
      handles:'handles',
      states:'states',
      })
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
        UpdateMessageData(this.formItem.id)
        .then((res) => {
          //splice( 添加或删除的开始位置, 删除的元素个数, 添加的元素(删除后想要在原位置替换的值) )
          this.datas.splice(0,this.datas.length,res);
        })
        .catch((err) => {
          this.datas = []
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
            this.getDataList();
          },
        });
      }
    },

    //table表格数据
    getMessage() {
      getMessage()
        .then((res) => {
          this.datas = res;
          // console.log(res);
          // console.log(datas);
        })
        .catch((err) => {});
    },
    messageCheck() {
      messageCheck(1)
        .then((res) => {
          this.news = res;
          // console.log(res);
          // console.log(datas);
        })
        .catch((err) => {});
    },
    // table表格中的查看
    show(index) {
      this.details = this.news
      this.modal = true
      console.log(this.news);
    },
    // table表格详情按钮
    handleDetails(index) {
      this.details = this.datas[index]
      this.modal2 = true
    },
    // table表格中的删除按钮
    remove(index) {
      this.datas.splice(index, 1);
    },
    // table表格中的回复按钮
    reply(index) {
      this.$Message.error("只有审核通过的才允许回复");
    },
    // table表格中的修改按钮
    updateList(index) {
      UpdateMessageData(this.datas[index].id).then((res) => {
        this.updatelist = res;
        this.$router.push({
          name: "messagesupdate",
          query: {
            updatelist: JSON.stringify(this.updatelist),
          },
        });
        console.log(this.updatelist);
      });
    },
  },
  //一般来说我们都希望在页面渲染之前就将数据请求下来并保存下来。
  created() {
    //所以我们在生命周期函数create()中调用我们写好的函数，这里为了结构清晰我们将函数抽离在methods中。
    this.getMessage(),
    this.messageCheck()
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
  h3 {
    padding: 10px 0px 30px 0px;
  text-align: center;
  }
  h4 {
    padding: 0px 0px 20px 0px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
  p {
    padding: 30px 0px;
  }
  th {
    width: 90px;
  }
}
</style>