<template>
  <div class="w-screen h-full flex justify-center items-center flex-col mt-0 md:mt-[9rem] pb-6 bg-white">
    <div class=" h-[50rem] rounded-[6rem] overflow-hidden hidden md:block relative">
      <img
        src="/img/Hive.png"
        alt="Cover"
        class="w-full h-full object-cover rounded-[6rem]"
      />
      <div class="flex justify-center"></div>
    </div>
    <div class="text-center font-black text-4xl md:text-7xl w-8/9 mx-auto my-[10rem]">
      Study Better With <br class="block md:hidden" /> StudyHive.
    </div>

    <ImageText class="mb-10" imageSrc="/img/cards.png" info="Flashcards are a study tool that helps with memorization by displaying a question or term on one side and the answer or definition on the other. They're great for active recall, quick review, and spaced repetition." />
 
  </div>
</template>

<script setup lang="ts">
import ImageText from '@/components/ImageText.vue'


</script>

<style scoped></style>
