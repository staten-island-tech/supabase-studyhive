<template>

</template>

<script setup lang="ts">
import {supabase} from '../supabase.ts';;

async function testSignup() {
  const { data, error } = await supabase.auth.signUp({
    email: 'testuser' + Math.floor(Math.random() * 10000) + '@example.com',
    password: 'supersecret123',
  });

  if (error) {
    console.error('❌ Sign up failed:', error.message);
  } else {
    console.log('✅ Sign up succeeded! User ID:', data.user?.id);
  }
}

testSignup();



</script>

<style scoped>

</style>