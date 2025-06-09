<template>
    <StudyCard v-for="studySet of studySets" :studySet="studySet" :key="studySet.id" />
</template>

<script setup lang="ts">
import StudyCard from './StudyCard.vue';
import { RouterView } from 'vue-router';
import { supabase } from '@/supabase.ts';
import { onBeforeMount, ref } from 'vue';

let studySets = ref([]);
async function fetchData() {
  const { data, error } = await supabase.from('quizzes').select('*');
  if (error) {
    console.log(error);
    return null;
  }
  studySets.value = data;
  console.log('fetched');
}
onBeforeMount(async () => {
  await fetchData();
})

</script>

<style lang="scss" scoped>

</style>