<template>
    <div class="login fixed top-0 left-0 w-full h-full bg-green-200 z-[999] flex flex-row">
        <div class="w-1/2 h-full bg-amber-300">

        </div>
        <div class="w-1/2 h-full bg-white flex flex-col justify-center items-center gap-y-5">
            <ul class="flex flex-row absolute gap-15 top-0 w-1/2 ">
                <li class="font-bold text-4xl cursor-pointer p-7">Sign Up</li>
                <li class="font-bold text-4xl cursor-pointer p-7">Sign In</li>
                <div @click="close" class="absolute right-5 text-6xl cursor-pointer p-7">X</div>
            </ul>
            <button @click="signInWithGoogle" class="bg-white w-[70%] border rounded-lg px-6 py-3 text-black font-bold shadow flex justify-center items-center gap-4">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" class="w-6 h-6">
                Sign in with Google
            </button>
            <label class="input validator w-[70%] h-1/15">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                <input type="input" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
            </label>
            <label class="input validator w-[70%] h-1/15">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                <input type="password" required placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
            </label>
            <button class="cursor-pointer w-[15rem] h-[4rem] rounded-2xl bg-gradient-to-r from-amber-500 to-pink-400">Sign In</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);

function close() {
  emit('close')
}

import { auth, provider, signInWithPopup } from '@/lib/firebase';

async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    console.log('User signed in:', user.displayName)
    // TODO: Save user or redirect
  } catch (error) {
    console.error('Google sign-in failed:', error)
  }
}

</script>

<style scoped>

</style>