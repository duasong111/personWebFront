<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/HeaderPage.vue'
import Aside from '@/components/AsidePage.vue'
import Main from '@/components/MainPage.vue'
</script>

<style scoped>
.common-layout {
  height: 100vw;
  width: 92vw;
}
</style>
