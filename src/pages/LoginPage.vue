<template>
  <div class="showMe">这是展示自己的一个动画</div>
  <el-row :gutter="20">
    <el-col :xs="12" :sm="8" :md="6">
      <div class="rightCard">展示1</div>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12">
      <div class="leftCard">展示2</div>
      <div ref="chartContainer" class="chart-container"></div>
    </el-col>
    <el-col :xs="12" :sm="8" :md="6">
      <div class="rightCard">展示1</div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 图表容器引用
const chartContainer = ref<HTMLDivElement | null>(null)
let myChart: echarts.ECharts | null = null

const initChart = () => {
  if (chartContainer.value) {
    const chartDom = chartContainer.value
    myChart = echarts.init(chartDom)
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    }
    myChart.setOption(option)
  }
}

// 防抖函数，优化 resize 性能
const debounce = (fn: Function, delay: number) => {
  let timer: number | null = null
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

// 调整图表大小
const resizeChart = () => {
  if (myChart) {
    myChart.resize()
  }
}

// 监听窗口大小变化
const handleResize = debounce(resizeChart, 200)

onMounted(() => {
  nextTick(() => {
    initChart()
    window.addEventListener('resize', handleResize)
  })
})

onUnmounted(() => {
  // 清理事件监听和图表实例
  window.removeEventListener('resize', handleResize)
  if (myChart) {
    myChart.dispose()
  }
})
</script>

<style scoped>
/* 动画展示 */
.showMe {
  display: flex;
  justify-content: center;
  margin: 20px;
  background-color: brown;
  padding: 20px;
  border-radius: 15px;
}

/* 网格间距 */
.el-row {
  margin-bottom: 20px;
}

/* 卡片样式 */
.leftCard,
.rightCard {
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}
.leftCard {
  background-color: aqua;
  margin-bottom: 20px;
}
.rightCard {
  background-color: cadetblue;
}

/* 图表容器 */
.chart-container {
  width: 100%;
  height: 50vh; /* 使用视口高度，动态调整 */
  min-height: 300px; /* 最小高度 */
  max-height: 600px; /* 最大高度 */
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .chart-container {
    height: 40vh;
  }
}

@media (max-width: 768px) {
  .chart-container {
    height: 30vh;
  }
}
</style>
