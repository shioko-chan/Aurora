<script setup lang="ts">
import { computed, ref } from 'vue'

import ResizingPanel from './components/ResizingPanel.vue'
import LiteDialog from './components/LiteDialog.vue'
import VideoStream from './components/VideoStream.vue'
interface Config {
  path: string
}
interface Panel {
  id: number
  title: string
  x: number
  y: number
  width: number
  height: number
  type: string
  config: Config
}
interface Window {
  id: number
  name: string
  url: string
  panels: Array<Panel>
}
const windows = ref<Array<Window>>([
  {
    id: 0,
    name: 'QuasarTraj',
    url: 'ws://localhost:8080',
    panels: [
      {
        id: 0,
        title: '视频流-原图',
        x: 100,
        y: 100,
        width: 300,
        height: 200,
        type: 'video_stream',
        config: { path: '' },
      },
      // { id: 1, title: '视频流-检测框', x: 400, y: 100, width: 300, height: 200, type: 'video_stream', config: { url: 'http://localhost:8080' } },
      // { id: 2, title: '参数-相机参数', x: 100, y: 400, width: 300, height: 200 },
    ],
  },
  // {
  //   id: 1,
  //   name: 'CamCalib',
  //   panels: [
  //     { id: 0, title: '', x: 100, y: 100, width: 300, height: 200 },
  //     { id: 1, title: '', x: 400, y: 100, width: 300, height: 200 },
  //     { id: 2, title: '', x: 100, y: 400, width: 300, height: 200 },
  //     { id: 3, title: '', x: 400, y: 400, width: 300, height: 200 },
  //   ],
  // },
  // {
  //   id: 2,
  //   name: 'FindWay',
  //   panels: [
  //     { id: 0, title: '', x: 100, y: 100, width: 300, height: 200 },
  //     { id: 1, title: '', x: 400, y: 100, width: 300, height: 200 },
  //     { id: 2, title: '', x: 100, y: 400, width: 300, height: 200 },
  //     { id: 3, title: '', x: 400, y: 400, width: 300, height: 200 },
  //   ],
  // },
])

const window_select_dropdown_open = ref(false)

const dark_mode = ref(true)

function toggle_dark_mode() {
  dark_mode.value = !dark_mode.value
  document.documentElement.classList.toggle('dark', dark_mode.value)
}

const window_id = ref(0)

function change_window(id: number) {
  window_id.value = id
  window_select_dropdown_open.value = false
}

const current_window = computed(() => {
  return windows.value[window_id.value]
})

const dialog_open = ref(true)
const dialog_title = ref('Dialog Title')

const dialog_confirm = ref(() => { })

const new_window_name = ''

function create_new_window_dialog() {
  dialog_open.value = true
  dialog_title.value = '创建窗口'
  dialog_confirm.value = create_new_window
}

function create_new_window() {
  windows.value.push({ id: windows.value.length, name: new_window_name, url: '', panels: [] })
}

function open_window_from_config_dialog() { }

function save_window_dialog() {
  dialog_open.value = true
  dialog_title.value = '保存当前窗口布局？'
}

function restore_window_dialog() {
  dialog_open.value = true
  dialog_title.value = '是否重置窗口布局？'
}

const create_window_dropdown_open = ref(false)

const current_panel_id = ref(0)

function change_current_panel(id: number) {
  current_panel_id.value = id
}
</script>

<template>
  <LiteDialog v-model:is-open="dialog_open" v-model:title="dialog_title" @confirm="dialog_confirm">
    <div v-bind:hidden="true">
      <label for="input_box">新窗口标题: </label>
      <input id="input_box" type="text" v-model="new_window_name"
        class="w-60 border-b-2 border-desert dark:border-aurora" />
    </div>
  </LiteDialog>
  <header
    class="z-40 bg-desert-background text-desert-text dark:bg-aurora-background dark:text-aurora-text p-4 flex justify-between items-center border-b border-desert dark:border-aurora">
    <div class="flex items-center">
      <h1 class="text-xl font-bold mr-5">{{ current_window.name }}</h1>
      <div class="flex flex-col">
        <label for="ip_input">
          连接目标机器url：
        </label>
        <input id="ip_input" type="url" v-model="current_window.url"
          class="text-desert-text dark:text-aurora-text border-b-2 border-desert dark:border-aurora"
          placeholder="点击输入" />
      </div>
    </div>
    <div class="flex items-center">
      <div class="relative">
        <button class="mr-2 w-8 text-xl" @click="create_window_dropdown_open = !create_window_dropdown_open">
          ➕
        </button>
        <ul v-if="create_window_dropdown_open"
          class="text-sm absolute bg-desert text-desert-textlight dark:bg-aurora dark:text-aurora-textdark mt-2 rounded shadow-lg w-32 -left-10">
          <li @click="create_new_window_dialog"
            class="p-2 cursor-pointer text-center rounded border border-transparent hover:bg-desert-highlight dark:hover:bg-aurora-highlight hover:border-desert-background dark:hover:border-aurora-background">
            创建新窗口
          </li>
          <li @click="open_window_from_config_dialog"
            class="p-2 cursor-pointer text-center rounded border border-transparent hover:bg-desert-highlight dark:hover:bg-aurora-highlight hover:border-desert-background dark:hover:border-aurora-background">
            从配置文件打开
          </li>
        </ul>
      </div>
      <button class="mr-2 w-8 text-xl" @click="save_window_dialog">💾</button>
      <button class="mr-2 w-8 text-xl" @click="restore_window_dialog">🔄</button>
      <button class="mr-3 w-8 text-xl" @click="toggle_dark_mode">
        {{ dark_mode ? '✨' : '🔆' }}
      </button>
      <div class="relative">
        <button @click="window_select_dropdown_open = !window_select_dropdown_open"
          class="bg-desert text-desert-text dark:bg-aurora dark:text-aurora-textdark p-2 rounded w-32 text-center border border-transparent dark:hover:border-aurora-background">
          {{ current_window.name }}
        </button>
        <ul v-if="window_select_dropdown_open"
          class="absolute bg-desert text-desert-text dark:bg-aurora dark:text-aurora-textdark mt-2 rounded shadow-lg w-32">
          <li v-for="{ id, name } of windows" :key="id" @click="change_window(id)"
            class="p-2 hover:bg-desert-highlight dark:hover:bg-aurora-highlight hover:border-desert-background dark:hover:border-aurora-background cursor-pointer border border-transparent text-center rounded">
            {{ name }}
          </li>
        </ul>
      </div>
    </div>
  </header>

  <main
    class="bg-desert-background text-desert-text dark:bg-aurora-background dark:text-aurora-text p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
    <ResizingPanel v-for="panel of current_window.panels" :key="panel.id" @prime="change_current_panel(panel.id)"
      v-model:x="panel.x" v-model:y="panel.y" v-model:width="panel.width" v-model:height="panel.height"
      :class="[panel.id === current_panel_id ? 'z-30' : 'z-0']"
      class="bg-desert-background p-0.5 rounded border border-desert dark:bg-aurora-background dark:border-aurora">
      <template #title>
        <h2 class="text-lg font-bold mb-0.5 border-b border-desert dark:border-aurora pl-4">
          {{ panel.title }}
        </h2>
      </template>
      <template #content>
        <VideoStream v-if="panel.type === 'video_stream'"></VideoStream>
      </template>
    </ResizingPanel>
  </main>

  <footer class="bg-desert-background text-desert-text dark:bg-aurora-background dark:text-aurora-text p-4 relative">
    <p class="absolute right-4 bottom-2">🄯 shioko-chan XMU RCS 2025</p>
  </footer>
</template>
