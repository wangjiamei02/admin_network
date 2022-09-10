<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem
        >昨天与今日访问统计</BreadcrumbItem
      >
    </Breadcrumb>
    <Content :class="{ content }">
      <div :class="{ center_box }">
        <Row>
          <Col span="24">
            <p :class="{ charts_p }">折线图</p>
            <div id="line_charts"></div>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <p :class="{ charts_p }">柱状图</p>
            <div id="bar_charts"></div>
          </Col>
        </Row>
      </div>
    </Content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "content",
      center_box: "center_box",
      update: "update",
      charts_p: "charts_p",
    };
  },
  mounted() {
    this.lineCharts();
    this.barCharts();
  },
  methods: {
    updatePage() {
      this.$router.go(0);
    },
    lineCharts() {
      var lineCharts = this.$echarts.init(
        document.getElementById("line_charts")
      );
      var option = {
        //标题组件
        textStyle: {
          // color:'black'
        },
        title: {
          left: "center",
          text: "昨天与今日访问统计",
          subtext: "访问量",
          textStyle: {
            fontWeight: "normal",
            color: "black",
          },
        },
        //提示框组件
        tooltip: {},
        //工具配置项
        toolbox: {
          right: "60",
          feature: {
            saveAsImage: {},
          },
        },
        //图例
        legend: {
          left: "center",
          bottom: "1%",
        },
        //直角坐标系 grid 中的 x 轴
        xAxis: {
          data: [
            "00:00~02:00",
            "02:00~04:00",
            "04:00~06:00",
            "06:00~08:00",
            "08:00~10:00",
            "10:00~12:00",
            "12:00~14:00",
            "14:00~16:00",
            "16:00~18:00",
            "18:00~20:00",
            "20:00~22:00",
            "22:00~24:00",
          ],
        },
        //直角坐标系 grid 中的 y 轴
        yAxis: {
          type: "value",
        },
        //系列(决定图表类型)
        series: [
          {
            name: "昨天",
            type: "line",
            data: [49, 70, 44, 58, 120, 194, 104,287,141,78,93,65],
            //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
            label: {
              //是否显示标签
              show: true,
              //标签的位置
              position: "top",
            },
            //高亮状态和标签样式。
            emphasis: {
                //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。
                focus: 'series' // 聚焦当前高亮的数据所在的系列的所有图形。
            },
          },
          {
            name: "今日",
            type: "line",
            data: [74, 45, 54, 58, 0, 0, 0,0, 0, 0,0, 0],
            label: {
              show: true,
              position: "top",
            },
            //高亮状态和标签样式。
            emphasis: {
                //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。
                focus: 'series' // 聚焦当前高亮的数据所在的系列的所有图形。
            },
          },
        ],
      };
      lineCharts.setOption(option);
      window.addEventListener("resize", function () {
        lineCharts.resize();
      });
    },
    barCharts() {
      var barCharts = this.$echarts.init(document.getElementById("bar_charts"));
      var option = {
        //标题组件
        textStyle: {
          // color:'black'
        },
        title: {
          left: "center",
          text: "昨天与今日访问统计",
          subtext: "访问量",
          textStyle: {
            fontWeight: "normal",
            color: "black",
          },
        },
        //提示框组件
        tooltip: {},
        //工具配置项
        toolbox: {
          right: "60",
          feature: {
            saveAsImage: {},
          },
        },
        //图例
        legend: {
          left: "center",
          bottom: "1%",
        },
        //直角坐标系 grid 中的 x 轴
        xAxis: {
          data: [
            "00:00~02:00",
            "02:00~04:00",
            "04:00~06:00",
            "06:00~08:00",
            "08:00~10:00",
            "10:00~12:00",
            "12:00~14:00",
            "14:00~16:00",
            "16:00~18:00",
            "18:00~20:00",
            "20:00~22:00",
            "22:00~24:00",
          ],
        },
        //直角坐标系 grid 中的 y 轴
        yAxis: {
          type: "value",
        },
        //系列(决定图表类型)
        series: [
          {
            name: "昨天",
            type: "bar",
            data: [49, 70, 44, 58, 120, 194, 104,287,141,78,93,65],
            //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
            label: {
              //是否显示标签
              show: true,
              //标签的位置
              position: "top",
            },
            //高亮状态和标签样式。
            emphasis: {
                //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。
                focus: 'series' // 聚焦当前高亮的数据所在的系列的所有图形。
            },
          },
          {
            name: "今日",
            type: "bar",
            data: [74, 45, 54, 58, 0, 0, 0,0, 0, 0,0, 0],
            label: {
              show: true,
              position: "top",
            },
            //高亮状态和标签样式。
            emphasis: {
                //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。
                focus: 'series' // 聚焦当前高亮的数据所在的系列的所有图形。
            },            
          },
        ],
      };
      barCharts.setOption(option);
      window.addEventListener("resize", function () {
        barCharts.resize();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 24px;
  min-height: 280px;
  background-color: #fff;
}
.center_box {
  border-radius: 4px;
  padding: 0px 0px 66px 0px;
  p {
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
#line_charts {
  width: 90%;
  height: 440px;
  margin-bottom: 50px;
}
#bar_charts {
  width: 90%;
  height: 440px;
}
.charts_p {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  height: 38px;
  background-color: #d9edf7;
  padding-top: px;
  line-height: 38px;
  margin-bottom: 16px;
  padding-left: 8px;
  font-weight: 900;
}
</style>