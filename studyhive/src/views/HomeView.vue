<template>
  <div class="w-full h-[90rem] bg-[#F6F7FB] gap-9 items-center pt-48 flex flex-col">
    <div class="flex flex-col w-[90%] md:w-[60%]">
      <h1 class="font-bold text-4xl mb-3">Your Sets</h1>
      <div class="flex flex-wrap overflow-y-scroll h-[18rem]">
        <YourSetsCard
          v-if="studySets.length !== 0"
          v-for="studySet in studySets"
          :studySet="studySet"
          :key="studySet.id"
        />
      </div>
    </div>
    <div class="flex flex-col w-[90%] md:w-[60%]">
      <h1 class="font-bold text-4xl mb-3">Your Favorited Sets</h1>
      <div class="flex flex-wrap overflow-y-scroll h-[18rem]">
        <YourSetsCard
          v-if="favStudySets.length !== 0"
          v-for="favSet in favStudySets"
          :studySet="favSet"
          :key="favSet.id"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YourSetsCard from '@/components/YourSetsCard.vue';
import { ref, computed, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/users.ts';
import { supabase } from '@/supabase.ts';

// Define interfaces
interface Quiz {
  id: string;
  quiz_title: string;
  description: string;
  creator: string;
  terms_number: number;
}

interface Favorited {
  quiz_id: string;
}

// User store
const userStore = useUserStore();
const user = ref<string | undefined>(userStore.userInfo?.username);

// Capitalized username (used?)
const userUpper = computed(() => user.value?.toUpperCase() ?? '');

// Refs
const studySets = ref<Quiz[]>([]);
const favStudySets = ref<Quiz[]>([]);
const favQuizIds = ref<Favorited[]>([]);

// Fetch quizzes created by user
async function fetchData() {
  if (!user.value) return;

  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('creator', user.value);

  if (error) {
    alert(error.message);
    return;
  }

  studySets.value = data as Quiz[];
}

// Fetch favorited quiz IDs
async function fetchFavQuizIds() {
  if (!user.value) return;

  const { data, error } = await supabase
    .from('favorited')
    .select('quiz_id')
    .eq('username', user.value);

  if (error) {
    alert(error.message);
    return;
  }

  favQuizIds.value = data as Favorited[];
  await fetchFav();
}

// Fetch favorited quiz info
async function fetchFav() {
  favStudySets.value = [];

  for (const fav of favQuizIds.value) {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', fav.quiz_id)
      .single();

    if (error) {
      alert(error.message);
      continue;
    }

    favStudySets.value.push(data as Quiz);
  }
}

onBeforeMount(async () => {
  favStudySets.value = [];
  await fetchData();
  await fetchFavQuizIds();
});
</script>

<style scoped></style>
