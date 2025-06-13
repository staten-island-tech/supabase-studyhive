<template>
  <div class="w-full h-[90rem] bg-[#F6F7FB] gap-9 items-center pt-48 flex flex-col">
   
    <div class="flex flex-col w-[90%] md:w-[60%]">
      <h1 class=" font-bold text-4xl mb-3">Your Sets</h1>
      <div class="flex ">
        <YourSetsCard/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YourSetsCard from '@/components/YourSetsCard.vue';
import { ref, computed } from 'vue';
function checklogin(userlogged: boolean) {
  if (userlogged === false) {
    //direct to login page
  } else if (userlogged === true) {
    //show the screebn
  }
}

const user = ref('joe')

const userUpper = computed(() => user.value.toUpperCase())
</script>

<style scoped></style>
