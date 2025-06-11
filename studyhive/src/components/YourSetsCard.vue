<template>
  <div
    ref="card"
    class="relative w-1/3 aspect-square rounded-3xl p-3 hover:scale-105 transition-all duration-300 overflow-visible"
    @mouseenter="startGradientLoop"
    @mouseleave="stopGradientLoop"
  >
    <!-- Gradient border layer -->
    <div
      ref="gradient"
      class="absolute -inset-[-10px] rounded-[25px] z-0 opacity-0 pointer-events-none transition-opacity duration-300"
      :style="{
        backgroundImage: `
          conic-gradient(
            from ${angle}deg,
            rgba(245,158,11,0) 0deg,
            #f59e0b 10deg,
            #ec4899 40deg,
            rgba(236,72,153,0) 60deg,
            transparent 360deg
          )
        `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }"
    ></div>

    <!-- Card content -->
    <div class="relative z-10 bg-white rounded-3xl p-3 flex flex-col aspect-square items-center">
      <img src="/img/image.png" class="rounded-2xl aspect-[4/2] mb-2" alt="" />
      <p>{{ props.num }} terms</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  num: Number
})

const card = ref<HTMLElement | null>(null)
const gradient = ref<HTMLElement | null>(null)
const angle = ref(0)
let animation: gsap.core.Tween | null = null

const startGradientLoop = () => {
  if (!gradient.value) return
  gsap.to(gradient.value, { opacity: 1, duration: 0.3 })

  animation = gsap.to(angle, {
    value: 360,
    duration: 4,
    ease: 'linear',
    repeat: -1,
    modifiers: {
      value: (v) => {
        const val = parseFloat(v) % 360
        angle.value = val
        return val
      }
    }
  })
}

const stopGradientLoop = () => {
  if (!gradient.value) return
  gsap.to(gradient.value, { opacity: 0, duration: 0.3 })

  if (animation) {
    animation.kill()
    animation = null
    angle.value = 0
  }
}
</script>

<style scoped>
</style>
