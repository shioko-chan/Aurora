<script setup lang="ts">
import { computed, ref } from 'vue';
import ResizingPanel from './components/ResizingPanel.vue';

const window_id = ref(0);
const windows = ref([{
  id: 0,
  name: 'QuasarTraj',
  panels: [
    { id: 0, title: '视频流-原图', x: 100, y: 100, width: 300, height: 200, type: 'video_stream' },
    { id: 1, title: '视频流-检测框', x: 400, y: 100, width: 300, height: 200, type: 'video_stream' },
    { id: 2, title: '参数调整-', x: 100, y: 400, width: 300, height: 200 },
    // { id: 3, title: '', x: 400, y: 400, width: 300, height: 200 },
  ]
}, {
  id: 1,
  name: 'CamCalib',
  panels: [
    { id: 0, title: '', x: 100, y: 100, width: 300, height: 200 },
    { id: 1, title: '', x: 400, y: 100, width: 300, height: 200 },
    { id: 2, title: '', x: 100, y: 400, width: 300, height: 200 },
    { id: 3, title: '', x: 400, y: 400, width: 300, height: 200 },
  ]
}, {
  id: 2,
  name: 'FindWay',
  panels: [
    { id: 0, title: '', x: 100, y: 100, width: 300, height: 200 },
    { id: 1, title: '', x: 400, y: 100, width: 300, height: 200 },
    { id: 2, title: '', x: 100, y: 400, width: 300, height: 200 },
    { id: 3, title: '', x: 400, y: 400, width: 300, height: 200 },
  ]
}]);

const dropdown_open = ref(false);

function toggle_dropdown() {
  dropdown_open.value = !dropdown_open.value;
}

const dark_mode = ref(true);

function toggle_dark_mode() {
  dark_mode.value = !dark_mode.value;
  document.documentElement.classList.toggle('dark', dark_mode.value);
}

const current_window = computed(() => {
  return windows.value[window_id.value];
});

function change_window(id: number) {
  window_id.value = id;
}

const new_panel_dialog_visible = ref(true);
const form = ref({
  name: 'name here',
  region: 'region here',
});
</script>

<template>
  <el-dialog v-model="new_panel_dialog_visible" title="新建面板" width="500">
    <el-form :model="form">
      <el-form-item label="Promotion name" label-width="100px">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" label-width="100px">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="new_panel_dialog_visible = false">Cancel</el-button>
        <el-button type="primary" @click="new_panel_dialog_visible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

  <header class="bg-desert-background text-desert-text dark:bg-aurora-background dark:text-aurora-text p-4 flex justify-between items-center
    border-b border-desert dark:border-aurora">
    <h1 class="text-xl font-bold">{{ current_window.name }}</h1>
    <div class="flex items-center">
      <button class="mr-2 w-8 text-xl">
        ➕
      </button>
      <button class="mr-2 w-8 text-xl">
        💾
      </button>
      <button class="mr-2 w-8 text-xl">
        🔄
      </button>
      <button @click="toggle_dark_mode" class="mr-3 w-8 text-xl">
        {{ dark_mode ? '✨' : '🔆' }}
      </button>
      <div class="relative">
        <button @click="toggle_dropdown"
          class="bg-desert text-desert-textlight dark:bg-aurora dark:text-aurora-textdark p-2 rounded w-32 text-center border border-transparent dark:hover:border-aurora-background">
          {{ current_window.name }}
        </button>
        <ul v-if="dropdown_open"
          class="absolute bg-desert text-desert-textlight dark:bg-aurora dark:text-aurora-textdark mt-2 rounded shadow-lg w-32">
          <li v-for="{ id, name } of windows" :key="id" @click="change_window(id); dropdown_open = false"
            class="p-2 hover:bg-desert-highlight cursor-pointer border border-transparent dark:hover:bg-aurora dark:hover:border-aurora-background text-center">
            {{ name }}
          </li>
        </ul>
      </div>
    </div>
  </header>

  <main
    class="bg-desert-background text-desert-text dark:bg-aurora-background dark:text-aurora-text p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
    <ResizingPanel v-for="panel of current_window.panels" :key="panel.id" v-model:x="panel.x" v-model:y="panel.y"
      v-model:width="panel.width" v-model:height="panel.height"
      class="bg-desert-background p-0.5 rounded border border-desert dark:bg-aurora-background dark:border-aurora">
      <template #title>
        <h2 class="text-lg font-bold mb-2 border-b border-desert dark:border-aurora pl-4">{{ panel.title }}</h2>
      </template>
      <template #content>
        <p>Content goes here...</p>
      </template>
    </ResizingPanel>
  </main>

  <footer class="bg-desert-background text-desert-text dark:bg-aurora-background dark:text-aurora-text p-4 relative">
    <p class="absolute right-4 bottom-2">🄯 shioko-chan XMU RCS 2025</p>
  </footer>
</template>

<style scoped></style>
