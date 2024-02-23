<template>
  <div class="flex w-screen h-screen flex-row">
    <!-- <sidebar/> -->
    <div class="bg-blue-100/50 w-full h-screen">
    <RouterView/> 
  </div>
  </div>
</template>

<script>
import sidebar from './components/Sidebar.vue';
import header from './components/Header.vue';
import mainContent from './components/MainContent.vue';
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    sidebar,
    header,
    mainContent
  }
}
</script>