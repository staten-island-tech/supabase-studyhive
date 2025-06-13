<template>
  <div class="flex flex-col md:flex-row md:justify-end w-3/4 h-fit mt-30 items-center mx-auto">
    <img :src="imageSrc" alt="" class="image w-[45%] aspect-[8/9] object-cover rounded-[3rem]" />
    <div class="flex flex-col w-3/5 justify-center items-center">
      <h1 class="text-[300%] font-bold text-black">Flashcards</h1>
      <p class="text-black w-full md:w-2/3 text-center ">{{ info }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imageSrc: string
  info: string
}>()

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted } from 'vue'
gsap.registerPlugin(ScrollTrigger)

const gsapEffects = [
  {
    id: 'fadeSlideTo',
    from: { opacity: 0.5, x: -1000 },
    to: {
      opacity: 1,
      x: 0,
      yoyo: false,
      repeat: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.image', // The element to trigger the animation on
        start: 'top 80%', // When the top of the .image hits 80% of the viewport height
        once: true, // Run the animation only once
        scrub: false, // Do not scrub (animation runs once)
        toggleActions: 'play none none none', // play the animation
      },
    },
  },
  {
    id: 'yeah',
    from: { opacity: 0.5, x: -1000 },
    to: {
      opacity: 1,
      x: 0,
      yoyo: false,
      repeat: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.image', // The element to trigger the animation on
        start: 'top 80%', // When the top of the .image hits 80% of the viewport height
        once: true, // Run the animation only once
        scrub: false, // Do not scrub (animation runs once)
        toggleActions: 'play none none none', // play the animation
      },
    },
  },
]

onMounted(() => {
  const effect = gsapEffects.find((e) => e.id === 'fadeSlideTo')
  if (effect) {
    gsap.fromTo('.image', effect.from, effect.to)
  }
})
</script>

<style scoped></style>
