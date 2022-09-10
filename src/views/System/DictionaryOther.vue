<template>
    <div>
    <div :class="{ page_box }">
      <Row>
        <Col span="24">
          <Row>
            <Col span="22">
              <Button type="error" @click="allDelete">批量删除</Button>
            </Col>
            <Col span="2">
              <span :class="{ pageSpan }"
                >每页20条/共{{this.datas.length}}条</span>
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
    </div>
</template>

<script>
import { getDictionaryList } from "../../axios/api.js";
export default {
  data() {
    return {
      page_box:"page_box",
      pageSpan: "pageSpan",
      datas: [],
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
          title: "父编号",
          align: "left",
          key: "fatherid",
        },
        {
          title: "名称",
          align: "left",
          key: "name",
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
          title: "添加日期",
          align: "left",
          key: "addtime",
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
            ]);
          },
        },
      ],
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
    }
  },  
  methods: {
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
    // 表格数据
    getDictionaryList() {
      getDictionaryList(8)
        .then((res) => {
          console.log(res);
        //   这里不能直接给 datas 赋值
        //   经过打印 res 之后才知道，后台返回的 res 是一个对象，而表格需要的是数组
        //   说明不应该遍历转数组，直接在空数组 push 这个对象即可
          this.datas.push(res);
        })
        .catch((err) => {});
    },
    // table表格中的删除按钮
    remove(index) {
      this.datas.splice(index, 1);
    },
  },
  created() {
      this.getDictionaryList()
  }
};
</script>
<style lang="less" scoped>
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
</style>