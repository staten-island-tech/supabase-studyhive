<template>
    <div class="bg-white p-10 rounded-2xl">
        <h3>Title: {{ quizInfo.quiz_title }}</h3>
        <h4>Description: {{ quizInfo.description }}</h4>
        <h3>Creator: {{ quizInfo.creator }}</h3>
        <br>
        <p>Terms: {{ quizInfo.terms_number }}</p>
        <button @click="goToPlay">PLAY</button>
        <button v-if="!favorited" @click="favoritingStudySet(true)">FAVORITE</button>
        <button v-if="favorited" @click="favoritingStudySet(false)">UNFAVORITE</button>
    </div>
    <div class="bg-white p-10 rounded-2xl" v-for="term of terms" :term="term" :key="term.id">
        <h4>Term: {{ term.term }}</h4>
        <br>
        <p>Definition: {{ term.definition }}</p>
    </div>
</template>

<script setup lang="ts">
import { supabase } from '@/supabase.ts';
import { onBeforeMount, ref } from 'vue';
import { useUserStore } from '@/stores/users.ts';
import { useRouter } from 'vue-router';

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

let quizInfo = ref([]);
async function fetchQuiz() {
    const { data, error } = await supabase.from('quizzes').select('*').eq('id', props.studySetId).single();
    if (error) {
        console.log(error);
        return null;
    }
    quizInfo.value = data;
    await fetchTerms();
}

let terms = ref([]);
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
    await fetchTerms();
    await checkFavorited();
})

</script>

<style lang="scss" scoped>

</style>