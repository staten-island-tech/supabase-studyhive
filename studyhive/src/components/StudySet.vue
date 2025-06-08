<template>
    <div>
        <StudyCard v-for="studySet of studySets" :studySet="studySet" :key="studySet" @click="goToSet(studySet.id)" />
    </div>
</template>

<script setup lang="ts">
import StudyCard from './StudyCard.vue';
import { RouterView, useRouter } from 'vue-router';
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

const router = useRouter();
function goToSet(id) {
    router.push(`/StudySets/details/${id}`);
}

</script>

<style lang="scss" scoped>

</style>