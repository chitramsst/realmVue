<template>
    <div>
      <div v-if="showToast" class="fixed  m-4 top-10 right-5 bg-teal-300  p-4 rounded-md shadow-lg min-w-60 text-gray-700">
        <button @click="showToast=false" class="absolute top-1 right-1 text-gray-700  font-semibold text-sm px-2 shadow-md">  X
        <!-- <svg class="h-4 w-4" fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg> -->
      </button>
        {{ toastMessage }}
      </div>
    </div>
  
  
  </template>
  
  <script>
  export default {
    data() {
      return {
        showToast: false,
        toastMessage: ''
      };
    },
    methods: {
      showToastMessage(msg) {
        // Set the toast message and show the toast
        this.toastMessage = msg;
        this.showToast = true;
  
        // Hide the toast after a delay (e.g., 3 seconds)
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      },
  
      closeToast() {
        this.showToast = false;
      },
    }
  }
  </script>
  