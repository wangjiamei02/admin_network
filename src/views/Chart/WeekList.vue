<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>上周与本周访问统计</BreadcrumbItem>
    </Breadcrumb>
    <Content :class="{ content }">
      <div :class="{ center_box }">
        <Row :gutter="20">
          <Col span="12">
            <p :class="{ charts_p }">折线图</p>
            <div id="line_charts"></div>
          </Col>
          <Col span="12">
            <p :class="{ charts_p }">柱状图</p>
            <div id="bar_charts"></div>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="12">
            <p :class="{ charts_p }">实心饼图</p>
            <div id="pie_charts"></div>
          </Col>
          <Col span="12">
            <p :class="{ charts_p }">环形饼图</p>
            <div id="annular_charts"></div>
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
    this.pieCharts();
    this.annularCharts();
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
          text: "上周与本周访问统计",
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
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
            "星期日",
          ],
        },
        //直角坐标系 grid 中的 y 轴
        yAxis: {
          type: "value",
        },
        //系列(决定图表类型)
        series: [
          {
            name: "上周",
            type: "line",
            data: [1584, 1450, 1435, 1068, 1139, 845, 998],
            //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
            label: {
              //是否显示标签
              show: true,
              //标签的位置
              position: "top",
            },
            emphasis: {
                //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。
                focus: 'series' // 聚焦当前高亮的数据所在的系列的所有图形。
            }, 
          },
          {
            name: "本周",
            type: "line",
            data: [1242, 609, 0, 0, 0, 0, 0],
            label: {
              show: true,
              position: "top",
            },
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
          text: "上周与本周访问统计",
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
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
            "星期日",
          ],
        },
        //直角坐标系 grid 中的 y 轴
        yAxis: {
          type: "value",
        },
        //系列(决定图表类型)
        series: [
          {
            name: "上周",
            type: "bar",
            data: [1584, 1450, 1435, 1068, 1139, 845, 998],
            //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
            label: {
              //是否显示标签
              show: true,
              //标签的位置
              position: "top",
            },
            emphasis: {
                //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。
                focus: 'series' // 聚焦当前高亮的数据所在的系列的所有图形。
            }, 
          },
          {
            name: "本周",
            type: "bar",
            data: [1242, 937, 0, 0, 0, 0, 0],
            label: {
              show: true,
              position: "top",
            },
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
    pieCharts() {
      var pieCharts = this.$echarts.init(document.getElementById("pie_charts"));
      var option = {
        //标题组件
        textStyle: {
          // color:'black'
        },
        title: {
          left: "center",
          text: "上周访问统计",
          textStyle: {
            fontWeight: "normal",
            color: "black",
          },
         subtext: "访问量",
        },
        //提示框组件
        tooltip: {
          show: true,
          //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
          formatter: function (params) {
            return `${params.name}<br>占比：${params.percent}%`;
          },
        },
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
        //系列(决定图表类型)
        series: [
          {
            type: "pie",
            //数组的第一项是内半径，第二项是外半径
            radius: [0, '50%'],
            data: [
              { value: 1584, name: "周一" },
              { value: 1450, name: "周二" },
              { value: 1435, name: "周三" },
              { value: 1068, name: "周四" },
              { value: 1139, name: "周五" },
              { value: 845, name: "周六" },
              { value: 998, name: "周日" },
            ],
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            //饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
            label: {
              show: true,
              //标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行。
              formatter: function (params) {
                return `${params.name} ${params.value}`;
              },
            },
            emphasis: {
                //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。
                focus: 'self' //  只聚焦（不淡出）当前高亮的数据的图形
            }, 
          },
        ],
      };
      pieCharts.setOption(option);
      window.addEventListener("resize", function () {
        pieCharts.resize();
      });
    },
    annularCharts() {
      var annularCharts = this.$echarts.init(
        document.getElementById("annular_charts")
      );
      var option = {
        //标题组件
        title: {
          left: "center",
          text: "上周访问统计",
          textStyle: {
            fontWeight: "normal",
            color: "black",
          },
          subtext: "访问量",
        },
        //提示框组件
        tooltip: {
          show: true,
          //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
          formatter: function (params) {
            return `${params.name}<br>占比：${params.percent}%`;
          },
        },
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
        //系列(决定图表类型)
        series: [
          {
            type: "pie",
            //数组的第一项是内半径，第二项是外半径
            radius: ["26%", "50%"],
            data: [
              { value: 1242, name: "周一" },
              { value: 937, name: "周二" },
              { value: 0, name: "周三" },
              { value: 0, name: "周四" },
              { value: 0, name: "周五" },
              { value: 0, name: "周六" },
              { value: 0, name: "周日" },
            ],
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            //饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
            label: {
              show: true,
              //标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行。
              formatter: function (params) {
                return `${params.name} ${params.value}`;
              },
            },
            emphasis: {
                //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。
                focus: 'self' //  只聚焦（不淡出）当前高亮的数据的图形
            }, 
          },
        ],
      };
      annularCharts.setOption(option);
      window.addEventListener("resize", function () {
        annularCharts.resize();
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
  padding: 0px 0px 56px 0px;
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
#pie_charts {
  width: 90%;
  height: 440px;
}
#annular_charts {
  width: 90%;
  height: 440px;
}
.charts_p {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  height: 38px;
  /* border-top: 1px solid #ddd; */
  background-color: #d9edf7;
  padding-top: px;
  line-height: 38px;
  margin-bottom: 16px;
  padding-left: 8px;
  font-weight: 900;
}
</style>