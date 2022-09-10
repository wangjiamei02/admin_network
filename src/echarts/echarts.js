//引入echarts核心模块,核心模块提供了echarts使用必须要的接口
import * as echarts from "echarts/core";

//引入需要使用的图表,图表后缀名都为Chart
import {
    BarChart,
    LineChart,
    PieChart,
} from "echarts/charts";

//引入提示框,标题,直角坐标系,数据集,内置数据转化器等需要展示的组件,组件后缀名都为Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    ToolboxComponent,
} from "echarts/components";

//引入标签自动布局,全局过渡动画等特性
import { LabelLayout,UniversalTransition } from "echarts/features";

//引入Canvas渲染器,注意引入CanvasRenderer 或者SVGRenderer是必须的一步！！！
import { CanvasRenderer } from "echarts/renderers";

//注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    ToolboxComponent,
    BarChart,
    LineChart,
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
]);

//导出
export default echarts;