<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>操作日志</BreadcrumbItem>
    </Breadcrumb>
    <Content :class="{ Content }">
      <div :class="{ center_box }">
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
                  <FormItem label="操作者用户名">
                    <Input v-model="formItem.user" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="操作者姓名">
                    <Input v-model="formItem.name" placeholder=""></Input>
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
                  <FormItem label="操作页面">
                    <Input v-model="formItem.page" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="操作IP">
                  <Input v-model="formItem.ip" placeholder=""></Input>                   
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="所属模块">
                    <Select v-model="formItem.modules">
                      <Option
                        v-for="item in modules"
                        :value="item"
                        :key="item"
                        >{{ item }}</Option
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
            <div :class="{ header_box }">
              <Row :gutter="16">
                <Col span="5">
                  <FormItem label="操作URL">
                    <Input v-model="formItem.url" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="操作内容">
                    <Input v-model="formItem.context" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="操作结果">
                    <Input v-model="formItem.result" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="每页显示">
                    <Select v-model="formItem.pageModel" placeholder="20条">
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
        <div :class="{ page_box }">
          <Row>
            <Col span="24">
              <Row>
                <Col span="22">
                  <Dropdown trigger="click">
                    <a href="javascript:void(0)">
                      <Button type="error" @click="allDelete">
                        批量删除
                        <Icon type="ios-arrow-down"></Icon>
                      </Button>
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem v-for="drop in drops" :key="drop">{{
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
          <!-- 操作系统 -->
        <!-- Table表格中用户名弹框 -->
        <Modal
          v-model="modal1"
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
                <th>操作页面</th>
                <td>{{this.details.page}}</td>
              </tr>
               <tr>
                <th>操作内容</th>
                <td></td>
              </tr>
              <tr>
                <th>所属模块</th>
                <td>{{this.details.modules}}</td>
              </tr> 
              <tr>
                <th>操作系统</th>
                <td>{{this.details.system}}</td>
              </tr>
              <tr>
                <th>操作系统全部</th>
                <td>{{this.details.system}}</td>
              </tr> 
              <tr>
                <th>操作时间</th>
                <td>{{this.details.handletime}}</td>
              </tr>
               <tr>
                <th>操作IP</th>
                <td>{{this.details.ip}}</td>
              </tr>            
            </table>          
          </div>
          <div slot="footer">
            <Row type="flex" justify="center" :gutter="24">
              <Col span="12">
                <Button long @click="updatePage()">刷新</Button>
              </Col>
              <Col span="12">
                <Button long @click="modal1 = false">关闭</Button>
              </Col>
            </Row>
          </div>
        </Modal>
        </div>       
      </div>
    </Content>
  </div>
</template>

<script>
import { getHandle } from "../../axios/api"
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
      modal_body:"modal_body",
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      formItem: {
        id: "",
        user:"",
        name:"",
        date1:"",
        date2:"",
        handle:"",
        ip:"",
        modules:"",
        page:"",
        url:"",
        context:"",
        result:"",
        pageModel:""
      },
      handles: ["android","ipad", "iphone", "ipod","linux","macintosh","other","unix","windows"],
      pageList: [5, 10, 20, 50, 100, 200, 300, 500, 1000, 2000, 5000, 8000],
      modules:["mydemo"],
      drops:["批量删除","删除5天前的记录","删除10天前的记录","删除30天前的记录","删除90天前的记录","删除180天前的记录","删除360天前的记录",],
      pageSpan: "pageSpan",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "left",
          trueValue: true,
        },
        {
          title: "编号",
          width: 100,
          align: "left",
          key: "id",
        },

        {
          title: "操作人员/操作页面/操作URL/操作内容",
          width: 360,
          align: "left",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                ["【操作人员】",
                h(
                    "span",
                    params.row.people
                )]
              ),
              h(
                "p",
                ["【操作页面】",
                h(
                    "span",
                    params.row.page
                )],
              ),
              h(
                "p",
                ["【操作URL】",
                h(
                    "span",
                    params.row.url
                
                )]
              )
            ]);
          },
        },
        {
          title: "所属模块",
          key: "modules",
          align: "left",
        },
        {
          title: "操作IP",
          key: "ip",
          align: "left",
          width: 250,
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                params.row.ip
              ),
              h(
                "a",
                {
                  attrs:{
                      href:"http://ip.tool.chinaz.com/101.26.119.151",
                      target:"_blank",   //跳转到新窗口打开
                  },
                  style: {
                     color: "#337ab7",                  
                  },
                },
                "点击查询"
              )
            ]);
          }
        },
        {
          title: "操作系统",
          align: "left",
          key: "system",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                {
                  style: {
                    color: "#337ab7",
                    cursor:"pointer"
                  },
                  on: {
                    click: () => {
                      this.handleDetails(params.index);
                    },
                  },
                },
                params.row.system
              ),
            ]);
          },
        },
        {
          title: "操作时间",
          align: "left",
          key: "handletime",
        },
      ],
      datas: [],
      modal1:false,
      details:""
    };
  },
  methods: {
    // 蓝色图标的刷新
    updatePage() {
      this.$router.go(0);
    },
    // 搜索按钮 
    searchDatas() {
      if (this.formItem.id === "") {
        this.$Message.warning("搜索内容不能为空")
      } else {
        getHandle(this.formItem.id)
        .then((res) => {
          //splice( 添加或删除的开始位置, 删除的元素个数, 添加的元素(删除后想要在原位置替换的值) )
          this.datas.splice(0,this.datas.length,res);
        })
        .catch((err) => {
          this.datas = []
        });
      }
    },
    //点击操作系统弹框
    handleDetails(index) {
      this.details = this.datas[index]
      this.modal1 = true
      console.log(this.details);
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
    // on-selection-change事件
    //只要选中项发生变化时就会触发 返回:已选项数据
    changeSelect(data) {
      //selectList = 已选项数据
      this.selectList = data;
      //selectCount = 已选项数据的长度
      this.selectCount = data.length;
    },
    //添加弹框的确定
    ok() {
      this.$Message.error("操作失败，仅供后台演示");
    },
    //table表格数据
    getHandle() {
      getHandle()
        .then((res) => {
          this.datas = res;
          console.log(this.datas);
        })
        .catch((err) => {});
    },

  },
  created() {
      this.getHandle()
  }
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
.addbutton {
  margin-left: 10px;
}
.modal_body {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  th {
    width: 100px;
  }
}
</style>