<template>

<div class="card" ref="printhere">
                        <div class="card-header">
                            <div class="row align-items-start">
                                <div class="col">
                                    Test 
                                    </div>
                                    </div>
                                    </div>
                                    </div>

     <button class="items-center fixed right-5 bottom-24"  @click="download"
           >
         
            <p
                class="rounded-full text-white bg-gray-950 h-12 w-12 shadow-2xl flex items-center shadow-gray-50 justify-center">
                <span class="p-7 text-2xl text-gray-400">+</span>
            </p>
        </button>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        downloadPDF() {
      // Send a message to Electron main process to generate PDF
            // window.ipcRenderer.invoke('generate-pdf');
             window.ipcRenderer.invoke('generate-pdf').then((response) => {
                setTimeout(() => {
                }, 300)
            })
    },
    download() {
        //this.printing = true;
            let original = document.body.style.backgroundColor;
            document.body.style.backgroundColor = 'white';
            this.$nextTick(() => {
                let data = this.$refs.printhere.outerHTML
                window.ipcRenderer.invoke('download-report', { data: data }).then((response) => {
                    setTimeout(() => {
                        document.body.style.backgroundColor = original;
                        this.printing = false;
                    }, 300)
                })
            })
    }
    },
}
</script>