<template>
  <div class="pt-[10rem] bg-[#F6F7FB] py-10 flex flex-row justify-around">
    <StudyCard v-for="studySet of studySets" :studySet="studySet" :key="studySet" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import StudyCard from '@/components/StudyCard.vue';
import { RouterView } from 'vue-router';
import { supabase } from '@/supabase.ts';
import { onBeforeMount, reactive } from 'vue';

let studySets = reactive([]);
async function fetchData() {
  const { data, error } = await supabase.from('quizzes').select('*');
  if (error) {
    console.log(error);
    return null;
  }
  studySets = data;
  console.log('fetched');
}
onBeforeMount(async () => {
  await fetchData();
})
</script>

<style scoped></style>
