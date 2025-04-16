<template>
  <div class="showMe">这是展示自己的一个动画</div>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="rightCard">展示1</div>
    </el-col>
    <el-col :span="8">
      <div class="leftCard">展示2</div>
      <div ref="chartContainer" style="width: 100%; height: 400px"></div>
    </el-col>
    <el-col :span="16">
      <div class="rightCard">展示1</div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref<HTMLDivElement | null>(null) // 使用 ref 获取图表容器的 DOM 元素

const initChart = () => {
  if (chartContainer.value) {
    const chartDom = chartContainer.value
    const myChart = echarts.init(chartDom) // 初始化图表

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

    myChart.setOption(option) // 设置图表的选项

    // 监听窗口尺寸变化，调整图表大小
    window.addEventListener('resize', () => myChart.resize())
  }
}

onMounted(() => {
  // 确保 Vue 完成 DOM 渲染后再初始化图表
  nextTick(() => {
    initChart()
  })
})
</script>

<style scoped>
/* 展示自己的一个动画 */
.showMe {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.leftCard {
  background-color: aqua;
}
.rightCard {
  background-color: cadetblue;
}
</style>
