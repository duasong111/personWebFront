<!-- login.vue -->
<template>
  <div class="container">
    <div class="showMe">这是一个展示自己的动画</div>
    <el-row :gutter="20" class="grid-container">
      <el-col :xs="24" :sm="8" :md="6">
        <div class="rightCard">展示1</div>
        <div ref="pieChartContainer" class="pie-chart-container"></div>
      </el-col>
      <el-col :xs="24" :sm="8" :md="10">
        <div class="leftCard">展示2</div>
        <div ref="chartContainer" class="chart-container"></div>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8">
        <div class="rightCard">展示1</div>
        <div class="body-login">
          <el-form
            ref="ruleFormRef"
            :model="loginForm"
            status-icon
            :rules="rules"
            label-width="auto"
            class="login-contain"
          >
            <h1>欢迎登录</h1>
            <el-form-item label="用户名:" prop="username">
              <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码:" prop="pass">
              <el-input v-model="loginForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <div class="submitBtn">
              <el-form-item>
                <el-button type="primary" @click="handleLogin">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const ruleFormRef = ref(null)
const router = useRouter()
const loginForm = reactive({
  username: '',
  pass: '',
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
  ],
  pass: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
  ],
})

const handleLogin = async () => {
  try {
    router.push('/home')
  } catch (error) {
    console.error('登录出错:', error)
  }
}

const resetForm = () => {
  ruleFormRef.value.resetFields()
}

const chartContainer = ref<HTMLDivElement | null>(null)
const pieChartContainer = ref<HTMLDivElement | null>(null)
let myChart: echarts.ECharts | null = null
let pieChart: echarts.ECharts | null = null

const initChart = () => {
  if (chartContainer.value) {
    myChart = echarts.init(chartContainer.value)
    const option: echarts.EChartsOption = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: { alignWithLabel: true },
        },
      ],
      yAxis: [{ type: 'value' }],
      series: [
        { name: 'Direct', type: 'bar', barWidth: '60%', data: [10, 52, 200, 334, 390, 330, 220] },
      ],
    }
    myChart.setOption(option)
  }
}

const initPieChart = () => {
  if (pieChartContainer.value) {
    pieChart = echarts.init(pieChartContainer.value)
    const option = {
      tooltip: { trigger: 'item' },
      legend: { top: '5%', left: 'center' },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
          labelLine: { show: false },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
        },
      ],
    }
    pieChart.setOption(option)
  }
}

const debounce = (fn: Function, delay: number) => {
  let timer: number | null = null
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

const resizeChart = () => {
  if (myChart) myChart.resize()
  if (pieChart) pieChart.resize()
}

const handleResize = debounce(resizeChart, 200)

onMounted(() => {
  nextTick(() => {
    initChart()
    initPieChart()
    window.addEventListener('resize', handleResize)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (myChart) myChart.dispose()
  if (pieChart) pieChart.dispose()
})
</script>

<style scoped>
/* 根容器 */
.container {
  width: 100vw;
  height: 100vh;
  padding: 2vw; /* 使用相对单位 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* 动画展示 */
.showMe {
  display: flex;
  justify-content: center;
  margin-bottom: 2vw;
  background-color: brown;
  padding: 1.5vw;
  border-radius: 1vw;
  font-size: 1.5rem;
  flex: 0 0 auto;
}

/* 网格容器 */
.grid-container {
  flex: 1;
  display: flex;
  align-items: stretch;
  overflow: hidden;
}

/* 卡片样式 */
.leftCard,
.rightCard {
  padding: 1.5vw;
  text-align: center;
  border-radius: 0.8vw;
  margin-bottom: 2vw;
}
.leftCard {
  background-color: aqua;
}
.rightCard {
  background-color: cadetblue;
}

/* 图表容器和登录表单容器 */
.chart-container,
.pie-chart-container,
.body-login {
  width: 100%;
  height: calc(100% - 5vw); /* 减去卡片高度 */
}

/* 图表容器 */
.chart-container,
.pie-chart-container {
  min-height: 20vw;
  max-height: 35vw;
}

/* 登录表单 */
.body-login {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-contain {
  width: 90%;
  max-width: 25vw;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 1vw;
  padding: 2vw;
  box-shadow: 0 0 2vw #cacaca;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .chart-container,
  .pie-chart-container {
    max-height: 30vw;
  }
  .login-contain {
    width: 80%;
    padding: 1.5vw;
  }
  .showMe {
    font-size: 1.2rem;
    padding: 1vw;
  }
}

@media (max-width: 768px) {
  .grid-container {
    flex-direction: column;
  }
  .chart-container,
  .pie-chart-container,
  .body-login {
    height: auto;
    max-height: 25vw;
  }
  .login-contain {
    width: 90%;
    padding: 1vw;
    max-width: none;
  }
  .showMe {
    font-size: 1rem;
    padding: 0.8vw;
  }
}
</style>
