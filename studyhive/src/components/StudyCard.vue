<template>
  <div class="w-[30%] p-[2px] rounded-3xl bg-gradient-to-r from-amber-500 to-pink-400">
    <div class="bg-base-100 rounded-3xl" @click="goToSet(studySet.id)">
      <div class="p-5 flex flex-col gap-3">
        <h2 class="card-title font-bold">{{studySet.quiz_title}}</h2>
        <div class="flex mb-10">
          <p class="terms bg-amber-300 px-3 py-1 rounded-2xl font-semibold text-[0.9rem]">
            {{studySet.terms_number}} terms
          </p>
        </div>
        <div class="user flex gap-2 items-center">
          <img src="/img/image.png" alt="" class="w-[7%] rounded-3xl" />
          <p class="user">{{studySet.creator}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

defineProps({
  studySet: {
    type: Object,
    required: true
  }
});

const router = useRouter();
function goToSet(id) {
    router.push(`/StudySets/details/${id}`);
}
</script>

<style scoped></style>
