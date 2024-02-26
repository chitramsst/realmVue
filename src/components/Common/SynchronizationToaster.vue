<template>
    <div class="absolute bottom-5 right-5 " v-if="syncing">
        <div class="p-[2px] rounded-lg   overflow-clip  z-[3]  relative notification-animation">
            <div class=" px-8 py-8 z-20 bg-black relative rounded-lg">
                <div class="h-full w-full flex justify-center items-center flex-col success">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-6 h-6 animate-spin">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <div class="text-xs pt-2 text-white/80">Internet has went away.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    data()
    {
        return{
            syncing : false
        }
    },
    mounted()
    {
        window.ipcRenderer.receive('sync-status',(e) => {
            console.log(e)
        })

        if(navigator.onLine)
        {
            this.syncing = false;
        }
        else{
            this.syncing = true;
        }


        window.addEventListener("online", (event) => {
                this.syncing = false;
        });

        window.addEventListener("offline", (event) => {
            this.syncing = true;
        });
    },
    methods:{
        handleIpcReceiver()
        {

        }
    }
}

</script>



<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(50px);
}


.notification-animation::after{
    z-index: 0;
    content: ' ';
    position: absolute;
    left: -73px;
    top: -11px;
    width: calc(150% );
    height: calc(150% );
    filter: blur(50px);
    animation: rotate 3s linear infinite;
    background-size: 100% 100%;
    background-position: 0px 0px;
    background-image: conic-gradient(from 90deg at 50% 50%, #c3000098 1000%, #ffd1d000 50%);
}

@keyframes rotate {
	100% {
		transform: rotate(1turn);
	}
}
@keyframes rotate {
	100% {
		transform: rotate(1turn);
	}
}
</style>