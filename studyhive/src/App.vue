<script setup lang="ts">
import { useUserStore } from '@/stores/users.ts';
import { supabase } from '@/supabase.ts';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
import SignIn from './components/SignIn.vue';
import { showSignIn } from './var.ts';

const showNav = ref(true);
let lastScrollY = window.scrollY;
const showShadow = ref(false);
const mobileMenuOpen = ref(false);
const showScroll = ref(false);

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  showNav.value = currentScrollY < lastScrollY || currentScrollY < 10;
  showShadow.value = currentScrollY > 10;
  showScroll.value = currentScrollY > 300; // 👈 show button after 300px scroll

  lastScrollY = currentScrollY;
};

const userStore = useUserStore();

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function opents() {
  showSignIn.value = true;
}

function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const router = useRouter();

function goToLockedRoute(route: string) {
  if (userStore.isSignedIn) {
    router.push(route);
  } else {
    opents();
  }
}

function signOut() {
  userStore.signOut();
  router.push('/');
}

const loggedin = ref(false);
</script>

<template>
  <div class="bg-white text-black">
    <header>
      <div class="wrapper">
        <nav
          :class="[
            'flex justify-center left-1/2 -translate-x-1/2 rounded-b-3xl items-center w-[99%] h-[8rem] px-8 bg-white fixed top-0 z-50 transition-all duration-300',
            showNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
            showShadow ? 'shadow-2xl' : '',
          ]"
        >
          <div class="flex justify-between w-[90%] items-center">
            <RouterLink
              to="/"
              class="items-center left-10 text-3xl font-bold flex gap-x-5 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-400"
            >
              StudyHive
            </RouterLink>

            <!-- Desktop Nav -->
            <ul class="hidden md:flex gap-[3rem] items-center">
              <button @click="goToLockedRoute('/Home')" class="text-xl font-semibold text-black hover:underline">Home</button>
              <RouterLink to="/StudySets" class="text-xl font-semibold text-black hover:underline cursor-pointer">Study Sets</RouterLink>
              <button @click="goToLockedRoute('/Create')" class="text-xl font-semibold text-black hover:underline cursor-pointer">Create</button>
              <li
                @click="opents"
                v-if="!userStore.isSignedIn"
                class="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-400 px-4 py-2 rounded cursor-pointer"
              >
                SIGN IN
              </li>
              <li
                @click="signOut"
                v-if="userStore.isSignedIn"
                class="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-400 px-4 py-2 rounded cursor-pointer"
              >
                SIGN OUT
              </li>
            </ul>

            <!-- Hamburger Button -->
            <div class="md:hidden">
              <button @click="mobileMenuOpen = !mobileMenuOpen">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Mobile Dropdown Menu -->
          <div
            v-if="mobileMenuOpen"
            class="absolute top-full mt-2 w-full bg-white shadow-2xl rounded-b-2xl px-8 py-4 md:hidden flex flex-col space-y-4 z-50"
          >
            <button @click="goToLockedRoute('/Home')" class="text-lg font-semibold text-black text-left">Home</button>
            <RouterLink to="/StudySets" class="text-lg font-semibold text-black text-left">Study Sets</RouterLink>
            <button @click="goToLockedRoute('/Create')" class="text-lg font-semibold text-black text-left">Create</button>
            <button
              v-if="!userStore.isSignedIn"
              @click="opents"
              class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-400 text-left"
            >
              SIGN IN
            </button>
            <button
              v-if="userStore.isSignedIn"
              @click="userStore.signOut"
              class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-400 text-left"
            >
              SIGN OUT
            </button>
          </div>
        </nav>
      </div>
    </header>

    <div class="fixed z-100 bottom-4 right-10">
      <button
        v-show="showScroll"
        @click="scrollUp"
        class="fixed z-50 bottom-8 right-8 w-16 h-16 bg-amber-500 text-white text-3xl rounded-full shadow-lg hover:bg-amber-400 active:scale-95 transition-all duration-200"
        aria-label="Scroll to top"
      >
        🡡
      </button>

    </div>

    <SignIn v-if="showSignIn" @close="showSignIn = false" />
    <RouterView />

    <footer class="footer footer-horizontal footer-center bg-white shadow-2xl rounded p-10 text-black">
      <nav class="grid grid-flow-col gap-4">
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Jobs</a>
        <a class="link link-hover">Press kit</a>
      </nav>
      <nav>
        <div class="grid grid-flow-col gap-4">
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              ></path>
            </svg>
          </a>
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
              ></path>
            </svg>
          </a>
        </div>
      </nav>
      <aside>
        <p>Copyright © idk - All right reserved by StudyHive peopl who created it</p>
      </aside>
    </footer>
  </div>
</template>

<style scoped></style>
