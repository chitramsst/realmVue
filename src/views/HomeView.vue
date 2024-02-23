<template class="">
    <div class="bg-gradient-to-b to-indigo-700  from-black/90 h-screen relative">
        <div class="container mx-auto p-2">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-full gap-10 py-10">
            <!-- Card 1 -->
            <div class="bg-gray-800 p-6 rounded-lg text-white">
                Card 1
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 float-right cursor-pointer"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M8.293 14.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414zM5 14.5v-9a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v2a1 1 0 01-2 0V6H7v2.5a1 1 0 01-2 0v-9a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-2a1 1 0 010-2h1V6H5v6.5a1 1 0 01-2 0z"
                        clip-rule="evenodd" />
                </svg>
                <!-- SVG icon for delete -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 float-right mr-2 cursor-pointer"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 3a.75.75 0 00-.75.75v9.5a.75.75 0 001.5 0v-9.5A.75.75 0 0010 3zm4.75 0a.75.75 0 00-.75.75v9.5a.75.75 0 001.5 0v-9.5a.75.75 0 00-.75-.75zm-9.5 0a.75.75 0 00-.75.75v9.5a.75.75 0 001.5 0v-9.5a.75.75 0 00-.75-.75zM3 5.25a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25V15a1 1 0 01-1 1H4a1 1 0 01-1-1V5.25zm14-.5a1.5 1.5 0 00-1.5-1.5H4.5a1.5 1.5 0 00-1.5 1.5V15a2 2 0 002 2h11a2 2 0 002-2V4.75z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <!-- Card 2 -->
            <div class="bg-gray-800 p-6 rounded-lg text-white">
                Card 2
            </div>
            <!-- Card 3 -->
            <div class="bg-gray-800 p-6 rounded-lg text-white">
                Card 3
            </div>
            <!-- Card 4 -->
            <div class="bg-gray-800 p-6 rounded-lg text-white">
                Card 4
            </div>
            <!-- Add more cards as needed -->
        </div>

        <button class="fixed bottom-4 right-4 flex items-center justify-center w-full"  @click.prevent="createModalShown = true">
            <p
            class="rounded-full text-white bg-gray-950 h-12 w-12 shadow-2xl flex items-center shadow-gray-50 justify-center">
            <span class="p-7 text-2xl text-gray-400">+</span>
        </p>
    </button>
</div>
<CreateCategoryModal :shown="createModalShown" @close="createModalShown = false" @done="handleDone" />
        <EditCategoryModal :shown="editModalShown" @close="editModalShown = false" @done="handleDone" ref="editexpensemodal"
            :item="item" />
    </div>
</template>
<script lang="ts">
//import EditCategoryModal from '@/components/Modals/ExpenseCategory/EditExpenseCategoryModal.vue'
import CreateCategoryModal from '@/components/Modals/ExpenseCategory/CreateExpenseCategoryModal.vue'
import EditCategoryModal from '@/components/Modals/ExpenseCategory/EditExpenseCategoryModal.vue'

export default {
    components: {
        CreateCategoryModal,
        EditCategoryModal
    },
    data() {
        return {
            categories: [],
            createModalShown: false,
            editModalShown: false,
            item: null,
            showDropdown: false
        }
    },
    mounted() {
        this.getData()
      //  window.ipcRenderer.receive('subscription-message', this.handleReceiver)

        //    let realm = window.ipcRenderer.invoke('get-realm-object')
    },
    unmounted() {
     //   window.ipcRenderer.remove('subscription-message', this.handleReceiver)
        // this.$electron('expenses', { section: 'destroy-expense-listener' }).then((response) => {
        // })
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
            // this.$electron('expenses', { section: 'get-expense-category', name: this.name }).then((response) => {
            //     if (response.success == true) {
            //         this.categories = response.items;
            //     }
            // })
        },
        deleteItem(id) {
            // this.$electron('expenses', { section: 'delete-expense-category', id: id }).then((response) => {
            //     if (response.success == true) {
            //     }
            // })
        },

        editItem(item) {
            this.item = item;
            this.editModalShown = true;
            this.$refs.editexpensemodal.setData(item);
        }
    }
}
</script>