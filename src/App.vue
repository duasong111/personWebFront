<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router' // 如果需要的话
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
