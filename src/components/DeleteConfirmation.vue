<!-- DeleteConfirmation.vue -->
<template>
    <div v-if="show" class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded shadow-lg">
        <p class="mb-4">{{ message }}</p>
        <div class="flex justify-end">
          <button @click="cancel" class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded">Cancel</button>
          <button @click="confirm" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded ml-2">Confirm</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        default: 'Are you sure you want to delete?'
      }
    },
    data() {
      return {
        show: true
      };
    },
    methods: {
      confirm() {
        this.$emit('confirmed');
        this.close();
      },
      cancel() {
        this.$emit('canceled');
        this.close();
      },
      close() {
        this.show = false;
      }
    }
  };
  </script>
  