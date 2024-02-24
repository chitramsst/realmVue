<template>
    <div class="relative">
        <div
            class="absolute inset-0 bg-gradient-to-b to-red-600  from-black/50 opacity-20 blur-lg p-8 w-96 h-96 flex justify-center items-center rounded-full -left-36">
        </div>
    </div>

    <transition name="fade">
    <div class="fixed inset-0" :class="show ? 'pointer-events-auto' : 'pointer-events-none'">
      <div class="absolute inset-0 w-full h-full  backdrop-blur-sm backdrop">

        <transition name="fade">
          <div class="bg-gradient-to-r from-purple-600 to-gray-900 opacity-10 absolute inset-0 z-40">
          </div>
        </transition>
        <div class="flex justify-center items-center h-full w-full">
          <div class="bg-gradient-to-b from-gray-900/30 to-gray-900 rounded-lg pt-6 pb-2 px-4  items-center relative z-50  w-[30%] min-w-96">
            <div
              class="bg-gray-700 text-white placeholder-gray-400 border w-full border-gray-600 rounded-lg px-4 py-5  text-sm focus:outline-none focus:ring-2 focus:ring-gray-500">
              <input type="text" v-model="name" ref='firstInput' 
                           
                            class="bg-gray-900 text-white w-full  placeholder-gray-400 border border-gray-900 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="Enter Email...">
<p class="pb-2"></p>
                            <input type="password" v-model="password"
                           
                           class="bg-gray-900 text-white placeholder-gray-400 border border-gray-900 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                           placeholder="Enter password">
            
            
          </div>

            <div class="flex justify-end">
              <span @click="cancel" class="px-4 py-2  hover:text-red-400 text-red-800 rounded">Register</span>
              <span @click="confirm" class="px-4 py-2 hover:text-indigo-400 text-indigo-600 rounded ml-2">Login</span>
            </div>
         
          </div>
        </div>
      </div>
    </div>
  </transition>

    <div
        class=" fixed flex items-center justify-center -bottom-24  right-12 bg-gradient-to-b to-red-600  from-black/50 opacity-30 blur-lg p-8 w-96 h-96 rounded-full ">
    </div>

</template>
<script lang="ts">

import { useVuelidate } from '@vuelidate/core'
import { required, requiredIf, helpers } from '@vuelidate/validators'

export default {
   
    data() {
        return {
           name: ""
        }
    },
    validations() {
        return {
            name: { required },


        };
    },
    methods: {
        handleReceiver(e) {
            if (e.identifier == 'ExpenseCategory' && e.type == 'Create') {
                this.categories.push(e.data)
            }
            else if (e.data != undefined && e.identifier == 'ExpenseCategory' && e.type == 'Update') {
                this.editModalShown = false;
                let index = this.categories.findIndex((x) => x._id == e.data._id)
                if (index != -1) {
                    this.categories[index] = e.data;
                    return;
                }
            }
            else if (e.identifier == 'ExpenseCategory' && e.type === 'Delete') {
                this.getData()
            }
        },
        handleDone(item, data) {
            if (data.name == 'create') {

            }
            if (data.name == 'edit') {

                // this.editModalShown = false;
                // if (data != undefined && data.name == 'edit') {
                //     let index = this.categories.findIndex((x) => x._id == data.data._id)
                //     if (index != -1) {
                //         this.categories[index] = data.data;
                //         return;
                //     }
                // }
                // this.getData();
            }
        },
        getData() {
            this.$electron('expenses', { section: 'get-expense-category', name: this.name }).then((response) => {
                if (response.success == true) {
                    this.categories = response.items;
                }
            })
        },
        deleteItem() {
            this.$electron('expenses', { section: 'delete-expense-category', id: this.selectedItemId }).then((response) => {
                if (response.success == true) {
                }
            })
            this.showDeleteConfirmation = false;
        },

        editItem(item) {
            this.item = item;
            this.editModalShown = true;
            this.$refs.editexpensemodal.setData(item);
        }
    }
}
</script>