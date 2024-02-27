<template>
     <button class="items-center fixed right-5 bottom-24"  @click="downloadPDF"
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
    }
    },
}
</script>