<template>
  <div class="header-contain">
    <div class="menu-left">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页面</el-menu-item>
        <el-sub-menu index="2">
          <template #title>博客管理</template>
          <el-menu-item index="2-1">博客详情</el-menu-item>
          <el-menu-item index="2-2">添加博客</el-menu-item>
          <el-menu-item index="2-3">编辑博客</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">其他页面</el-menu-item>
      </el-menu>
    </div>
    <div class="menu-right">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="4">个人中心</el-menu-item>
        <el-menu-item index="5">
          <el-avatar
            :size="32"
            class="mr-3"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup name="HeaderPage">
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.header-contain {
  display: flex;
  justify-content: space-between; /* 左右分布 */
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
}

.menu-left {
  flex: 1; /* 左侧占据剩余空间 */
}

.menu-right {
  display: flex;
  align-items: center;
  gap: 10px; /* 头像和文字之间的间距 */
}
</style>
