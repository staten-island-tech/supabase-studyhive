<template>
  <div class="w-screen h-full flex justify-center items-center flex-col mt-[9rem] pb-6 bg-white">
    <div class="bg-amber-700 w-[96%] h-[50rem] rounded-[6rem]">
      <button
        class="w-[15rem] h-[4rem] rounded-2xl bg-gradient-to-r from-amber-500 to-pink-400 absolute ml-20 mt-[6rem]"
      >
        Get Started >>
      </button>
      <div class="flex justify-center"></div>
    </div>
    <div
      class="words font-[900] text-4xl md:text-7xl w-8/9 resize-none my-[10rem] text-center h-fit"
    >
      Study Better With StudyHive.
    </div>
    <ImageText imageSrc="/img/image.png" info="yah be agsudghuasidhuia fghdkgsdfagafsduigsdfuig" />
    <div class="flex flex-row justify-end w-3/4 h-fit mt-30">
      <div class="flex flex-col w-3/5 justify-center items-center">
        <h1 class="text-[300%] font-bold">Flashcards</h1>
        <p>yah be agsudghuasidhuia fghdkgsdfagafsduigsdfuig</p>
      </div>
      <img src="/img/image.png" alt="" class="w-[45%] aspect-[8/9] object-cover rounded-[3rem]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageText from '@/components/ImageText.vue'
</script>

<style scoped></style>
