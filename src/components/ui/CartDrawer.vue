<template>
  <!-- Затемнение фона -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 z-50 transition-opacity"
    @click="closeDrawer"
  ></div>

  <!-- Сам drawer -->
  <div
    class="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- Заголовок -->
    <div class="flex items-center justify-between p-6 border-b border-gray-100">
      <h2 class="text-xl font-semibold flex items-center gap-2">
        <ShoppingCart class="w-5 h-5" />
        Корзина ({{ totalItems }})
      </h2>
      <button
        @click="closeDrawer"
        class="p-2 hover:bg-gray-100 rounded-full transition"
      >
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Тело корзины -->
    <div class="p-6 h-[calc(100vh-180px)] overflow-y-auto">
      <div v-if="cartItems.length === 0" class="text-center py-12">
        <ShoppingCart class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-700 mb-2">Корзина пуста</h3>
        <p class="text-gray-500">Добавьте товары для покупки</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex gap-4 py-4 border-b border-gray-100"
        >
          <!-- Фото (реальное) -->
          <div
            class="w-20 h-20 bg-white rounded-lg overflow-hidden flex items-center justify-center p-2 shrink-0 border border-gray-100"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-contain"
              @error="handleImageError"
              loading="lazy"
            />
          </div>

          <!-- Информация -->
          <div class="flex-1">
            <h4 class="font-medium mb-1">{{ item.name }}</h4>
            <div class="text-electric-blue font-semibold mb-2">
              ${{ formatPrice(item.price) }}
            </div>

            <!-- Количество -->
            <div class="flex items-center gap-2">
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
              <button
                @click="removeFromCart(item.id)"
                class="ml-auto text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Футер с итогом -->
    <div
      v-if="cartItems.length > 0"
      class="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-white"
    >
      <div class="flex justify-between mb-4">
        <span class="text-gray-600">Итого:</span>
        <span class="text-xl font-bold text-electric-blue"
          >${{ formatPrice(totalPrice) }}</span
        >
      </div>

      <!-- Кнопка перехода на страницу корзины -->
      <router-link
        to="/cart"
        class="block w-full text-center border border-electric-blue text-electric-blue py-3 rounded-xl font-medium hover:bg-electric-blue hover:text-white transition mb-3"
        @click="closeDrawer"
      >
        Перейти в корзину
      </router-link>

      <button
        class="w-full bg-electric-blue text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingCart, X, Trash2 } from "lucide-vue-next";
import { useCartStore } from "../../composables/useCartStore";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } =
  useCartStore();

const closeDrawer = () => {
  emit("close");
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price);
};

// Обработка ошибки загрузки изображения
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/images/placeholder.jpg";
};
</script>
