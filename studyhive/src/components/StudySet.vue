<template>
  <div class="bg-[#F6F7FB] pt-[10rem] min-h-screen">
  <!-- insert search for cards -->
    <div class=" flex flex-wrap justify-evenly gap-y-7">
      <StudyCard v-for="studySet of studySets" :studySet="studySet" :key="studySet.id" />
    </div>
  </div>
  
</template>

<script setup lang="ts">
import StudyCard from './StudyCard.vue';
import { supabase } from '@/supabase.ts';
import { onBeforeMount, ref } from 'vue';

interface StudySet {
  id: string;
  quiz_title: string;
  description: string;
  creator: string;
  terms_number: number;
  // Add any other fields your 'quizzes' table contains
}

const studySets = ref<StudySet[]>([]);
async function fetchData() {
  const { data, error } = await supabase.from('quizzes').select('*');
  if (error) {
    alert(error);
    return null;
  }
  studySets.value = data;
}
onBeforeMount(async () => {
  await fetchData();
})

</script>

<style lang="scss" scoped>

</style>