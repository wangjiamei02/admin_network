<template>
  <div>
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
</template>

<script>
import { getArea } from "../../axios/api.js";
export default {
  data() {
    return {
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
      updatelist:""
    };
  },
  methods: {
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
      this.$router.push({ name: "areatwo" });
    },
    //提交按钮
    handleSubmit() {
        this.$Message.error("操作失败，仅供后台演示");
    }
  },
  created() {
    this.getArea();
  },
};
</script>

<style lang="less" scoped>
.modal_body {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>