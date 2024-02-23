<template>
    <ModalBase :shown="shown">
        <div class="bg-[#2e2e30] flex flex-col border border-[#373738] justify-between shadow-xl shadow-blue-black/20 min-w-[26rem] rounded-xl "
            @click.stop="">
            <div class="flex  flex-col h-full">
                <div class="flex justify-between items-center p-2 border-b border-[#22262E] px-4 ">
                    <div class="text-md font-medium">Create Expense Category</div>
                    <button @click.prevent="hideModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 42" fill="none">
                            <rect width="42" height="42" rx="21" fill="#121418" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M26.6694 15.3571C27.059 15.7486 27.0576 16.3817 26.6662 16.7714L16.7442 26.6484C16.3528 27.038 15.7196 27.0366 15.33 26.6451C14.9404 26.2537 14.9418 25.6206 15.3332 25.2309L25.2552 15.3539C25.6466 14.9643 26.2797 14.9657 26.6694 15.3571Z"
                                fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M15.3557 15.3315C15.7472 14.9418 16.3803 14.9433 16.77 15.3347L26.647 25.2566C27.0366 25.648 27.0352 26.2812 26.6437 26.6708C26.2523 27.0605 25.6192 27.059 25.2295 26.6676L15.3525 16.7457C14.9629 16.3543 14.9643 15.7211 15.3557 15.3315Z"
                                fill="white" />
                        </svg>
                    </button>
                </div>
                <div
                    class="  overflow-y-auto custom-bar flex-col bg-[#1c1c1e] p-4 rounded-b-xl grid grid-cols-12 text-sm gap-4">
                    <div class="col-span-12 flex flex-col gap-1">
                        <label class="form-label">Expense Category Name <span class="text-red-500">*</span></label>
                        <input type="text"
                            class="block w-full p-2 outline-none mt-1 text-xs shadow text-white rounded bg-[#2e2e30] placeholder:text-[#ababac] focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Item Name" v-model="name" ref='firstInput'
                            :class="{ 'border-red-500': v$.name.$error }" />
                    </div>
                </div>
            </div>
            <div class="flex justify-end items-center p-3 gap-4 mt-1">
                <button class="px-8 py-2 text-sm rounded-xl border border-[#343839]" @click="hideModal">Cancel</button>
                <button class="bg-emerald-500 text-white px-8 py-2 text-sm rounded-xl"  @click.prevent="save">Save</button>
            </div>
        </div>
    </ModalBase>
</template>
<script>

import ModalBase from '@/components/Modals/ModalBase.vue';
import { useVuelidate } from '@vuelidate/core'
import { required, requiredIf, helpers } from '@vuelidate/validators'
export default {
    components: {
        ModalBase,
    },
    props: {
        shown: {
            type: Boolean,
            default: true,
        },
    },
    setup() {
        return { v$: useVuelidate({ $scope: false }) };
    },
    data() {
        return {
            loading: false,
            name: '',
        }
    },
    mounted() {
        //Define modal and focus on first input
        // this.modal = new Modal(this.$refs.modal);
    },
    created() {
        this.getDefaultData();
    },
    methods: {
        // get item categories, item units, item number and barcode as default
        getDefaultData() {
            
        },
        //Show modal
        showModal(item) {
            this.saveTag = true;
            this.modal.show();
            setTimeout(() => {
                this.$refs.firstInput.focus();
            }, 500)
        },
        //Hide Modal
        hideModal() {
            this.resetData();
            this.$emit('close')
        },
        //save data to server
        async save() {
            const isFormCorrect = await this.v$.$validate();
            if (!isFormCorrect) {
                let allerrors = {
                    'required': 'is required',
                }
                let errormsg = ' You have errors \n';
                this.v$.$errors.forEach((error) => {
                    let mystring = `•  ${(error.$property.charAt(0).toUpperCase() + error.$property.slice(1)) + ' ' + allerrors[error.$validator]} \n`
                    errormsg = errormsg += mystring
                })
                window.ipcRenderer.invoke('show-dialog', {
                    title: 'Error',
                    message: errormsg,
                    type: 'info',
                })
                return;
            }
            this.saveTag = false;
            this.$electron('expenses',{section : 'create-expense-category',name : this.name}).then((response) => {
                if(response.success == true)
                {
                    this.hideModal();
                    this.resetData();
                    this.$emit('done', 'action', {
                        name: 'create',
                        data: response.item
                    });
                }
                
            })
        },
        //reset all data
        resetData() {
            this.v$.$reset();
            this.name = '';
            this.getDefaultData();
        }
    },
    computed: {
      
    },
    validations() {
        return {
            name: { required },
           

        };
    },
    // watch the reactive changes
    watch: {
        
    }
}
</script>
