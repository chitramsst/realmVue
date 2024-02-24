<!-- DeleteConfirmation.vue -->
<template>
  <transition name="fade" v-show="show">
    <div class="fixed inset-0" :class="show ? 'pointer-events-auto' : 'pointer-events-none'">
      <div class="absolute inset-0 w-full h-full  backdrop-blur-sm backdrop">

        <transition name="fade">
          <div class="bg-gradient-to-r from-purple-600 to-gray-900 opacity-10 absolute inset-0 z-40" v-if="show">
          </div>
        </transition>
        <div class="flex justify-center items-center h-full ">
          <div class="bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg pt-6 pb-2 px-4  lex  items-center relative z-50">
            <P
              class="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-5 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500">
              Are you sure to delete?</P>

            <div class="flex justify-end">
              <span @click="cancel" class="px-4 py-2  hover:text-red-400 text-red-800 rounded">Cancel</span>
              <span @click="confirm" class="px-4 py-2 hover:text-indigo-400 text-indigo-600 rounded ml-2">Confirm</span>
            </div>
            <div class="absolute top-0 right-0 m-1 cursor-pointer text-indigo-500 shadow-lg bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"
                @click.stop="cancel">
                <path fill-rule="evenodd"
                  d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
  