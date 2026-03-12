<template>
  <main class="container mx-auto px-4 py-8">
    <!-- Заголовок с кнопкой назад -->
    <div class="flex items-center justify-between mb-6">
      <router-link
        to="/"
        class="inline-flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-electric-blue transition"
      >
        <ArrowLeft class="w-4 h-4 md:w-5 md:h-5" />
        <span>Назад в магазин</span>
      </router-link>

      <h1 class="text-xl md:text-3xl font-semibold">
        Корзина ({{ totalItems }})
      </h1>
    </div>

    <!-- Если корзина пуста -->
    <div
      v-if="cartItems.length === 0"
      class="text-center py-12 bg-white rounded-2xl shadow-glass"
    >
      <ShoppingCart class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h2 class="text-xl text-gray-600 mb-2">Корзина пуста</h2>
      <p class="text-gray-500">Добавьте товары для покупки 🛒</p>
      <router-link
        to="/"
        class="inline-block mt-4 text-electric-blue hover:underline font-medium"
      >
        ← Перейти в каталог
      </router-link>
    </div>

    <!-- Корзина с товарами -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Список товаров (2/3 экрана) -->
      <div class="lg:col-span-2 space-y-4">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="bg-white rounded-xl p-4 shadow-glass flex gap-4"
        >
          <!-- Фото -->
          <router-link :to="`/product/${item.id}`" class="shrink-0">
            <div
              class="w-24 h-24 bg-white rounded-lg overflow-hidden flex items-center justify-center p-3 border border-gray-100"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-contain"
                @error="handleImageError"
              />
            </div>
          </router-link>

          <!-- Информация -->
          <div class="flex-1">
            <div class="flex justify-between">
              <router-link :to="`/product/${item.id}`">
                <h3 class="font-medium hover:text-electric-blue transition">
                  {{ item.name }}
                </h3>
              </router-link>
              <button
                @click="removeFromCart(item.id)"
                class="text-gray-400 hover:text-red-500 transition"
                title="Удалить"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <div class="text-electric-blue font-semibold mt-1">
              ${{ formatPrice(item.price) }}
            </div>

            <!-- Количество -->
            <div class="flex items-center gap-2 mt-3">
              <span class="text-sm text-gray-500">Количество:</span>
              <button
                @click="updateQuantity(item.id, Math.max(1, item.quantity - 1))"
                class="w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                −
              </button>
              <span class="w-8 text-center">{{ item.quantity }}</span>
              <button
                @click="updateQuantity(item.id, item.quantity + 1)"
                class="w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Блок с итогом (1/3 экрана) -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl p-6 shadow-glass sticky top-24">
          <h2 class="text-xl font-semibold mb-4">Итого</h2>

          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-gray-600">
              <span>Товаров:</span>
              <span>{{ totalItems }} шт.</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Сумма:</span>
              <span>${{ formatPrice(totalPrice) }}</span>
            </div>
            <div class="border-t border-gray-100 pt-3">
              <div class="flex justify-between font-semibold text-lg">
                <span>К оплате:</span>
                <span class="text-electric-blue"
                  >${{ formatPrice(totalPrice) }}</span
                >
              </div>
            </div>
          </div>

          <button
            class="w-full bg-electric-blue text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition mb-3"
          >
            Оформить заказ
          </button>

          <button
            @click="clearCart"
            class="w-full border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Очистить корзину
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ShoppingCart, X, ArrowLeft } from "lucide-vue-next";
import { useCartStore } from "../composables/useCartStore";

const {
  cartItems,
  removeFromCart,
  updateQuantity,
  clearCart,
  totalItems,
  totalPrice,
} = useCartStore();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price);
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/images/placeholder.jpg";
};
</script>
