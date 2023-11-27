<template>
  <q-select
    filled
    :modelValue="currentOption"
    @update:model-value="(value) => $emit('update:currentOption', value)"
    :options="optionsFilter"
    class="q-ml-sm"
    dense
    options-dense
  >
    <template v-slot:prepend>
      <span class="text-subtitle2">分類:</span>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Option {
  label: string;
  value: string;
}

const props = defineProps<{
  currentOption: Option;
  options: Option[];
}>();
defineEmits(['update:currentOption']);
console.log(props.options);
// const options = [
//   { label: '最新', value: 'desc' },
//   { label: '最舊', value: 'asc' },
// ];
const optionsFilter = computed(() => {
  return props.options.filter((x) => x.value !== props.currentOption.value);
});
</script>
