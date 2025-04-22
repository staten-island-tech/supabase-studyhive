<template>
    <div class="mt-30 bg-green-400 py-10 flex flex-row justify-around">
        <StudyCard/>
        <StudyCard/>
        <StudyCard/>
    </div>
</template>

<script setup lang="ts">
import StudyCard from '@/components/StudyCard.vue';

const test =[
  {
    "title": "Biology Key Concepts",
    "user": "Emily Davis",
    "terms": "42 terms"
  },
  {
    "title": "Chemistry Equations",
    "user": "David Lee",
    "terms": "35 terms"
  },
  {
    "title": "World History Timeline",
    "user": "Sophia Garcia",
    "terms": "50 terms"
  },
  {
    "title": "French Vocabulary",
    "user": "Liam Johnson",
    "terms": "60 terms"
  },
  {
    "title": "Mathematics Formulas",
    "user": "Olivia Martinez",
    "terms": "28 terms"
  },
  {
    "title": "Physics Laws",
    "user": "Aiden Wilson",
    "terms": "22 terms"
  },
  {
    "title": "Computer Science Algorithms",
    "user": "Isabella Brown",
    "terms": "45 terms"
  },
  {
    "title": "Psychology Definitions",
    "user": "Mason Moore",
    "terms": "39 terms"
  }
]

</script>

<style scoped>

</style>    