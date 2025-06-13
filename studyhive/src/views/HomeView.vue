<template>
  <div class="w-full h-[90rem] bg-[#F6F7FB] gap-9 items-center pt-48 flex flex-col">
   
    <div class="flex flex-col w-[90%] md:w-[60%]">
      <h1 class=" font-bold text-4xl mb-3">Your Sets</h1>
      <div class="flex flex-wrap overflow-y-scroll h-[18rem]">
        <YourSetsCard v-if="studySets.length !== 0" v-for="studySet of studySets" :studySet="studySet" :key="studySet.id"/>
      </div>
    </div>
    <div class="flex flex-col w-[90%] md:w-[60%]">
      <h1 class=" font-bold text-4xl mb-3">Your Favorited Sets</h1>
      <div class="flex flex-wrap overflow-y-scroll h-[18rem]">
        <YourSetsCard v-if="favStudySets.length !== 0" v-for="favSet of favStudySets" :studySet="favSet" :key="favSet.id"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YourSetsCard from '@/components/YourSetsCard.vue';
import { ref, computed, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/users.ts';
import { supabase } from '@/supabase.ts';

const userStore = useUserStore();

const user = ref(userStore.userInfo?.username);

const userUpper = computed(() => user.value.toUpperCase());

const studySets = ref([]);
async function fetchData() {
  const { data, error } = await supabase.from('quizzes').select('*').eq('creator', user.value);
  if (error) {
    alert(error);
    return null;
  }
  studySets.value = data;
}

const favStudySets = ref([]);
const favQuizIds = ref([]);
async function fetchFavQuizIds() {
  const { data, error } = await supabase.from('favorited').select('quiz_id').eq('username', user.value);
  if (error) {
    alert(error);
    return null;
  }
  favQuizIds.value = data;
  await fetchFav();
}

async function fetchFav() {
  favStudySets.value = [];
  for (const id of favQuizIds.value) {
    const { data, error } = await supabase.from('quizzes').select('*').eq('id', id.quiz_id).single();
    if (error) {
      alert(error);
      return null;
    }
    favStudySets.value.push(data);
  }
}

onBeforeMount(async () => {
  favStudySets.value = [];
  await fetchData();
  await fetchFavQuizIds();
});
</script>

<style scoped></style>
