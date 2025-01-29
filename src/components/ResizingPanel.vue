<script setup lang="ts">

import { ref } from 'vue';

const emit = defineEmits(['prime']);

const panel_width = defineModel<number>('width', { default: 300 });
const panel_height = defineModel<number>('height', { default: 200 });
const panel_left = defineModel<number>('x', { default: 100 });
const panel_top = defineModel<number>('y', { default: 100 });

const dragging = ref(false);
const resizing = ref(false);

let start_x = 0;
let start_y = 0;
let start_width = 0;
let start_height = 0;
let start_left = 0;
let start_top = 0;
let resizing_direction = '';

const start_drag = (event: MouseEvent) => {
  emit('prime');
  dragging.value = true;
  start_x = event.clientX;
  start_y = event.clientY;
  start_left = panel_left.value;
  start_top = panel_top.value;
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', stop_drag);
};

function drag(event: MouseEvent) {
  if (!dragging.value) return;
  panel_left.value = start_left + event.clientX - start_x;
  panel_top.value = start_top + event.clientY - start_y;
};

function stop_drag() {
  dragging.value = false;
  window.removeEventListener('mousemove', drag);
  window.removeEventListener('mouseup', stop_drag);
};

function start_resize(event: MouseEvent, direction: string) {
  emit('prime');
  resizing.value = true;
  start_x = event.clientX;
  start_y = event.clientY;
  start_width = panel_width.value;
  start_height = panel_height.value;
  start_left = panel_left.value;
  start_top = panel_top.value;
  resizing_direction = direction;
  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stop_resize);
};

function resize(event: MouseEvent) {
  if (!resizing.value) return;
  for (const dir of resizing_direction) {
    if (['l', 'r'].includes(dir)) {
      let delta_x = (dir === 'l' ? -1 : 1) * (event.clientX - start_x);
      delta_x = Math.max(100 - start_width, delta_x);
      panel_width.value = start_width + delta_x;
      if (dir === 'l') {
        panel_left.value = start_left - delta_x;
      }
    }
    else if (['t', 'b'].includes(dir)) {
      let delta_y = (dir === 't' ? -1 : 1) * (event.clientY - start_y);
      delta_y = Math.max(100 - start_height, delta_y);
      panel_height.value = start_height + delta_y;
      if (dir === 't') {
        panel_top.value = start_top - delta_y;
      }
    }
  }
};

const stop_resize = () => {
  resizing.value = false;
  window.removeEventListener('mousemove', resize);
  window.removeEventListener('mouseup', stop_resize);
};

</script>

<template>
  <div :class="{ 'select-none': dragging || resizing }" class="absolute overflow-hidden flex flex-col items-stretch"
    :style="{ width: panel_width + 'px', height: panel_height + 'px', top: panel_top + 'px', left: panel_left + 'px' }"
    ref="panel">
    <div @mousedown="start_drag" class="cursor-move bg-transparent h-fit">
      <slot name="title"></slot>
    </div>
    <div class="absolute top-0 right-0 h-full w-2 cursor-e-resize bg-transparent"
      @mousedown.stop="(e) => start_resize(e, 'r')"></div>
    <div class="absolute bottom-0 left-0 w-full h-2 cursor-s-resize bg-transparent"
      @mousedown.stop="(e) => start_resize(e, 'b')"></div>
    <div class="absolute top-0 left-0 h-full w-2 cursor-w-resize bg-transparent"
      @mousedown.stop="(e) => start_resize(e, 'l')"></div>
    <div class=" absolute top-0 left-0 w-full h-2 cursor-n-resize bg-transparent"
      @mousedown.stop="(e) => start_resize(e, 't')"></div>
    <div class="z-10 absolute top-0 left-0 h-2 w-2 cursor-nw-resize bg-transparent"
      @mousedown.stop="(e) => start_resize(e, 'tl')"></div>
    <div class="z-10 absolute top-0 right-0 h-2 w-2 cursor-ne-resize bg-transparent"
      @mousedown.stop="(e) => start_resize(e, 'tr')"></div>
    <div class="z-10 absolute bottom-0 left-0 h-2 w-2 cursor-sw-resize bg-transparent"
      @mousedown.stop="(e) => start_resize(e, 'bl')"></div>
    <div class="z-10 absolute bottom-0 right-0 h-2 w-2 cursor-se-resize bg-transparent"
      @mousedown.stop="(e) => start_resize(e, 'br')"></div>
    <div class="grow overflow-hidden">
      <slot name="content"></slot>
    </div>
  </div>
</template>
