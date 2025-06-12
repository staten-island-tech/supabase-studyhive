<template>
  <div
    ref="card"
    class=" w-[90%] md:w-[30%] h-fit relative rounded-[10px] hover:scale-110 transition-all duration-300 overflow-visible"
    @mouseenter="startGradientLoop"
    @mouseleave="stopGradientLoop"
  >
    <!-- Gradient border layer -->
    <div
      ref="gradient"
      class="absolute -inset-[2px] rounded-[25px] z-0 opacity-0 pointer-events-none transition-opacity duration-300"
      :style="{
        backgroundImage: `
          conic-gradient(
            from ${angle}deg,
            rgba(245,158,11,0) 0deg,
            #f59e0b 10deg,
            #ec4899 40deg,
            rgba(236,72,153,0) 60deg,
            transparent 360deg
          )
        `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }"
    ></div>

    <!-- Card content layer -->
    <div class="relative z-10 bg-base-100 rounded-3xl p-5 bg-white" @click="goToSet(studySet.id)">
      <h2 class="card-title font-bold">{{ studySet.quiz_title }}</h2>
      <div class="flex mb-10">
        <p class="terms bg-amber-300 px-3 py-1 rounded-2xl font-semibold text-[0.9rem]">
          {{ studySet.terms_number }} terms
        </p>
      </div>
      <div class="user flex gap-2 items-center">
        <img :src="pfp" alt="" class="w-[7%] rounded-3xl" />
        <p class="user">{{ studySet.creator }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'




const card = ref<HTMLElement | null>(null)
const gradient = ref<HTMLElement | null>(null)
const angle = ref(0)
let animation: gsap.core.Tween | null = null

const startGradientLoop = () => {
  gsap.to(gradient.value, { opacity: 1, duration: 0.3 })

  animation = gsap.to(angle, {
    value: 360,
    duration: 4,
    ease: "linear",
    repeat: -1,
    modifiers: {
      value: (v) => {
        const val = parseFloat(v) % 360
        angle.value = val
        return val
      }
    }
  })
}

const stopGradientLoop = () => {
  gsap.to(gradient.value, { opacity: 0, duration: 0.3 })

  if (animation) {
    animation.kill()
    animation = null
    angle.value = 0
  }
}
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
