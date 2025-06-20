<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
  />
  <div
    v-if="!started"
    class="min-h-screen bg-[#F6F7FB] py-10 w-full flex flex-col justify-center items-center gap-24"
  >
    <div class="flex justify-evenly flex-col items-center text-center">
      <h3 class="font-bold text-xl" v-if="n === 0">{{ quizInfo?.quiz_title }}</h3>
      <h3 class="font-bold text-4xl text-gray-700" v-if="n !== 0">FINISHED</h3>
      <br />
      <p class="font-bold text-2xl text-gray-700" v-if="n !== 0">UNMEMORIZED TERM(S): {{ unmemTerms.length }}</p>
    </div>

    <div class="flex flex-wrap md:flex-nowrap justify-center gap-4 w-4/5 md:w-1/2">
      <button
        v-if="n !== 0"
        @click="goBack"
        class="btn w-full md:w-[45%] h-16 rounded-4xl bg-transparent border-gray-300"
      >
        GO BACK TO DETAILS
      </button>
      <button
        v-if="n !== 0"
        @click="retry(true)"
        class="btn w-full md:w-[45%] h-16 rounded-4xl bg-transparent border-gray-300"
      >
        RETRY W/ ALL TERMS
      </button>
      <button
        v-if="n !== 0 && unmemTerms.length !== 0"
        @click="retry(false)"
        class="btn w-full md:w-[45%] h-16 rounded-4xl bg-transparent border-gray-300"
      >
        RETRY W/ ONLY UNKNOWN TERMS
      </button>
    </div>
  </div>

  <div
    v-if="started"
    class="h-[50rem] pt-[10rem] bg-[#F6F7FB] justify-center py-10 flex flex-col items-center"
  >
    <p></p>
    <div
      v-if="!reveal"
      @click="reveal = true"
      class="card bg-white h-[50%] w-[80%] md:w-[45%] flex flex-column justify-center items-center ml-auto mr-auto"
    >
      <h3 class="font-bold text-2xl">TERM</h3>
      <br />
      <p class="text-xl">{{ terms[n].term }}</p>
    </div>
    <div
      v-if="reveal"
      class="card bg-white h-[50%] w-[80%] md:w-[45%] flex flex-column justify-center items-center ml-auto mr-auto"
    >
      <h3 class="font-bold text-2xl">DEFINITION</h3>
      <br />
      <p class="text-xl w-[90%]">{{ terms[n].definition }}</p>
    </div>
    <div
      v-if="n < terms.length - 1"
      class="flex w-[80%] md:w-[45%] justify-evenly items-center flex-col gap-6 md:flex-row mt-5"
    >
      <button
        @click="goToNext(true)"
        class="btn w-full md:w-[45%] h-16 rounded-4xl bg-transparent border-gray-300"
      >
        <i class="fa-solid fa-chevron-right"></i>MEMORIZED
      </button>
      <button
        @click="goToNext(false)"
        class="btn w-full md:w-[45%] h-16 rounded-4xl bg-transparent border-gray-300"
      >
        <i class="fa-solid fa-arrow-rotate-right"></i>NEED MORE TIME
      </button>
    </div>
    <div
      @click="started = false"
      v-if="n === terms.length - 1"
      class="w-[80%] md:w-[45%] justify-evenly flex flex-wrap items-center gap-6 flex-col md:flex-row mt-5"
    >
      <button
        @click="goToNext(true)"
        class="btn w-full md:w-[45%] h-16 rounded-4xl bg-transparent border-gray-300"
      >
        <i class="fa-solid fa-chevron-right"></i>MEMORIZED
      </button>
      <button
        @click="goToNext(false)"
        class="btn w-full md:w-[45%] h-16 rounded-4xl bg-transparent border-gray-300"
      >
        <i class="fa-solid fa-arrow-rotate-right"></i>NEED MORE TIME
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '@/supabase.ts'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  studySetId: {
    type: String,
    required: true,
  },
})

interface Term {
  id: string
  term: string
  definition: string
  quiz_id: string
}

interface Quiz {
  id: string
  quiz_title: string
  creator: string
}

const router = useRouter()
function goBack() {
  router.push(`/StudySets/details/${props.studySetId}`)
}

async function retry(all: boolean) {
  if (all) {
    await fetchTerms()
    n.value = 0
    unmemTerms.value = []
    started.value = true
  } else {
    terms.value = unmemTerms.value
    n.value = 0
    unmemTerms.value = []
    started.value = true
  }
}

const unmemTerms = ref<Term[]>([])
function goToNext(memorized: boolean) {
  if (!memorized) {
    unmemTerms.value.push(terms.value[n.value])
  }
  n.value++
  reveal.value = false
}

const started = ref(true)

const quizInfo = ref<Quiz | null>(null)
async function fetchQuiz() {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('id', props.studySetId)
    .single()
  if (error) {
    alert(error)
    return null
  }
  quizInfo.value = data
  await fetchTerms()
}

const terms = ref<Term[]>([])

async function fetchTerms() {
  const { data, error } = await supabase.from('terms').select('*').eq('quiz_id', props.studySetId)
  if (error) {
    alert(error)
    return null
  }
  terms.value = data
}

const n = ref(0)
const reveal = ref(false)

onMounted(async () => {
  await fetchQuiz()
})

const route = useRoute()
watch(
  () => route.fullPath, // watch the route change
  async () => {
    await fetchQuiz();
    n.value = 0;
    started.value = true;
  },
  { immediate: true }, // run on initial mount
)
</script>

<style lang="scss" scoped></style>
