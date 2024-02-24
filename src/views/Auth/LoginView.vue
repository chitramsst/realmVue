<template>
    <div class="relative">
        <div
            class="absolute inset-0 bg-gradient-to-b to-red-600  from-black/50 opacity-20 blur-lg p-8 w-96 h-96 flex justify-center items-center rounded-full -left-36">
        </div>
    </div>
    <div
        class=" fixed flex items-center justify-center -bottom-24  right-12 bg-gradient-to-b to-red-600  from-black/50 opacity-30 blur-lg p-8 w-96 h-96 rounded-full ">
    </div>

    <transition name="fade">
        <div class="fixed inset-0 pointer-events-auto">
            <div class="absolute inset-0 w-full h-full  backdrop-blur-sm backdrop">

                <div class="flex justify-center items-center h-full w-full">
                    <div
                        class="bg-gradient-to-b from-gray-900/30 to-gray-900 rounded-lg pt-6 pb-2 px-4  items-center relative z-50  w-[30%] min-w-96">
                        <div
                            class="bg-gray-700 text-white placeholder-gray-400 border w-full border-gray-600 rounded-lg px-4 py-5  text-sm focus:outline-none focus:ring-2 focus:ring-gray-500">
                            <input type="text" ref='firstInput' v-model="email"
                                :class="{ 'border-red-500': v$.email.$error }"
                                class="bg-gray-900 text-white w-full  placeholder-gray-400 border border-gray-900 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                                placeholder="Enter Email...">
                            <p class="pb-2"></p>
                            <input type="password" v-model="password" :class="{ 'border-red-500': v$.password.$error }"
                                class="bg-gray-900 text-white placeholder-gray-400 border border-gray-900 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                                placeholder="Enter password" />
                        </div>

                        <div class="flex justify-end">
                            <p  class="px-4 py-2  hover:text-red-400 text-red-800 rounded">Register</p>
                            <span
                                class="px-4 py-2 hover:text-indigo-400 text-indigo-600 rounded ml-2 cursor-pointer"
                                @click.prevent="login">Login</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </transition>

  
</template>
<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {

    data() {
        return {
            email: "",
            password: ""
        }
    },
    setup() {
        return { v$: useVuelidate({ $scope: false }) };
    },
    async mounted() {
        this.$electron('auth', { section: 'check-login' }).then((response) => {
            if (response.user) {
                this.$router.push({ name: 'home' })
            }
        })
    },
    methods: {
        async login() {
          
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
            this.syncing = true;
            this.$electron('auth', { section: 'login', email: this.email, password: this.password }).then((response) => {
                if (response.success == true) {
                    this.$electron('auth', { section: 'check-login' }).then(async (response) => {
                      //  await this.waitForSyncStatus()
                       // this.syncing = false;
                        console.log("hai,,,,,,,,,,,,")
                        this.$router.push({ name: 'home' })
                    })
                }
                else {
                    window.ipcRenderer.invoke('show-dialog', {
                        title: 'Error',
                        message: response.error,
                        type: 'info',
                    })
                    this.syncing = false;
                }
            })
        },
        async waitForSyncStatus() {

            return new Promise((resolve, reject) => {
                let listener;
                const handler = (e: any) => {
                    resolve(true)
                }
                listener = window.ipcRenderer.once('sync-status', handler)
            })
        }
    },
    validations() {
        return {
            email: { required, email },
            password: { required },
        };
    },
}
</script>