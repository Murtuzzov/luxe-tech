<template>
  <header
    class="border-b border-gray-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50"
  >
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Лого -->
      <router-link to="/" class="text-2xl font-semibold tracking-tight">
        LUXE-TECH
      </router-link>

      <!-- Правая часть -->
      <div class="flex items-center gap-4">
        <!-- Поиск -->
        <button
          @click="$emit('openSearch')"
          class="p-2 hover:bg-gray-100 rounded-full transition relative group"
          aria-label="Поиск"
        >
          <Search class="w-5 h-5 text-gray-600" />
          <!-- Подсказка при наведении -->
          <span
            class="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap"
          >
            Поиск (Ctrl + K)
          </span>
        </button>

        <!-- Избранное -->
        <router-link
          to="/favorites"
          class="p-2 hover:bg-gray-100 rounded-full transition relative"
          aria-label="Избранное"
        >
          <Heart class="w-5 h-5 text-gray-600" />
          <span
            v-if="totalFavorites > 0"
            class="absolute -top-1 -right-1 bg-electric-blue text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
          >
            {{ totalFavorites }}
          </span>
        </router-link>

        <!-- Корзина -->
        <button
          @click="$emit('openCart')"
          class="p-2 hover:bg-gray-100 rounded-full transition relative"
          aria-label="Корзина"
        >
          <ShoppingCart class="w-5 h-5 text-gray-600" />
          <span
            v-if="totalItems > 0"
            class="absolute -top-1 -right-1 bg-electric-blue text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
          >
            {{ totalItems }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Search, Heart, ShoppingCart } from "lucide-vue-next";
import { useCartStore } from "../../composables/useCartStore";
import { useFavoritesStore } from "../../composables/useFavoritesStore";

const { totalItems } = useCartStore();
const { totalFavorites } = useFavoritesStore();

defineEmits<{
  (e: "openCart"): void;
  (e: "openSearch"): void;
}>();
</script>
