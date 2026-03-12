<template>
  <main class="container mx-auto px-4 py-8">
    <!-- Заголовок с кнопкой назад слева -->
    <div class="flex items-center justify-between mb-6">
      <!-- Кнопка назад (слева) -->
      <router-link
        to="/"
        class="inline-flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-electric-blue transition"
      >
        <ArrowLeft class="w-4 h-4 md:w-5 md:h-5" />
        <span>Назад</span>
      </router-link>

      <!-- Заголовок "Избранное (количество)" (справа) -->
      <h1 class="text-xl md:text-3xl font-semibold">
        Избранное ({{ totalFavorites }})
      </h1>
    </div>

    <!-- Если избранное пусто -->
    <div
      v-if="favorites.length === 0"
      class="text-center py-12 bg-white rounded-2xl shadow-glass"
    >
      <Heart class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h2 class="text-xl text-gray-600 mb-2">В избранном пока пусто</h2>
      <p class="text-gray-500">Добавляйте понравившиеся модели ❤️</p>
      <router-link
        to="/"
        class="inline-block mt-4 text-electric-blue hover:underline font-medium"
      >
        ← Вернуться в каталог
      </router-link>
    </div>

    <!-- Сетка избранного (семантическая) -->
    <ul v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <li v-for="item in favorites" :key="item.id" class="list-none">
        <div class="bg-white rounded-xl p-3 shadow-glass relative">
          <!-- Кнопка удалить -->
          <button
            @click="removeFromFavorites(item.id)"
            class="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition z-10"
          >
            <X class="w-4 h-4 text-gray-500" />
          </button>

          <!-- Фото (реальное) - уменьшенное -->
          <router-link :to="`/product/${item.id}`">
            <div
              class="aspect-square bg-white rounded-lg mb-2 overflow-hidden flex items-center justify-center p-6"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-2/3 h-2/3 object-contain"
                @error="handleImageError"
                loading="lazy"
              />
            </div>
          </router-link>

          <!-- Название -->
          <router-link :to="`/product/${item.id}`">
            <h3
              class="font-medium text-sm mb-1 line-clamp-1 hover:text-electric-blue"
            >
              {{ item.name }}
            </h3>
          </router-link>

          <!-- Цена -->
          <div class="text-base font-semibold mb-2">
            {{ formatPrice(item.price) }}
          </div>

          <!-- Кнопка в корзину -->
          <button
            @click="addToCart(item)"
            class="w-full bg-electric-blue text-white py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition"
          >
            В корзину
          </button>
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { Heart, X, ArrowLeft } from "lucide-vue-next";
import { useFavoritesStore } from "../composables/useFavoritesStore";
import { useCartStore } from "../composables/useCartStore";

const { favorites, totalFavorites, removeFromFavorites } = useFavoritesStore();
const { addToCart } = useCartStore();

const formatPrice = (price: number) => {
  return "$" + new Intl.NumberFormat("en-US").format(price);
};

// Обработка ошибки загрузки изображения
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/images/placeholder.jpg";
};
</script>
