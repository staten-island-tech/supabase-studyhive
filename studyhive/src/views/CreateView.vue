<template>
  <div class="pt-40 w-full h-fit pb-[2rem] bg-[#F6F7FB] flex justify-center">
    <div class="w-3/5">
      <div class="flex flex-col justify-center mb-4 gap-5">
        <input
          type="text"
          class="font-medium w-full h-12 pl-4 rounded-[10px] bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
          placeholder='Enter a title, like "ELA STUFF"'
          v-model="title"
        />
        <input
          type="text"
          class="font-medium w-full h-16 pl-4 pb-3 bg-white rounded-[10px] focus:shadow-[0_2px_0_0_rgba(0,0,0,1)] focus:outline-none"
          placeholder="Add a description..."
          v-model="description"
        />
      </div>
      <CreateCard v-for="num in numCards" :num="num" />
      <div
        @click="addAnotherCard"
        class="w-full rounded-2xl mt-7 bg-white h-30 flex justify-center items-center text-[100%] font-bold underline tracking-widest cursor-pointer decoration-amber-400 underline-offset-6 decoration-4 transition-all hover:decoration-[#3CCFCF] hover:text-[#3CCFCF]"
      >
        ADD CARD
      </div>
      <div class="w-full flex flex-row justify-end gap-3 mt-3">
        <button @click="createQuiz(false)" class="w-1/9 rounded-[100rem] outline-1 aspect-[3]">
          Create
        </button>
        <button
          @click="createQuiz(true)"
          class="w-1/5 font-bold rounded-[100rem] bg-amber-400 outline-1 aspect-[3]"
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
  const numCards = ref(1);
  function addAnotherCard() {
    numCards.value++;
  }

  const title = ref('');
  const description = ref('');

  const userStore = useUserStore();
  async function createQuiz(redirect:boolean) {
    if (title.value === '') {
      alert("You didn't fill in the title");
      return null;
    }
    const { data,error } = supabase.from('quizzes').insert({quiz_title: title.value, creator: userStore.userInfo.username, terms: numCards.value, description: description.value}).select().single();
    if (error) {
      alert(error);
      return null;
    }
    console.log(data);
    if (redirect) {
      //add redirected view;
    }
    return 'created';
  }
}
</script>

<style scoped></style>
