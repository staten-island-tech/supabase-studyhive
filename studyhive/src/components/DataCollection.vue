<script setup>
import { onMounted, reactive } from 'vue';
import { supabase } from '@/supabase.js';

let data = reactive([]);

async function getData() {
  let { data: users, error } = await supabase
  .from('users')
  .select('*')

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  console.log(users);
  data = users;
}

onMounted(() => {
  getData();
});
</script>

<template>
  <ul>
    <li v-for="user in data" :key="user.user_id">
      {{ user }}
    </li>
  </ul>
</template>