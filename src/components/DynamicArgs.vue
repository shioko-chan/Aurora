<script setup lang="ts">
interface Param {
  name: string
  type: string
  range: [number, number]
  value: number | string
}

const params = defineProps<Array<Param>>()
</script>

<template>
  <div>
    <div v-for="(param, index) in params" :key="index" class="param-item">
      <label :for="param.name">{{ param.name }}</label>
      <input v-if="param.type === 'number'" :id="param.name" type="number" :min="param.range[0]" :max="param.range[1]"
        v-model="param.value" />
      <input v-else-if="param.type === 'text'" :id="param.name" type="text" v-model="param.value" />
      <input v-else-if="param.type === 'range'" :id="param.name" type="range" :min="param.range[0]"
        :max="param.range[1]" v-model="param.value" />
      <!-- Add more input types as needed -->
    </div>
  </div>
</template>
