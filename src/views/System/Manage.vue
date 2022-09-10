<template>
  <div>
    <Breadcrumb :class="{ breadcrumb }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem :to="{ name: 'manage' }">IP管理</BreadcrumbItem>
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
                  <FormItem label="IP值">
                    <Input v-model="formItem.ip" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="获取状态">
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
                  <FormItem label="IP所属国家">
                    <Input v-model="formItem.country" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="IP所属省">
                    <Input v-model="formItem.province" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="IP所属市">
                    <Input v-model="formItem.city" placeholder=""></Input>
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
        <!-- 说明 -->
        <div :class="{ explain }">
          <h5>说明:</h5>
          <p>
            “批量获取IP地址”时，请先筛选“获取状态”。单条“获取IP地址”时，若“省”或“市”获取不到，请用XX代替
          </p>
        </div>
        <div :class="{ page_box }">
          <Row>
            <Col span="24">
              <Row>
                <Col span="22">
                  <Button type="primary" @click="batchGet">
                    批量获取IP地址
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
        <!-- 表格获取ip地址按钮 弹框 -->
        <Modal
          v-model="modal"
          title="修改"
          :styles="{ top: '0px', width: '780px' }"
        >
        <div :class="{ modal_body }">
          <Form :model="formTop" label-position="top">
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="编号">
                  <Input v-model="this.datas[0].id" disabled></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="IP值">
                  <Input v-model="this.datas[0].ip" disabled></Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="国家">
                  <Input v-model="formTop.country" disabled></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem>
                  <p>
                    IP-API<span @click="handleUseAPI" :class="{ start }"
                      >点击使用</span
                    >
                  </p>
                  <p>
                    {{ address[0].country }}
                    {{ address[0].province }}
                    {{ address[0].city }}
                  </p>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="省份">
                  <Input v-model="formTop.province"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem>
                  <p>
                    淘宝<span @click="handleUseTaoBao" :class="{ start }"
                      >点击使用</span
                    >
                  </p>
                  <p>
                    {{ address[1].country }}
                    {{ address[1].province }}
                    {{ address[1].city }}
                  </p>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="城市">
                  <Input v-model="formTop.city"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem>
                  <p>
                    百度<span @click="handleUseBaiDu" :class="{ start }"
                      >点击使用</span
                    >
                  </p>
                  <p>
                    {{ address[2].country }}
                    {{ address[2].province }}
                    {{ address[2].city }}
                  </p>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
          <div slot="footer">
            <Row type="flex" justify="center" :gutter="24">
              <Col span="8">
                <Button long @click="updatePage">刷新</Button>
              </Col>
              <Col span="8">
                <Button type="primary" long @click="handleSubmit">提交</Button>
              </Col>
              <Col span="8">
                <Button long @click="modal = false">关闭</Button>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    </Content>
  </div>
</template>

<script>
import { getManage } from "../../axios/api";
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
      breadcrumb: "breadcrumb",
      explain: "explain",
      page_box: "page_box",
      pageSpan: "pageSpan",
      modal_body: "modal_body",
      start: "start",
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      formItem: {
        id: "",
        ip: "",
        state: "",
        date1: "",
        date2: "",
        country: "",
        province: "",
        city: "",
        pageModel: "",
      },
      address: [
        {
          country: "中国",
          province: "河北",
          city: "保定",
        },
        {
          country: "中国",
          province: "XX",
          city: "XX",
        },
        {
          country: "中国",
          province: "河北省",
          city: "保定市",
        },
      ],

      formTop: {
        id: "",
        ip: "",
        country: "",
        province: "",
        city: "",
      },
      states: [
        "未获取（0）",
        "已获取（1）",
        "获取失败（2）",
        "已获取（中国）",
        "已获取（外国）",
        "已获取（局域网）",
        "已获取（异常）",
      ],
      pageList: [5, 10, 20, 50, 100, 200, 300, 500, 1000, 2000, 5000, 8000],
      datas: [{id:""}],
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
          title: "ip",
          width: 220,
          align: "left",
          render: (h, params) => {
            return h("div", [
              h(
                "router-link",
                {
                  attrs: {
                    to: "http://localhost:8080/index/system/handle",
                  },
                  style: {
                    color: "#337ab7",
                  },
                },
                params.row.ip
              ),
            ]);
          },
        },
        {
          title: "所属地区",
          key: "area",
          align: "left",
        },
        {
          title: "获取状态",
          key: "state",
          align: "left",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                {
                  style: {
                    color: "rgb(128, 128, 128)",
                  },
                },
                params.row.state
              ),
            ]);
          },
        },
        {
          title: "添加时间",
          align: "left",
          width: 220,
          key: "addtime",
        },
        {
          title: "更新时间",
          align: "left",
          key: "updatetime",
        },
        {
          title: "操作",
          key: "content",
          width: 170,
          align: "left",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.modal = true;
                    },
                  },
                },
                "获取IP地址"
              ),
            ]);
          },
        },
      ],
      modal: false,
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
        getManage(this.formItem.id)
        .then((res) => {
          //splice( 添加或删除的开始位置, 删除的元素个数, 添加的元素(删除后想要在原位置替换的值) )
          this.datas.splice(0,this.datas.length,res);
        })
        .catch((err) => {
          this.datas = []
        });
      }
    },
    // 批量获取IP地址
    batchGet() {
      if (this.selectCount <= 0) {
        this.$Modal.warning({
          title: "消息",
          content: "请至少选择一项",
        });
        return;
      } else {
        this.$Modal.confirm({
          title: "消息",
          content: "批量操作参数缺失",
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
    //table表格数据
    getManage() {
      getManage()
        .then((res) => {
          this.datas = res;
          console.log(this.datas);
        })
        .catch((err) => {});
    },
    //table表格 获取ip地址按钮 点击使用
    handleUseAPI() {
      this.formTop.country = this.address[0].country;
      this.formTop.province = this.address[0].province;
      this.formTop.city = this.address[0].city;
    },
    handleUseTaoBao() {
      this.formTop.country = this.address[1].country;
      this.formTop.province = this.address[1].province;
      this.formTop.city = this.address[1].city;
    },
    handleUseBaiDu() {
      this.formTop.country = this.address[2].country;
      this.formTop.province = this.address[2].province;
      this.formTop.city = this.address[2].city;
    },
    handleSubmit() {
      if (
        this.formTop.country == "" ||
        this.formTop.province == "" ||
        this.formTop.city == ""
      ) {
        this.$Modal.warning({ title: "消息", content: "请选择IP所在地址" });
      } else {
        this.$Message.error("操作失败，仅供后台演示");
      }
    },
  },
  created() {
    this.getManage();
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  margin: 24px 0;
  font-weight: 700;
}
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
.explain {
  height: 90px;
  padding: 20px 0px;
  border-bottom: 1px solid #dddddd;
  p {
    color: #a94442;
    padding-top: 10px;
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
.modal_body {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
.start {
  color: #f00;
  cursor: pointer;
}
</style>