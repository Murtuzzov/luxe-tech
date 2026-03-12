<template>
  <aside class="bg-white rounded-2xl p-5 shadow-glass sticky top-24">
    <div class="flex items-center justify-between mb-6">
      <button
        @click="resetFilters"
        class="text-sm text-electric-blue hover:underline"
        :class="{ 'opacity-50 pointer-events-none': !hasActiveFilters }"
      >
        Сбросить
      </button>
    </div>

    <!-- Цена (только максимальная) -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm text-gray-600">Макс. цена</span>
        <span class="text-base font-semibold text-gray-900"
          >${{ priceRange[1] }}</span
        >
      </div>

      <!-- Ползунок -->
      <input
        type="range"
        v-model.number="priceRange[1]"
        :min="0"
        :max="maxPrice"
        step="50"
        class="w-full accent-electric-blue h-2 rounded-lg appearance-none cursor-pointer"
      />

      <div class="flex justify-between text-xs text-gray-400 mt-1">
        <span>$0</span>
        <span>${{ maxPrice }}</span>
      </div>
    </div>

    <!-- Бренд -->
    <div class="mb-8">
      <h4 class="font-medium text-sm mb-3 text-gray-900">Бренд</h4>
      <div class="space-y-3">
        <label
          v-for="brand in allBrands"
          :key="brand"
          class="flex items-center gap-3 text-sm cursor-pointer hover:text-electric-blue transition"
        >
          <input
            type="checkbox"
            :checked="selectedBrands.includes(brand)"
            @change="toggleBrand(brand)"
            class="w-4 h-4 rounded border-gray-300 text-electric-blue focus:ring-electric-blue focus:ring-1"
          />
          <span class="text-gray-700">{{ brand }}</span>
        </label>
      </div>
    </div>

    <!-- Процессор -->
    <div class="mb-8">
      <h4 class="font-medium text-sm mb-3 text-gray-900">Процессор</h4>
      <div class="space-y-3">
        <label
          v-for="chip in allChips"
          :key="chip"
          class="flex items-center gap-3 text-sm cursor-pointer hover:text-electric-blue transition"
        >
          <input
            type="checkbox"
            :checked="selectedChips.includes(chip)"
            @change="toggleChip(chip)"
            class="w-4 h-4 rounded border-gray-300 text-electric-blue focus:ring-electric-blue focus:ring-1"
          />
          <span class="text-gray-700">{{ chip }}</span>
        </label>
      </div>
    </div>

    <!-- Количество товаров -->
    <div class="text-sm text-gray-500 pt-4 border-t border-gray-100">
      Найдено: {{ filteredPhones.length }} товаров
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePhonesStore } from "../../composables/usePhonesStore";

const {
  allBrands,
  allChips,
  selectedBrands,
  selectedChips,
  priceRange,
  maxPrice,
  filteredPhones,
  toggleBrand,
  toggleChip,
  resetFilters,
} = usePhonesStore();

const hasActiveFilters = computed(() => {
  return (
    selectedBrands.value.length > 0 ||
    selectedChips.value.length > 0 ||
    priceRange.value[0] > 0 ||
    priceRange.value[1] < maxPrice.value
  );
});
</script>

<style scoped>
/* Стили для ползунка */
input[type="range"] {
  -webkit-appearance: none;
  background: transparent;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 9999px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: white;
  border: 2px solid #0066cc;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-top: -5px;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 9999px;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: white;
  border: 2px solid #0066cc;
  border-radius: 50%;
  cursor: pointer;
}
</style>
