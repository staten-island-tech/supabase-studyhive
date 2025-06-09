<template>
  <div class="pt-[10rem] bg-[#F6F7FB] py-10 flex flex-row justify-around">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import StudySet from '../components/StudySet.vue';
</script>

<style scoped></style>
