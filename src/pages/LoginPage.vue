<template>
  <div class="container">
    <!-- 动画展示 -->
    <div class="showMe">
      <h1 id="typed"></h1>
    </div>
    <el-row :gutter="20" class="grid-container">
      <el-col :xs="24" :sm="8" :md="6">
        <div class="leftCardHeard">技术栈</div>
        <div ref="pieChartContainer" class="pie-chart-container"></div>
      </el-col>
      <el-col :xs="24" :sm="8" :md="10">
        <div class="middleCardHeard">GitHub 提交</div>
        <div ref="chartContainer" class="chart-container"></div>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8">
        <div class="rightCardHeard">超级登录</div>
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
              <el-input v-model="loginForm.password" type="password" autocomplete="off" />
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
import { ref, nextTick, onUnmounted, getCurrentInstance, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
import Typed from 'typed.js'
import { useRouter } from 'vue-router'
import { dataColorPaletteTask } from 'echarts/types/src/visual/style.js'
const { proxy } = getCurrentInstance() as { proxy: any }
//开始标题动画展示效果
onMounted(() => {
  new Typed('#typed', {
    strings: ['🐒 Welcome to Duasong website !', 'Go ahead , everybody ! ! !'],
    typeSpeed: 80,
    backSpeed: 40,
    loop: true,
  })
})
// 用户登录表单
const ruleFormRef = ref(null)
const router = useRouter()

const loginForm = reactive({
  username: '',
  password: '',
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
    const response = await proxy.$api.loginUser(loginForm) // 传递 formData
    console.log('登录成功:', response.data)
    // 处理登录成功的逻辑（如跳转页面）
  } catch (error) {
    console.error('登录失败:', error)
    // 处理错误（如显示错误提示）
  }
}
// 重置表单
const resetForm = () => {
  ruleFormRef.value.resetFields()
}

const chartContainer = ref<HTMLDivElement | null>(null)
const pieChartContainer = ref<HTMLDivElement | null>(null)
let myChart: echarts.ECharts | null = null
let pieChart: echarts.ECharts | null = null

// Github 数据的更新
const initChart = () => {
  if (chartContainer.value) {
    myChart = echarts.init(chartContainer.value)
    const option: echarts.EChartsOption = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: [
        {
          type: 'category',
          data: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          axisTick: { alignWithLabel: true },
        },
      ],
      yAxis: [{ type: 'value' }],
      series: [
        {
          name: '月提交量:',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 70, 134, 190, 130, 120, 80, 23, 54, 45],
        },
      ],
    }
    myChart.setOption(option)
  }
}

// 使用饼图对自己的技术进行一个简单的概括
const initPieChart = () => {
  if (pieChartContainer.value) {
    pieChart = echarts.init(pieChartContainer.value)
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `${params.data.name}: ${params.data.title}`
        },
      },
      legend: { top: '5%', left: 'center' },
      series: [
        {
          name: '技 术 栈',
          type: 'pie',
          radius: ['40%', '85%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
          labelLine: { show: false },
          data: [
            { value: 1000, name: 'Python后端', title: 'Django Flask FastApi + 爬虫' },
            { value: 735, name: 'Web前端', title: 'HTML + JS + Vue + Node + Nginx' },
            { value: 580, name: '微信小程序', title: '原生 + LinUI + JS + TS' },
            { value: 484, name: '数据库', title: 'MySQL ,MongoDB,PostgreSQL' },
            { value: 300, name: '开发板', title: '树莓派 , LuckFox' },
          ],
        },
      ],
    }
    pieChart.setOption(option)
  }
}

const debounce = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null
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
  width: 93vw;
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
  margin-bottom: 1vw;
  border-radius: 1vw;
  font-size: 1.5rem;
  flex: 0 0 auto;
}
/* 网格容器 */
.grid-container {
  flex: 1;
  display: flex;
  align-items: stretch;
}
/* 标题展示 */
.rightCardHeard,
.middleCardHeard,
.leftCardHeard {
  padding: 1vw;
  font-weight: bold; /* 加粗打字文字 */
  font-size: 25px; /* 可选：调整文字大小 */
  text-align: center;
  border-radius: 0.8vw;
  margin-bottom: 2vw;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

/* 图表容器和登录表单容器 */
.chart-container,
.pie-chart-container,
.body-login {
  width: 100%;
  /*height: calc(100% - 5vw); 减去卡片高度 */
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
/* 打字的特效 */
#typed {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: bold; /* 加粗打字文字 */
  font-size: 32px; /* 可选：调整文字大小 */
}
#typed::after {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  content: '|';
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
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

/* 对登录框的俩按钮的设置 */
.submitBtn,
h1 {
  display: flex;
  justify-content: center;
}
</style>
