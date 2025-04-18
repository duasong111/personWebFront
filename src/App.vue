<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  /* 防止滚动条 overflow: hidden; */
}
</style>
