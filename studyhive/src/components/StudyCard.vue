<template>
  <div class="w-[30%] p-[2px] rounded-3xl bg-gradient-to-r from-amber-500 to-pink-400">
    <div class="bg-base-100 rounded-3xl" @click="goToSet(studySet.id)">
      <div class="p-5 flex flex-col gap-3">
        <h2 class="card-title font-bold">{{studySet.quiz_title}}</h2>
        <div class="flex mb-10">
          <p class="terms bg-amber-300 px-3 py-1 rounded-2xl font-semibold text-[0.9rem]">
            {{studySet.terms_number}} terms
          </p>
        </div>
        <div class="user flex gap-2 items-center">
          <img :src="pfp" alt="" class="w-[7%] rounded-3xl" />
          <p class="user">{{studySet.creator}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/supabase.ts';

onMounted(async () => {
  await getPfp();
})

const props = defineProps({
  studySet: {
    type: Object,
    required: true
  }
});

const pfp = ref('');

async function getPfp() {
  const { data, error } = await supabase.from('profiles').select('avatar_url').eq("username", props.studySet.creator).single();
  if (error) {
    console.log (error);
    return null;
  }
  console.log(data);
  pfp.value = data.avatar_url;
}

const router = useRouter();
function goToSet(id: any) {
    router.push(`/StudySets/details/${id}`);
}

</script>

<style scoped></style>
