<template>
  <div class="mt-30 bg-green-400 py-10 flex flex-row justify-around">
    <StudyCard :test="test" />
  </div>
</template>

<script setup lang="ts">
import StudyCard from '@/components/StudyCard.vue'
import { userInfo } from '@/compos/UserUsers'
</script>

<style scoped></style>
