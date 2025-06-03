<template>
  <div class="w-full h-[90rem] bg-green-800 gap-9 items-start pt-48 flex flex-row">
    <div class="">
      <h1>WELCOME BACK JOE</h1>
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
