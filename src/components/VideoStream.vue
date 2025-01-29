<template>
  <canvas class="w-full h-full bg-desert-background dark:bg-aurora-background object-fill" ref="canvas"></canvas>
</template>

<script setup lang="ts">

import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue';

const wsUrl = "ws://localhost:8080";

let canvas = useTemplateRef<HTMLCanvasElement>("canvas");
let ctx = canvas.value?.getContext("2d");
let websocket: WebSocket | null = null;

function initializeWebSocket() {
  if (!canvas.value) {
    canvas = useTemplateRef<HTMLCanvasElement>("canvas");
  }
  if (!ctx) {
    ctx = canvas.value?.getContext("2d");
  }
  if (!canvas.value || !ctx) {
    return;
  }
  if (websocket && websocket.readyState !== WebSocket.CLOSED) {
    console.warn("WebSocket 连接已存在，跳过初始化");
    return;
  }

  websocket = new WebSocket(wsUrl);

  websocket.onopen = () => {
    console.log("视频流已建立连接");
  };

  websocket.onmessage = async event => {
    const blob = new Blob([event.data], { type: "image/jpeg" });
    if (!ctx || !canvas.value) { return; }
    const image = await createImageBitmap(blob);
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.drawImage(image, 0, 0, canvas.value.width, canvas.value.height);
  };

  websocket.onerror = error => {
    console.error("websocket出错，错误内容:", error);
    scheduleReconnect();
  };

  websocket.onclose = () => {
    console.log("视频流websocket已关闭，尝试重连...");
    scheduleReconnect();
  };
};

function closeWebSocket() {
  if (websocket) {
    websocket.close();
    websocket = null;
  }
}

let reconnectTimeout: number | null = null;
function scheduleReconnect() {
  if (reconnectTimeout) { return };
  reconnectTimeout = setTimeout(() => {
    closeWebSocket();
    initializeWebSocket();
    reconnectTimeout = null;
  }, 3000);
}

onMounted(() => {
  initializeWebSocket();
});

onBeforeUnmount(() => {
  closeWebSocket();
});

</script>
