<template>
    <div class="bg-white rounded-3xl w-1/3 aspect-square p-3 hover:scale-105 transition-all duration-300">
        <img src="/img/image.png" class="rounded-2xl aspect-[4/2]" alt="">
        <p>{{props.num}}terms</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    num: Number
})
</script>

<style scoped>

</style>