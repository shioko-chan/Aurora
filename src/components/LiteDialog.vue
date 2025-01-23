<template>
  <div v-if="is_open" class="fixed inset-0 flex justify-center items-center z-50">
    <div
      class="bg-desert-background dark:bg-aurora-background p-6 rounded-lg w-96 max-w-full border-2 border-desert dark:border-aurora">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold text-desert-text dark:text-aurora-text">{{ title }}</h2>
      </div>
      <div class="text-aurora-textdark dark:text-aurora-text">
        <slot></slot>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="emit('confirm'); is_open = false"
          class="mr-2 bg-desert dark:bg-aurora text-desert-text dark:text-aurora-textdark px-4 py-2 rounded">确定</button>
        <button @click="is_open = false"
          class="bg-desert-supplement dark:bg-aurora-supplement text-desert-text dark:text-aurora-text px-4 py-2 rounded">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { defineProps, defineEmits } from 'vue';
const is_open = defineModel<boolean>('is-open', { default: false });
const title = defineModel<string>('title', { default: '' });

const emit = defineEmits(['confirm']);

</script>
