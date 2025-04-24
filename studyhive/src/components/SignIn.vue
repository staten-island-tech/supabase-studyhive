<template>
  <div class="login fixed top-0 left-0 w-full h-full bg-green-200 z-[999] flex flex-row">
    <div class="w-1/2 h-full bg-amber-300"></div>
    <div class="w-1/2 h-full bg-white flex flex-col justify-center items-center gap-y-5">
      <ul class="flex flex-row absolute gap-15 top-0 w-1/2">
        <li class="font-bold text-4xl cursor-pointer p-7">Sign Up</li>
        <li class="font-bold text-4xl cursor-pointer p-7">Sign In</li>
        <div @click="close" class="absolute right-5 text-6xl cursor-pointer p-7">X</div>
      </ul>
      <div class="singup w-full h-full bg-white flex flex-col justify-center items-center gap-y-5">
        <button
          @click="signInWithGoogle"
          class="bg-white w-[70%] border rounded-lg px-6 py-3 text-black font-bold shadow flex justify-center items-center gap-4"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            class="w-6 h-6"
          />
          Sign in with Google
        </button>
        <div class="">-------------------- or email ---------------------</div>
        <h1 class="w-[70%]">Bday</h1>
        <div class="flex flex-row w-[70%] gap-x-7">
          <button
            class="btn rounded-3xl w-48"
            popovertarget="popover-1"
            style="anchor-name: --anchor-1"
          >
            Month
          </button>
          <ul
            class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
            popover
            id="popover-1"
            style="position-anchor: --anchor-1"
          >
            <li v-for="month in months">
              <a>{{ month }}</a>
            </li>
          </ul>
          <button
            class="btn rounded-3xl w-48"
            popovertarget="popover-2"
            style="anchor-name: --anchor-2"
          >
            Day
          </button>
          <ul
            class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm max-h-[30rem]"
            popover
            id="popover-2"
            style="position-anchor: --anchor-2"
          >
            <li v-for="day in days">
              <a>{{ day }}</a>
            </li>
          </ul>
          <button
            class="btn rounded-3xl w-48"
            popovertarget="popover-3"
            style="anchor-name: --anchor-3"
          >
            Year
          </button>
          <ul
            class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm max-h-[30rem]"
            popover
            id="popover-3"
            style="position-anchor: --anchor-3"
          >
            <li v-for="year in years">
              <a>{{ year }}</a>
            </li>
          </ul>
        </div>
        <label class="input validator w-[70%] h-1/15">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
            type="input"
            required
            placeholder="Username"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minlength="3"
            maxlength="30"
            title="Only letters, numbers or dash"
          />
        </label>
        <label class="input validator w-[70%] h-1/15">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
              ></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            required
            placeholder="Password"
            minlength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <p>By signing up, you accept StudyHive's Terms of Service and Privacy Policy</p>
        <button
          class="cursor-pointer w-[15rem] h-[4rem] rounded-2xl bg-gradient-to-r from-amber-500 to-pink-400"
        >
          Sign Up
        </button>
        <button class="cursor-pointer w-[15rem] h-[4rem] rounded-2xl bg-white border-2">
          alr have an acc? sign in
        </button>
      </div>
      <div
        class="signin w-full h-full bg-white flex-col justify-center items-center gap-y-5 hidden"
      >
        <button
          @click="signInWithFacebook"
          class="bg-white w-[70%] border rounded-lg px-6 py-3 text-black font-bold shadow flex justify-center items-center gap-4"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
            alt="Facebook"
            class="w-6 h-6"
          />
          Sign in with Facebook
        </button>
        <button
          @click="signInWithApple"
          class="bg-white w-[70%] border rounded-lg px-6 py-3 text-black font-bold shadow flex justify-center items-center gap-4"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Apple"
            class="w-6 h-6"
          />
          Sign in with Apple
        </button>
        <button
          @click="signInWithGoogle"
          class="bg-white w-[70%] border rounded-lg px-6 py-3 text-black font-bold shadow flex justify-center items-center gap-4"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            class="w-6 h-6"
          />
          Sign in with Google
        </button>
        <label class="input validator w-[70%] h-1/15">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
            type="input"
            required
            placeholder="Username"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minlength="3"
            maxlength="30"
            title="Only letters, numbers or dash"
          />
        </label>
        <label class="input validator w-[70%] h-1/15">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
              ></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            required
            placeholder="Password"
            minlength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <button
          class="cursor-pointer w-[15rem] h-[4rem] rounded-2xl bg-gradient-to-r from-amber-500 to-pink-400"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { auth } from '@/lib/firebase'
import {
  FacebookAuthProvider,
  OAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
//dont use firebase use supabase instead***
const emit = defineEmits(['close'])
function selection() {
  //const selected = ref('sign in')
  //if clicked sign up, then hide other and switch to sign up area, vice versa (also make it so that if selected it will be underlined)
  console.log('uea')
}
function close() {
  emit('close')
}

const googleProvider = new GoogleAuthProvider()
async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    console.log('Google user signed in:', user.displayName)
  } catch (error) {
    console.error('Google sign-in failed:', error)
  }
}
const appleProvider = new OAuthProvider('apple.com')
async function signInWithApple() {
  try {
    const result = await signInWithPopup(auth, appleProvider)
    const user = result.user
    console.log('Apple user signed in:', user.displayName)
  } catch (error) {
    console.error('Apple sign-in failed:', error)
  }
}

const facebookProvider = new FacebookAuthProvider()
async function signInWithFacebook() {
  try {
    const result = await signInWithPopup(auth, facebookProvider)
    const user = result.user
    console.log('Facebook user signed in:', user.displayName)
  } catch (error) {
    console.error('Facebook sign-in failed:', error)
  }
}

//for sign up lel
const months = [
  'Month',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const currentYear = new Date().getFullYear()
const years = ['Year']
for (let year = currentYear - 129; year <= currentYear; year++) {
  years.push(year.toString())
}
console.log(years)
const days = ['Day']
for (let i = 1; i <= 31; i++) {
  days.push(i.toString())
}
</script>

<style scoped></style>
