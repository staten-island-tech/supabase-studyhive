<template>
    <div class="bg-white p-10 rounded-2xl">
        <h3>Title: {{ quizInfo.quiz_title }}</h3>
        <h4>description: {{ quizInfo.description }}</h4>
        <h3>creator: {{ quizInfo.creator }}</h3>
        <br>
        <p>Terms: {{ quizInfo.terms_number }}</p>
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

const props = defineProps({
    studySetId: {
        type: String,
        required: true
    }
})

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
})

</script>

<style lang="scss" scoped>

</style>