<template>
  <div class="flex w-screen h-screen flex-row">
    <!-- <sidebar/> -->
    <div class="bg-blue-100/50 w-full h-screen">
      <div class="bg-gradient-to-b to-indigo-700  from-black/90 h-screen relative">
        <div class="container mx-auto p-2">
        <RouterView />
        </div>
      </div>
    </div>
  </div>
  <SynchronizationToaster/>
</template>

<script>
import SynchronizationToaster from '@/components/Common/SynchronizationToaster.vue'
// import sidebar from './components/Sidebar.vue';
// import header from './components/Header.vue';
// import mainContent from './components/MainContent.vue';
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    // sidebar,
    // header,
    // mainContent,
    SynchronizationToaster
  }
}
</script>