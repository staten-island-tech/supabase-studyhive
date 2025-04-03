<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase.js';

const messages = ref([]);

async function getMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    return;
  }

  messages.value = data;
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