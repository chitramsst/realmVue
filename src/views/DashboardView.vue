<template>
  <!-- <div class="w-full bg-gray-600 h-12">
    <p class="text-white p-4"></p>
  </div> -->
 <!--  <div class="flex flex-wrap">
    <div class="w-full">
      <p class="p-4 px-10 text-lg font-extrabold text-gray-500"> Dashboard </p>
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
     
      <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
        <div class="flex flex-row items-center">
          <div class="flex-shrink pr-4">
            <div class="rounded-full p-5 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
          </div>
          <div class="flex-1 text-right md:text-center">
            <h2 class="font-bold uppercase text-gray-600">Total Revenue</h2>
            <p class="font-bold text-3xl">$3249 <span class="text-green-500"><i class="fas fa-caret-up"></i></span></p>
          </div>
        </div>
      </div>
     
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
    
      <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
        <div class="flex flex-row items-center">
          <div class="flex-shrink pr-4">
            <div class="rounded-full p-5 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
          </div>
          <div class="flex-1 text-right md:text-center">
            <h2 class="font-bold uppercase text-gray-600">Total Users</h2>
            <p class="font-bold text-3xl">249 <span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span></p>
          </div>
        </div>
      </div>
    
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
    
      <div class="bg-gradient-to-b from-purple-200 to-pink-100 border-b-4 border-purple-500 rounded-lg shadow-xl p-5">
        <div class="flex flex-row items-center">
          <div class="flex-shrink pr-4">
            <div class="rounded-full p-5 bg-purple-600"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                viewBox="0 0 24 24" fill="white">
                <path
                  d="M19 15C21.2091 15 23 16.7909 23 19V21H21M16 10.874C17.7252 10.4299 19 8.86383 19 6.99999C19 5.13615 17.7252 3.57005 16 3.12601M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM5 15H13C15.2091 15 17 16.7909 17 19V21H1V19C1 16.7909 2.79086 15 5 15Z"
                  stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg></div>
          </div>
          <div class="flex-1 text-right md:text-center">
            <h2 class="font-bold uppercase text-gray-600">Total Users</h2>
            <p class="font-bold text-3xl">249 <span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span></p>
          </div>
        </div>
      </div>
      
    </div>
  </div> -->
  <Toaster ref="myToaster" />

  <div>
    <div @click="showConfirmation" class="bg-red-500 px-3 py-2 w-32 mx-10 rounded-lg text-white mt-10">Delete Item</div>
    <DeleteConfirmation v-if="showDeleteConfirmation" @confirmed="deleteItem" @canceled="cancelDelete">
    </DeleteConfirmation>
  </div>
</template>

<script>
import Toaster from '../components/Toaster.vue'
import DeleteConfirmation from '../components/DeleteConfirmation.vue'

export default {
  data() {
    return {
      showToast: false,
      toastMessage: '',
      showDeleteConfirmation: false
    };
  },
  components: {
    Toaster,
    DeleteConfirmation
  },
  mounted() {
    this.$refs.myToaster.showToastMessage("hai")

    //  window.ipcRenderer.invoke('show-dialog', {
    //                 title: 'Error',
    //                 message: "errormsg",
    //                 type: 'info',
    //             })

  },
  methods: {
    showConfirmation() {
    //  alert("hi")
      this.showDeleteConfirmation = true;
    },
    deleteItem() {
      // Logic to delete the item
      console.log('Item deleted!');
      this.showDeleteConfirmation = false;
    },
    cancelDelete() {
      this.showDeleteConfirmation = false;
    }
  }
}
</script>
