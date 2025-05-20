<template>
  <div class="bg-white flex flex-col rounded-2xl mb-4">
    <div class="mx-10 my-4">
      <h1 class="font-bold text-gray-400 text-[110%]">1</h1>
    </div>
    <div class="line w-full h-[2px] bg-[#F6F7FB]"></div>
    <div class="flex flex-row justify-between m-12">
      <div class="flex flex-col w-[48%]">
        <textarea
          class="bg-transparent focus:outline-none border-b-2 border-b-black w-full resize-none overflow-hidden min-h-[1rem]"
          placeholder="Enter term"
          rows="1"
          oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
        ></textarea>
        <h3 class="mt-2 text-gray-400 text-[80%] font-medium">TERM</h3>
      </div>
      <div class="flex flex-col w-[48%]">
        <textarea
          class="bg-transparent focus:outline-none border-b-2 border-b-black w-full resize-none overflow-hidden min-h-[1rem]"
          placeholder="Enter definition"
          rows="1"
          oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
        ></textarea>
        <h3 class="mt-2 text-gray-400 text-[80%] font-medium">DEFINITION</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
