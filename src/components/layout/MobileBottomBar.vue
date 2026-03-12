<template>
  <div
    class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 md:hidden z-50"
  >
    <div class="flex justify-center">
      <!-- Кнопка битвы открывает модалку -->
      <button
        @click="$emit('openBattle')"
        class="bg-electric-blue text-white px-8 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition flex items-center gap-2 shadow-lg"
      >
        <Swords class="w-5 h-5" />
        Битва
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swords } from "lucide-vue-next";

defineEmits<{
  (e: "openBattle"): void;
}>();
</script>
