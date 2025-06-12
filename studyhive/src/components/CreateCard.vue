<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
  />
  <div class="bg-white flex flex-col rounded-2xl mb-4">
    <div class="mx-10 my-4 flex flex-row justify-between items-center">
      <h1 class="font-bold text-gray-400 text-[110%]">{{ num }}</h1>
      <i
        @click="remove"
        class="fa-solid fa-trash-can p-2 rounded-2xl hover:bg-amber-300 cursor-pointer transition-colors"
      ></i>
    </div>
    <div class="line w-full h-[2px] bg-[#F6F7FB]"></div>
    <div class="flex flex-col md:flex-row justify-between m-12">
      <div class="flex flex-col w-full md:w-[48%]">
        <textarea
          class="bg-transparent focus:outline-none border-b-2 border-b-black w-full resize-none overflow-hidden min-h-[1rem]"
          placeholder="Enter term"
          rows="1"
          oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
          v-model="term"
          @input="handleInput"
        ></textarea>
        <h3 class="mt-2 text-gray-400 text-[80%] font-medium">TERM</h3>
      </div>
      <div class="flex flex-col w-full md:w-[48%]">
        <textarea
          class="bg-transparent focus:outline-none border-b-2 border-b-black w-full resize-none overflow-hidden min-h-[1rem]"
          placeholder="Enter definition"
          rows="1"
          oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
          v-model="definition"
          @input="handleInput"
        ></textarea>
        <h3 class="mt-2 text-gray-400 text-[80%] font-medium">DEFINITION</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps({
  num: {
    type: Number,
  },
})

const emit = defineEmits<{    //defineEmits declares the updateCard event
  (e: 'updateCard', data: { term: string; definition: string }): void;
}>();

const term = ref('');
const definition = ref('');

function handleInput() {      //handleInput emits the updateCard event with the current values of term and definition whenever the user types in the input fields.
  emit('updateCard', { term: term.value, definition: definition.value });
}

</script>

<style scoped></style>
