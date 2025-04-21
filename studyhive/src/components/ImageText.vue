<template>
   <div class="flex flex-row w-3/4 h-fit mt-10">
        <img :src="imageSrc" alt="" class="w-[45%] aspect-[8/9] object-cover rounded-[3rem]"> 
        <div class="flex flex-col w-3/5 justify-center items-center">
            <h1 class="text-[300%] font-bold">Flashcards</h1>
            <p>{{info}}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    imageSrc: string
    info: string
}>()
</script>

<style scoped>

</style>