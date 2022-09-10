<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <!-- <BreadcrumbItem>Components</BreadcrumbItem> -->
      <BreadcrumbItem>新闻列表</BreadcrumbItem>
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
                  <FormItem label="推荐置顶">
                    <Select v-model="formItem.sticks">
                      <Option
                        v-for="stick in sticks"
                        :value="stick"
                        :key="stick"
                        >{{ stick }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="每页显示">
                    <Select v-model="pageList[2]">
                      <Option v-for="page in pageList" :value="page" :key="page"
                        >{{ page }}条</Option
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
                  <FormItem label="标题">
                    <Input v-model="formItem.title" placeholder=""></Input>
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
                  <FormItem label="是否原创">
                    <Select v-model="formItem.originals">
                      <Option
                        v-for="original in originals"
                        :value="original"
                        :key="original"
                        >{{ original }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="9">
                  <Row :gutter="16">
                    <FormItem label="分类">
                      <Col span="11">
                        <Select v-model="formItem.itemone" @on-change="change">
                          <Option
                            v-for="item in SelectList"
                            :key="item.id"
                            :value="item.id"
                            >{{ item.title }}</Option
                          >
                        </Select>
                      </Col>
                      <Col span="11">
                        <Select v-model="formItem.itemtwo">
                          <Option
                            v-for="item in childrens"
                            :key="item.id"
                            :value="item.id"
                            >{{ item.title }}</Option
                          >
                        </Select>
                      </Col>
                    </FormItem>
                  </Row>
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
                <Button type="primary" @click="searchDatas()">搜索</Button>
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
                  <Dropdown trigger="click" style="margin-left: 20px">
                    <a href="javascript:void(0)">
                      <Button type="primary" :class="{batch}" @click="handleBatch">
                        批量操作
                        <Icon type="ios-arrow-down"></Icon>
                      </Button>
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem v-for="drop in newsDrops" :key="drop">{{
                        drop
                      }}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Button type="success" :class="{ addbutton }" @click="addList"
                    >添加</Button
                  >
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
        <!-- 详情按钮 -->
        <Modal
          v-model="modal"
          title="详情"
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
      </div>
    </Content>
  </div>
</template>

<script>
import { getNews,getItemize,deleteData,UpdateListData,newsSearch } from "../../axios/api.js";
import { mapState,mapMutations } from 'vuex'
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
      input_box: "input_box",
      page_box: "page_box",
      addbutton: "addbutton",
      batch:"batch",
      modal_body:"modal_body",
      modal:false,
      formItem: { 
        id: "", 
        sticks: "", 
        date1: "", 
        date1: "",
        title:"",
        showhide:"",
        originals:"",
        itemone:"",
        itemtwo:"" 
      },
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      updatelist: [], //表格修改页面数据
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          trueValue: true,
        },
        {
          title: "编号",
          width: 60,
          align: "left",
          key: "id",
          sortType:"desc" //设置初始化排序。值为 asc 和 desc
        },

        {
          title: "缩略图",
          key: "img",
          width: 90,
          align: "left",
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.img
                },
                style: {
                  width: "70px",
                  height: "70px",
                  paddingTop: "6px",
                  paddingRight: "6px",
                },
              }),
            ]);
          },
        },
        {
          title: "标题",
          key: "title",
          width: 100,
          align: "left",
          // tooltip:true,
          // ellipsis: true, //开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件(文字提示)显示完整内容
          render: (h, params) => {
            let texts = params.row.title
            if (params.row.title != null) {
              if (params.row.title.length > 9) {
                texts = params.row.title.slice(0, 9) + '...' // 进行数字截取
              } else {
                texts = params.row.title
              }
            }
            return h("div", [
              h(
                "Tooltip",

                {
                 props: {
                  placement: 'top',
                  transfer: true
                },
                  style: {
                    color: "#337ab7",
                    cursor: "pointer"
                  },
                },
                [texts, h('span', {
                slot: 'content',
                style: {
                  whiteSpace: 'normal'
                }
              }, params.row.title)]
              ),
            ]);
          },
        },
        {
          title: "分类",
          align: "left",
          key: "itemize",
          width: 110,
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                params.row.itemone
              ),
              h(
                "p",
                params.row.itemtwo
              ),
            ]);
          },
        },
        {
          title: "推荐置顶",
          align: "left",
          key: "istop",
          width: 90,
        },
        {
          title: "显示隐藏",
          align: "left",
          key: "showhide",
          width: 90,
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
          title: "是否内测",
          width: 90,
          align: "left",
          key: "test",
        },
        {
          title: "是否原创",
          align: "left",
          key: "original",
          width: 90,
        },
        {
          title: "评论",
          align: "left",
          key: "comment",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#337ab7",
                  },
                },
                params.row.comment
              ),
            ]);
          },
        },
        {
          title: "阅读",
          align: "left",
          key: "read",
          width: 60,
        },
        {
          title: "添加时间",
          align: "left",
          key: "addtime",
          width: 90,
          
        },
        {
          title: "排序",
          align: "left",
          key: "sort",
          width: 60,
        },
        {
          title: "操作",
          key: "content",
          width: 140,
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
                  style:{
                    marginTop:"5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],
      datas: [],  //table表格数据
      details:"", //详情按钮数据
      SelectList: [],   //一级联动
      childrens: "",  //二级联动
    };
  },
  computed:{
    ...mapState('moduleModule',{
      sticks: 'sticks',
      pageList: 'pageList',
      shows: 'shows',
      originals:'originals',
      newsDrops:'newsDrops'
      
      })
  },
  methods: {
      ...mapMutations('moduleModule',[
            'updatePage'
        ]),
    // 蓝色图标的刷新
    updatePage() {
      this.$router.go(0);
    },
    // 搜索按钮 
    searchDatas() {
      //使用SQL语句根据字段搜索-------------------------
      if(this.formItem.id === "") {
        this.$Message.warning("搜索内容不能为空")
      } else {
      newsSearch({formItem:this.formItem.id})
      .then((res) => {
        this.datas.splice(0,this.datas.length,res);
        console.log(this.datas);
      })
      .catch((err) => {
        this.datas = []
      })
      }
      //根据id值搜索-----------------------------------
      // if (this.formItem.id === "") {
      //   this.$Message.warning("搜索内容不能为空")
      // } else {
      //   UpdateListData(this.formItem.id)
      //   .then((res) => {
      //     //splice( 添加或删除的开始位置, 删除的元素个数, 添加的元素(删除后想要在原位置替换的值) )
      //     this.datas.splice(0,this.datas.length,res);
      //   })
      //   .catch((err) => {
      //     this.datas = []
      //   });
      // }
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
            // let ids = "";
            //遍历已选项数据
            // this.selectList.forEach(function(data) {
            //ids等于已选项数据的id 加','
            //   ids += data.id + ",";
            // });
            //substring()的作用就是截取父字符串的某一部分
            //假如已选项数据的id是 1 结果就为 1,
            //调用substring()方法,从0开始,截取个数为ids的长度减1也就是(2-1),ids的结果为 1
            //假如已选项数据的id是 1和2 结果就为 1,2,
            //调用substring()方法,从0开始,截取个数为ids的长度减1也就是{4-1},ids结果为 1,2
            // ids = ids.substring(0, ids.length - 1);
            //批量删除
            // deleteData(this.ids).then(res => {
            //   if (res.success) {
            //     this.$Message.success("操作成功");
            //     this.clearSelectAll();
            //     this.getDataList();
            //   }
            // });
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
    // 添加按钮
    addList() {
      this.$router.push({ name: "newsadd" });
    },
    //二级联动数据
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
    //二级联动
    change(value) {
      for (var i = 0; i < this.SelectList.length; i++) {
        if (value == this.SelectList[i].id) {
          this.childrens = this.SelectList[i].childrens;
        }
      }
      // console.log(this.childrens);
    },
    //table表格数据
    getNews() {
      getNews()
        .then((res) => {
          this.datas = res;
          // console.log(res);
          // console.log(datas);
        })
        .catch((err) => {});
    },
    // table表格中的详情按钮
    show(index) {
      this.details = this.datas[index]
      this.modal = true;
    },
    // table表格中的删除按钮
    remove(index) {
      this.datas.splice(index, 1);
    },
    // table表格中的修改按钮
    updateList(index) {
      UpdateListData(this.datas[index].id).then((res) => {
        this.updatelist = res;
        this.$router.push({
          name: "newsupdate",
          query: {
            // name:'wjm'
            updatelist: JSON.stringify(this.updatelist),
            // updatelist: this.updatelist,
          },
        });
        console.log(this.updatelist);
      });
    },
  },
  //一般来说我们都希望在页面渲染之前就将数据请求下来并保存下来。
  created() {
    //所以我们在生命周期函数create()中调用我们写好的函数，这里为了结构清晰我们将函数抽离在methods中。
    this.getNews();
    this.getItemize();
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
}
</style>