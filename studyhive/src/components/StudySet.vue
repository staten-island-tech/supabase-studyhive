<template>
  <div class="pt-[10rem] bg-[#F6F7FB] py-10 flex flex-row justify-around">
    <StudyCard v-for="studySet of studySets" :studySet="studySet" :key="studySet.id" />
  </div>
</template>

<script setup lang="ts">
import StudyCard from './StudyCard.vue';
import { supabase } from '@/supabase.ts';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

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

const route = useRoute();
watch(
  () => route.fullPath, // watch the route change
  async () => {
    await fetchData();
  },
  { immediate: true } // run on initial mount
)

</script>

<style lang="scss" scoped>

</style>