<template>
  <div class="pt-40 w-full h-fit pb-[2rem] bg-[#F6F7FB] flex justify-center">
    <div class="w-4/5 md:w-3/5">
      <div class="flex flex-col justify-center mb-4 gap-5">
        <input
          type="text"
          class="font-medium text-black w-full h-12 pl-4 rounded-[10px] bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
          placeholder='Enter a title, like "ELA STUFF"'
          v-model="title"
        />
        <input
          type="text"
          class="font-medium text-black w-full h-16 pl-4 pb-3 bg-white rounded-[10px] focus:shadow-[0_2px_0_0_rgba(0,0,0,1)] focus:outline-none"
          placeholder="Add a description..."
          v-model="description"
        />
      </div>
      <CreateCard v-for="(card, index) in cards" :num="index + 1" :key="card.id" @updateCard="handleCardData(card.id, $event)" @remove="removeCard(index)" />
      <div
        @click="addAnotherCard"
        class="w-full rounded-2xl mt-7 bg-white h-30 flex justify-center items-center text-[100%] font-bold underline tracking-widest cursor-pointer decoration-amber-400 underline-offset-6 decoration-4 transition-all text-black hover:decoration-[#3CCFCF] hover:text-[#3CCFCF]"
      >
        ADD CARD
      </div>
      <div class="w-full flex flex-col md:flex-row justify-end gap-3 mt-3">
        <button @click="createQuiz(false)" class="w-full md:w-1/9 rounded-[100rem] text-[1.2rem] font-bold text-gray-500 outline-gray-300 outline-1 h-20 md:aspect-[3]">
          Create
        </button>
        <button
          @click="createQuiz(true)"
          class=" w-full md:w-1/5 font-bold rounded-[100rem] bg-amber-400 text-[1.2rem] text-white outline-amber-400 outline-1 h-20 md:aspect-[3]"
        >
          Create and Practice
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { supabase } from '@/supabase.ts';
  import { useUserStore } from '@/stores/users.ts';
  import CreateCard from '@/components/CreateCard.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const numCards = ref(1);
  const router = useRouter();

  let nextCardId = 1
  const cards = ref([{ id: nextCardId++ }]) // first card

  function addAnotherCard() {
    numCards.value++;
    cards.value.push({ id: nextCardId++ });
  }

  function removeCard(index: number) {
    numCards.value--;
    cards.value.splice(index, 1);
  }

  //cardsData is a reactive object that stores the data from each card, indexed by the card number.
  const cardsData = ref<{ [id: number]: { term: string; definition: string } }>({});

  //handleCardData updates cardsData with the emitted data from each card.
  function handleCardData(id: number, data: { term: string; definition: string }) {
    cardsData.value[id] = data;
  }

  const title = ref('');
  const description = ref('');

  async function deleteQuiz(quizId: string) {
    const { data, error } = await supabase.from('quizzes').delete().eq('id', quizId);
    if (error) {
      alert(error);
      return null;
    }
  }

  const userStore = useUserStore();
  async function createQuiz(redirect:boolean) {
    if (title.value === '') {
      alert("You didn't fill in the title");
      return null;
    }
    const username = userStore.userInfo?.username;
    const { data, error } = await supabase.from('quizzes').insert({quiz_title: title.value, creator: username, terms_number: numCards.value, description: description.value}).select().single();
    if (error) {
      alert(error);
      return null;
    }
    await createTerms(data.id);
    if (createdTerms.value === false) {
      await deleteQuiz(data.id);
      return null;
    }
    if (redirect) {
      title.value = '';
      cardsData.value = {};
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      router.push(`/Play/${data.id}`);
    } else {
      title.value = '';
      cardsData.value = {};
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      router.push('/Home');
    }
  }

  const createdTerms = ref(false);
  async function createTerms(quiz_id: string) {
    createdTerms.value = false;
    for (const card of cards.value) {
      const dataEntry = cardsData.value[card.id];
      if ((dataEntry.definition.length === 0) || (dataEntry.term.length === 0)) {
        alert("You didn't fill in all terms + definitions for your study set.");
        return null;
      }

      const { data, error } = await supabase.from('terms').insert({quiz_id: quiz_id, term: dataEntry.term, definition: dataEntry.definition}).select();
      if (error) {
        alert(error);
        return null;
      }
    }
    createdTerms.value = true;
    return 'terms saved completely';
  }
</script>

<style scoped></style>
