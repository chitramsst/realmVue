<template>
    <div class="absolute top-5 right-5 h-10 w-10 rounded-full bg-red-500 flex items-center justify-center" @click="logout">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
        </svg>
    </div>

    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-full gap-10 py-10 mt-20 justify-center items-center">

        <div class="bg-gray-800 p-6 rounded-lg text-white" v-for="category in categories" :key="category._id">
            <p class="tex-wrap text-gray-400"> {{ category.name }}</p>
            <p class="tex-wrap truncate text-indigo-400/30 text-sm pb-2"> {{ category.owner_id }} </p>

            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"
                version="1.1" id="Capa_1" class="h-5 w-5 text-blue-500 float-right cursor-pointer"
                viewBox="0 0 494.936 494.936" xml:space="preserve" @click="editItem(category)">
                <g>
                    <g>
                        <path
                            d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157    c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21    s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741    c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z" />
                        <path
                            d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069    c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963    c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692    C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107    l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005    c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z" />
                    </g>
                </g>
            </svg>

            <DeleteConfirmation v-if="showDeleteConfirmation" @confirmed="deleteItem"
                @canceled="showDeleteConfirmation = false">
            </DeleteConfirmation>


            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-red-500 float-right cursor-pointer mr-2"
                @click.prevent="selectedItemId = category._id; showDeleteConfirmation = true;">
                <path d="M10 12V17" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14 12V17" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 7H20" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="currentColor"
                    stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>

    </div>
  
    <button class="items-center fixed right-5 bottom-24" @click.prevent="createModalShown=!createModalShown"
           >
            <p
                class="rounded-full text-white bg-gray-950 h-12 w-12 shadow-2xl flex items-center shadow-gray-50 justify-center">
                <span class="p-7 text-2xl text-gray-400">+</span>
            </p>
        </button>
    <CreateCategoryModal :shown="createModalShown" @close="createModalShown = false" @done="handleDone" />
    <EditCategoryModal :shown="editModalShown" @close="editModalShown = false" @done="handleDone" ref="editexpensemodal"
        :item="item" />
</template>
<script lang="ts">
//import EditCategoryModal from '@/components/Modals/ExpenseCategory/EditExpenseCategoryModal.vue'
import CreateCategoryModal from '@/components/Modals/ExpenseCategory/CreateExpenseCategoryModal.vue'
import EditCategoryModal from '@/components/Modals/ExpenseCategory/EditExpenseCategoryModal.vue'
import DeleteConfirmation from '@/components/DeleteConfirmation.vue'

export default {
    components: {
        CreateCategoryModal,
        EditCategoryModal,
        DeleteConfirmation
    },
    data() {
        return {
            categories: [],
            createModalShown: false,
            editModalShown: false,
            item: null,
            showDropdown: false,
            selectedItemId: null,
            showDeleteConfirmation: false
        }
    },
    created() {
        this.getData()
    },
    mounted() {
        this.getData()
        window.ipcRenderer.receive('subscription-message', this.handleReceiver)

        //    let realm = window.ipcRenderer.invoke('get-realm-object')
    },
    unmounted() {
        window.ipcRenderer.remove('subscription-message', this.handleReceiver)
        this.$electron('expenses', { section: 'destroy-expense-listener' }).then((response) => {
        })
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
        },
        logout() {
            this.$electron('auth', { section: 'logout' }).then((response) => {
                this.$router.push({ name: 'login' })
            })
        }
    }
}
</script>