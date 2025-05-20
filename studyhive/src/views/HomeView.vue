<template>
  <div class="w-full h-[90rem] bg-green-800 gap-9 items-start pt-48 flex flex-row">
    <div class="profile w-1/6 aspect-square bg-white rounded-2xl"></div>
    <div class="w-3/5 bg-white rounded-2xl aspect-[5/4]">
      <div class="bg-amber-200 w-1/5 h-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
function checklogin(userlogged: boolean) {
  if (userlogged === false) {
    //direct to login page
  } else if (userlogged === true) {
    //show the screebn
  }
}
</script>

<style scoped></style>
