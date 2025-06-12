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

let studySets = ref([]);
async function fetchData() {
  const { data, error } = await supabase.from('quizzes').select('*');
  if (error) {
    console.log(error);
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