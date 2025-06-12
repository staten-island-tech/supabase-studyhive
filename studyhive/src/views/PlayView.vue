<template>
    <div v-if="!started" class="h-[50rem] pt-[10rem] bg-[#F6F7FB] py-10 justify-items-center place-items-center text-black">
        <h3 class="font-bold text-xl" v-if="n === 0">{{ quizInfo.quiz_title }}</h3>
        <h3 v-if="n !== 0">FINISHED</h3>
        <br>
        <button v-if="n === 0" @click="started = true" class="btn">START</button>
        <p v-if="n !== 0">UNMEMORIZED TERM(S): {{ unmemTerms.length }}</p>
        <br>
        <button v-if="n !== 0" @click="goBack" class="btn">GO BACK TO DETAILS</button>
        <button v-if="n !== 0" @click="retry(true)" class="btn">RETRY W/ ALL TERMS</button>
        <button v-if="n !== 0 && unmemTerms.length !== 0" @click="retry(false)" class="btn">RETRY W/ ONLY UNKNOWN TERMS</button>
    </div>
    <div v-if="started" class="h-[50rem] pt-[10rem] bg-[#F6F7FB] py-10 flex flex-wrap items-center text-black">
        <p></p>
        <div v-if="!reveal" @click="reveal = true" class="card bg-white h-[50%] w-[45%] flex flex-column justify-center items-center ml-auto mr-auto">
            <h3 class="font-bold text-2xl">TERM</h3>
            <br>
            <p class="text-xl">{{ terms[n].term }}</p>
        </div>
        <div v-if="reveal" class="card bg-white h-[50%] w-[45%] flex flex-column justify-center items-center ml-auto mr-auto">
            <h3 class="font-bold text-2xl">DEFINITION</h3>
            <br>
            <p class="text-xl">{{ terms[n].definition }}</p>
            <br>
            <div v-if="n<(terms.length-1)" class="flex flex-wrap items-center flex-row">
                <button @click="goToNext(true)" class="btn" >MEMORIZED</button>
                <button @click="goToNext(false)" class="btn" >NEED MORE TIME</button>
            </div>
            <div @click="started = false" v-if="n===(terms.length-1)" class="flex flex-wrap items-center flex-row">
                <button @click="goToNext(true)" class="btn" >MEMORIZED</button>
                <button @click="goToNext(false)" class="btn" >NEED MORE TIME</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { supabase } from '@/supabase.ts';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
    studySetId: {
        type: String,
        required: true
    }
});

const router = useRouter();
function goBack() {
    router.push(`/StudySets/details/${props.studySetId}`);
}

async function retry(all:boolean) {
    if (all) {
        await fetchTerms();
        n.value = 0;
        unmemTerms.value = [];
        started.value = true;
    } else {
        terms.value = unmemTerms.value;
        n.value = 0;
        unmemTerms.value = [];
        started.value = true;
    }
}

const unmemTerms = ref([]);
function goToNext(memorized:boolean) {
    if (!memorized) {
        unmemTerms.value.push(terms.value[n.value]);
    }
    n.value++;
    reveal.value = false;
}

const started = ref(false);

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

const n = ref(0);
const reveal = ref(false);

onMounted(async () => {
    await fetchQuiz();
})

const route = useRoute();
watch(
  () => route.fullPath, // watch the route change
  async () => {
    await fetchQuiz();
    n.value = 0;
    started.value = false;
  },
  { immediate: true } // run on initial mount
)

</script>

<style lang="scss" scoped>

</style>