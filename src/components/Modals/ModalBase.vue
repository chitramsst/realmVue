<template>
    <div class="">
        <Transition name="fade">
            <div class="fixed inset-0 w-full h-full " @click="closeModal"
                :class="shown ? 'pointer-events-auto' : 'pointer-events-none'">
                <Transition name="fade">
                    <div class="absolute inset-0 w-full h-full bg-black/20  backdrop-blur-sm backdrop " ref="modalbody" v-if="shown">
                        <div class="w-full h-full flex justify-center items-center   ">
                            <slot></slot>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
           
        }
    },
    mounted() {
        document.addEventListener('keydown', this.handleKeyDown)

    },
    unmounted() {
        document.removeEventListener('keydown', this.handleKeyDown)
    },
    props: {
        shown: {
            type: Boolean,
            default: false
        },
        focusOn: {
            type: String,
            default: 'input[type="text"]'
        },
        preventClose: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        handleKeyDown(e: KeyboardEvent) {
            if (e.key == 'Escape' && this.shown) {
                this.$emit('close')
            }
        },
        closeModal() {
            if (this.preventClose == true) {
                (this.$refs.modalbody as HTMLElement).classList.add('shake')

                setTimeout(() => {
                    (this.$refs.modalbody as HTMLElement).classList.remove('shake')
                }, 200)
                return;
            }
            this.$emit('close')
        },
    },
    watch: {
        shown() {
            if (this.shown) {
                this.$nextTick(() => {
                    let input = (this.$refs.modalbody as any).querySelector(this.focusOn)
                    if (input) {
                        input.focus()
                    }
                })
            }
            else {
            }
        },

    }
}
</script>

<style>
.fade-zoom-enter-active,
.fade-zoom-leave-active {
    transition: all 0.3s ease;
    transform: scale(1);
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
    opacity: 0;
    transform: scale(0);
    transform: translateY(20px);
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.shake {
    animation: shake 100ms forwards ease-in-out;
}

@keyframes shake {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.02);
    }

    100% {
        transform: scale(1);
    }

}
</style>