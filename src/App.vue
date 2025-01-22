<script setup lang="ts">
import { ref } from 'vue';

const windowName = ref('Window 1');
const windowNames = ['Window 1', 'Window 2', 'Window 3'];

function changeWindowName(name: string) {
  windowName.value = name;
}
const dropdownOpen = ref(false);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

const isDarkMode = ref(true);

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
}
</script>

<template>
  <header
    class="bg-desert-background text-desert-text dark:bg-aurora-background dark:text-aurora-text p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold">{{ windowName }}</h1>
    <div class="flex items-center">
      <button @click="toggleDarkMode" class="mr-2 p-2 w-12 text-3xl">
        {{ isDarkMode ? '◐' : '◑' }}
      </button>
      <div class="relative">
        <button @click="toggleDropdown"
          class="bg-desert text-desert-textlight dark:bg-aurora dark:text-aurora-textdark p-2 rounded w-32 text-center border border-transparent dark:hover:border-aurora-background">
          {{ windowName }}
        </button>
        <ul v-if="dropdownOpen"
          class="absolute bg-desert text-desert-textlight dark:bg-aurora dark:text-aurora-textdark mt-2 rounded shadow-lg w-32">
          <li v-for="name in windowNames" :key="name" @click="changeWindowName(name); dropdownOpen = false"
            class="p-2 hover:bg-desert-highlight cursor-pointer border border-transparent dark:hover:bg-aurora dark:hover:border-aurora-background text-center">
            {{ name }}
          </li>
        </ul>
      </div>
    </div>
  </header>

  <main
    class="bg-desert-background text-desert-text dark:bg-aurora-background dark:text-aurora-text p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
    <div class="bg-desert-background p-4 rounded border border-desert dark:bg-aurora-background dark:border-aurora">
      <h2 class="text-lg font-bold mb-2">Panel 1</h2>
      <p>Content goes here...</p>
    </div>
    <div class="bg-desert-background p-4 rounded border border-desert dark:bg-aurora-background dark:border-aurora">
      <h2 class=" text-lg font-bold mb-2">Panel 2</h2>
      <p>Content goes here...</p>
    </div>
    <div class="bg-desert-background p-4 rounded border border-desert dark:bg-aurora-background dark:border-aurora">
      <h2 class="text-lg font-bold mb-2">Panel 3</h2>
      <p>Content goes here...</p>
    </div>
  </main>

  <footer class="bg-desert-background text-desert-text dark:bg-aurora-background dark:text-aurora-text p-4">
    <p>🄯 2025</p>
  </footer>
</template>

<style scoped></style>
