<template>
  <div
    class="relative inline-flex items-center justify-center"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <!-- SVG для кольца -->
    <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 40 40">
      <!-- Фоновое кольцо (серое) -->
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        :stroke="emptyColor"
        :stroke-width="borderWidth"
        stroke-linecap="round"
      />

      <!-- Заполненное кольцо (без анимации) -->
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        :stroke="color"
        :stroke-width="borderWidth"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90 20 20)"
      />
    </svg>

    <!-- Текст по центру -->
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span class="text-xl font-bold" :class="textColorClass">{{ value }}</span>
      <span class="text-xs text-gray-400">100</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  value: number;
  size?: number;
  borderWidth?: number;
  color?: string;
  emptyColor?: string;
  textColorClass?: string;
}>();

const size = props.size || 100;
const borderWidth = props.borderWidth || 4;
const emptyColor = props.emptyColor || "#e5e7eb";
const color = props.color || "#0066CC";

const radius = 16;
const circumference = 2 * Math.PI * radius;

const dashOffset = computed(() => {
  return circumference - (circumference * props.value) / 100;
});
</script>
