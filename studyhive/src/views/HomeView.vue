<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase.js';

const messages = ref([]);

async function getMessages() {
  let { data: users, error } = await supabase
  .from('users')
  .select('*')

  if (error) {
    console.error('Error fetching messages:', error);
    return;
  }

  console.log(users);
}

onMounted(() => {
  getMessages();
});
</script>

<template>
  <ul>
    <li v-for="message in messages" :key="message.id">
      {{ message.content }}
    </li>
  </ul>
</template>