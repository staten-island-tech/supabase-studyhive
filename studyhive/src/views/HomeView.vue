<template>
  <div class="w-full h-[90rem] bg-green-800 gap-9 items-center pt-48 flex flex-col">
    <div class="w-[60%] aspect-[4/1] bg-amber-500 rounded-2xl flex">
      <h1>WELCOME BACK JOE</h1>
      <p>
        dsiadhua udhsuik hu fukafhds fd hu hui dhui dfsaiuh fsdauhi sdfihudf hu ifdauih df uih fduhi
        dfsihusiuh dfsauhi sdfa uih as
      </p>

      <img src="/img/image.png" alt="" class="w-10 aspect-square" />
    </div>
    <div class="flex flex-col w-[60%]">
      <h1 class="font-bold text-3xl mb-5">Your Sets</h1>
      <div class="w-full flex gap-x-2">
        <YourSetsCard />
        <YourSetsCard />
        <YourSetsCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YourSetsCard from '@/components/YourSetsCard.vue'
function checklogin(userlogged: boolean) {
  if (userlogged === false) {
    //direct to login page
  } else if (userlogged === true) {
    //show the screebn
  }
}
</script>

<style scoped></style>
