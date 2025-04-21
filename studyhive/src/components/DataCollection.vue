<template>

</template>

<script setup lang="ts">
import {supabase} from '../supabase.ts';

async function testSignup() {
  const { data, error } = await supabase.auth.signUp({
  email: 'elisachen334@gmail.com',
  password: 'example-password',
  options: {
    data: {
      username: 'serr',
      full_name: 'Elisa Chen',
    },
  },
  });

  if (error) {
    console.error('❌ Sign up failed:', error.message);
  } else {
    console.log('✅ Sign up succeeded! User ID:', data.user?.id);
  }
  console.log(data);
}

testSignup();

</script>

<style scoped>

</style>