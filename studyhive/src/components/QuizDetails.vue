<template>
    <div class="pt-[10rem] bg-[#F6F7FB] py-10 flex flex-row justify-around">
        <div class="bg-white p-10 rounded-2xl h-[90%] w-[95%] text-black">
            <h3>Title: {{ quizInfo.quiz_title }}</h3>
            <h4>Description: {{ quizInfo.description }}</h4>
            <h3>Creator: {{ quizInfo.creator }}</h3>
            <br>
            <p>Terms: {{ quizInfo.terms_number }}</p>
            <button class="btn mr-5 mt-5" @click="goToPlay">PLAY</button>
            <button class="btn mt-5" v-if="!favorited" @click="favoritingStudySet(true)">FAVORITE</button>
            <button class="btn mt-5" v-if="favorited" @click="favoritingStudySet(false)">UNFAVORITE</button>
        </div>
    </div>
    <div class="pt-[5rem] bg-[#F6F7FB] py-10 flex flex-wrap flex-row justify-around">
        <div class="bg-white p-10 rounded-2xl text-black h-[30%] w-[95%] mb-5" v-for="term of terms" :term="term" :key="term.id">
            <h4>Term: {{ term.term }}</h4>
            <br>
            <p>Definition: {{ term.definition }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { supabase } from '@/supabase.ts';
import { onBeforeMount, ref, watch } from 'vue';
import { useUserStore } from '@/stores/users.ts';
import { useRouter, useRoute } from 'vue-router';

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
					console.log(error);
					return null;
				}
                favorited.value = true;
    } else if (!action) {
				const { data, error } = await supabase.from('favorited').delete().eq('quiz_id', props.studySetId).eq('username', userStore.userInfo?.username);
				if (error) {
					console.log(error);
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
        console.log(error);
        return null;
    }
    for (const user of data) {
        if (user.username === userStore.userInfo?.username) {
            favorited.value = true;
            return null;
        }
    }
}

const quizInfo = ref([]);
async function fetchQuiz() {
    const { data, error } = await supabase.from('quizzes').select('*').eq('id', props.studySetId).single();
    if (error) {
        console.log(error);
        return null;
    }
    quizInfo.value = data;
    await fetchTerms();
}

const terms = ref([]);
async function fetchTerms() {
    const { data, error } = await supabase.from('terms').select('*').eq('quiz_id', props.studySetId);
    if (error) {
        console.log(error);
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