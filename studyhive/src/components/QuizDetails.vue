<template>
     <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
    <div class="flex flex-col justify-center items-center w-full bg-[#FFFFF] pt-[8rem] pb-[4rem]">
        <h1 class="text-[2.5rem] w-[80%] md:w-[60%] font-bold">{{ quizInfo?.quiz_title }}</h1>
        <h4 class="text-[1.5rem] w-[80%] md:w-[60%] font-bold">{{ quizInfo?.description }}</h4>
        <h3 class="text-[1rem] w-[80%] md:w-[60%]">Created by: {{ quizInfo?.creator }}</h3>
        <div class="bg-white flex justify-evenly p-4 rounded-2xl my-4 w-[80%] md:w-[60%] text-black">
            <button class="btn w-[45%] rounded-2xl h-16 border-0 bg-[#F6F7FB] text-black" @click="goToPlay"><i class="fa-solid fa-copy"></i>Flashcards</button>
            <button class="btn w-[45%] rounded-2xl h-16 border-0 bg-[#F6F7FB] text-black" v-if="!favorited" @click="favoritingStudySet(true)"><i class="fa-regular fa-star"></i>Favorite</button>
            <button class="btn w-[45%] rounded-2xl h-16 border-0 bg-[#F6F7FB] text-black" v-if="favorited" @click="favoritingStudySet(false)"><i class="fa-solid fa-star"></i>Unfavorite</button>
        </div>
        <h3 class="w-[80%] md:w-[60%] px-2 font-bold text-2xl">Terms in this set ({{ quizInfo?.terms_number }}) </h3>
        <div class=" bg-[#F6F7FB] w-[80%] md:w-[60%] rounded-2xl pt-5 flex flex-wrap flex-row justify-around">
            <div 
            class="bg-white py-7 px-5 rounded-[5px] text-black w-[95%] mb-5 flex flex-col md:flex-row justify-evenly"
            v-for="term of terms" 
            :term="term" 
            :key="term.id"
            >
                <h4 class="w-full md:w-1/5">{{ term.term }}</h4>
                <p class="w-full md:w-3/4">{{ term.definition }}</p>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { supabase } from '@/supabase.ts';
import { onBeforeMount, ref, watch } from 'vue';
import { useUserStore } from '@/stores/users.ts';
import { useRouter, useRoute } from 'vue-router';

interface QuizInfo {
  quiz_title: string;
  description: string;
  creator: string;
  terms_number: number;
  id: string;
}

interface Term {
  id: string;
  term: string;
  definition: string;
}

const props = defineProps({
    studySetId: {
        type: String,
        required: true
    }
})

const userStore = useUserStore();
const router = useRouter();
const favorited = ref(false);

async function goToPlay() {
    router.push(`/Play/${props.studySetId}`);
}

async function favoritingStudySet(action: boolean) {
	if (!userStore.isSignedIn) {
				alert('You need to sign in to be able to favorite a study set');
				return null;
    }
    if (action) {
        const { data, error } = await supabase.from('favorited').insert({quiz_id: props.studySetId, username: userStore.userInfo?.username}).select();
				if (error) {
					alert(error);
					return null;
				}
                favorited.value = true;
    } else if (!action) {
				const { data, error } = await supabase.from('favorited').delete().eq('quiz_id', props.studySetId).eq('username', userStore.userInfo?.username);
				if (error) {
					alert(error);
					return null;
				}
                favorited.value = false;
    }
}

async function checkFavorited() {
    if (!userStore.isSignedIn) {
        return null;
    }
    const { data, error } = await supabase.from('favorited').select('username').eq('quiz_id', props.studySetId);
    if (error) {
        alert(error);
        return null;
    }
    for (const user of data) {
        if (user.username === userStore.userInfo?.username) {
            favorited.value = true;
            return null;
        }
    }
}

const quizInfo = ref<QuizInfo | null>(null);
async function fetchQuiz() {
    const { data, error } = await supabase.from('quizzes').select('*').eq('id', props.studySetId).single();
    if (error) {
        alert(error);
        return null;
    }
    quizInfo.value = data;
    await fetchTerms();
}

const terms = ref<Term[]>([]);
async function fetchTerms() {
    const { data, error } = await supabase.from('terms').select('*').eq('quiz_id', props.studySetId);
    if (error) {
        alert(error);
        return null;
    }
    terms.value = data;
}

onBeforeMount(async () => {
    await fetchQuiz();
    await checkFavorited();
})

const route = useRoute();
watch(
  () => route.fullPath, // watch the route change
  async () => {
    await fetchQuiz();
    await checkFavorited();
  },
  { immediate: true } // run on initial mount
)

</script>

<style lang="scss" scoped>

</style>