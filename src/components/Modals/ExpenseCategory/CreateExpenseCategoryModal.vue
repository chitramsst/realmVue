<template>
    <transition name="fade" v-show="shown">
        <div class="fixed inset-0" :class="shown ? 'pointer-events-auto' : 'pointer-events-none'">
            <div class="absolute inset-0 w-full h-full  backdrop-blur-sm backdrop">

                <transition name="fade">
                    <div class="bg-gradient-to-r from-purple-600 to-gray-900 opacity-10 absolute inset-0 z-40" v-if="shown">
                    </div>
                </transition>
                <div class="flex justify-center items-center h-full ">
                    <div
                        class="bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg p-6  flex-row flex  items-center relative z-50">
                        <input type="text" v-model="name" ref='firstInput'
                            :class="{ 'border-red-500': v$.name.$error }"
                            class="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-2 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="Enter Category Name...">
                        <div class="w-full float-right text-indigo-400 text-right font-bold cursor-pointer" @click="save"> save </div>
                        <div class="absolute top-0 right-0 m-1 cursor-pointer text-indigo-500 shadow-lg bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"
                                @click.stop="hideModal">
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
            this.$electron('expenses', { section: 'create-expense-category', name: this.name }).then((response) => {
                if (response.success == true) {
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
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}</style>