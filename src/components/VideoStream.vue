<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef, ref } from 'vue'

const wsUrl = 'ws://localhost:8080'

let canvas = useTemplateRef<HTMLCanvasElement>('canvas')
let ctx = canvas.value?.getContext('2d')
let websocket: WebSocket | null = null

function initializeWebSocket() {
  if (!canvas.value) {
    canvas = useTemplateRef<HTMLCanvasElement>('canvas')
  }
  if (!ctx) {
    ctx = canvas.value?.getContext('2d')
  }
  if (!canvas.value || !ctx) {
    return
  }
  if (websocket && websocket.readyState !== WebSocket.CLOSED) {
    console.warn('WebSocket 连接已存在，跳过初始化')
    return
  }

  websocket = new WebSocket(wsUrl)

  websocket.onopen = () => {
    console.log('视频流已建立连接')
    not_streaming.value = false
  }

  websocket.onmessage = async (event) => {
    const blob = new Blob([event.data], { type: 'image/jpeg' })
    if (!ctx || !canvas.value) {
      return
    }
    const image = await createImageBitmap(blob)
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.drawImage(image, 0, 0, canvas.value.width, canvas.value.height)
    not_streaming.value = false
  }

  websocket.onerror = (error) => {
    console.error('websocket出错，错误内容:', error)
    not_streaming.value = true
    scheduleReconnect()
  }

  websocket.onclose = () => {
    console.log('视频流websocket已关闭，尝试重连...')
    not_streaming.value = true
    scheduleReconnect()
  }
}

function closeWebSocket() {
  if (websocket) {
    websocket.close()
    websocket = null
  }
}

let reconnectTimeout: number | null = null
function scheduleReconnect() {
  if (reconnectTimeout) {
    return
  }
  reconnectTimeout = setTimeout(() => {
    closeWebSocket()
    initializeWebSocket()
    reconnectTimeout = null
  }, 3000)
}

onMounted(() => {
  initializeWebSocket()
})

onBeforeUnmount(() => {
  closeWebSocket()
})

const not_streaming = ref(false)
</script>

<template>
  <div v-if="not_streaming"
    class="w-full h-full bg-desert-background dark:bg-aurora-background flex justify-center items-center">
    <p class="text-xl text-center font-bold text-desert-text dark:text-aurora-text">⚠️视频流加载失败，请检查目标机ip是否输入正确⚠️</p>
  </div>
  <canvas v-else class="w-full h-full bg-desert-background dark:bg-aurora-background object-fill" ref="canvas"></canvas>
</template>
