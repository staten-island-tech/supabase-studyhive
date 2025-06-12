<template>
  <div class="w-full h-[90rem] bg-[#F6F7FB] gap-9 items-center pt-48 flex flex-col">
    <div class="w-[90%] md:w-[60%] aspect-[2] md:aspect-[4] p-7 bg-amber-500 rounded-2xl flex flex-row gap-24">
      <div class="flex flex-col ">
        <h1 class=" font-bold text-3xl">WELCOME BACK, {{userUpper}}!</h1>
        <p class="">doah shafuisah fuidhasifhdsuiauidf uih auih uih asuih suih aduih  uishsuidh  uisdfhuih asdih asdfuih sdauih asdfuih asdfu sdfauih fduih </p>
      </div>
      <img src="/img/image.png" alt="" class="hidden md:block w-2/5 aspect-[5/3]"/>
    </div>
    <div class="flex flex-col w-[90%] md:w-[60%]">
      <h1 class=" font-bold text-4xl mb-3">Your Sets</h1>
      <div class="flex ">
        <YourSetsCard v-for="studySet of studySets" :studySet="studySet" :key="studySet.id"/>
      </div>
    </div>
    <div class="flex flex-col w-[90%] md:w-[60%]">
      <h1 class=" font-bold text-4xl mb-3">Your Favorited Sets</h1>
      <div class="flex ">
        <YourSetsCard v-for="studySet of studySets" :studySet="studySet" :key="studySet.id"/>
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

let studySets = ref([]);
async function fetchData() {
  const { data, error } = await supabase.from('quizzes').select('*').eq('creator', user.value);
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

<style scoped></style>
