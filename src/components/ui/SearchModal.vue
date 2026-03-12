<template>
  <!-- Затемнение фона -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300"
    @click="closeSearch"
  ></div>

  <!-- Поисковая панель -->
  <div
    class="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 transform transition-transform duration-300 ease-out"
    :class="isOpen ? 'translate-y-0' : '-translate-y-full'"
  >
    <div class="max-w-3xl mx-auto px-4 py-6">
      <!-- Поле поиска (минималистичное) -->
      <div class="relative">
        <Search
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        />
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          placeholder="Поиск товаров..."
          class="w-full pl-10 pr-10 py-3 text-base border-b border-gray-200 focus:border-electric-blue bg-transparent outline-none transition"
          @input="search"
        />
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Подсказка -->
      <div v-if="!searchQuery" class="text-center text-sm text-gray-400 mt-4">
        Введите название телефона (например: iPhone, Samsung, Xiaomi...)
      </div>

      <!-- Результаты поиска -->
      <div v-if="searchQuery" class="mt-6 max-h-96 overflow-y-auto">
        <div v-if="filteredPhones.length === 0" class="text-center py-8">
          <p class="text-gray-400">Ничего не найдено</p>
        </div>

        <div v-else class="space-y-1">
          <router-link
            v-for="phone in filteredPhones"
            :key="phone.id"
            :to="`/product/${phone.id}`"
            class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition group"
            @click="closeSearch"
          >
            <!-- Фото -->
            <div
              class="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-1.5"
            >
              <img
                :src="phone.image"
                :alt="phone.name"
                class="w-full h-full object-contain"
                @error="handleImageError"
              />
            </div>

            <!-- Информация -->
            <div class="flex-1 min-w-0">
              <h4
                class="font-medium text-gray-900 truncate group-hover:text-electric-blue transition"
              >
                {{ phone.name }}
              </h4>
              <p class="text-sm text-gray-500">
                {{ phone.chip }} • {{ phone.display }}
              </p>
            </div>

            <!-- Цена -->
            <div
              class="text-sm font-semibold text-electric-blue whitespace-nowrap"
            >
              ${{ formatPrice(phone.price) }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { Search, X } from "lucide-vue-next";
import phonesData from "../../data/phones.json";
import type { Phone } from "../../types/phones";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const searchQuery = ref("");
const searchInput = ref<HTMLInputElement | null>(null);
const filteredPhones = ref<Phone[]>([]);

// Фокусируемся на поле ввода при открытии
watch(
  () => props.isOpen,
  async (newVal) => {
    if (newVal) {
      await nextTick();
      searchInput.value?.focus();
    } else {
      searchQuery.value = "";
      filteredPhones.value = [];
    }
  },
);

const clearSearch = () => {
  searchQuery.value = "";
  searchInput.value?.focus();
  filteredPhones.value = [];
};

// Поиск с поддержкой русского языка
const search = () => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) {
    filteredPhones.value = [];
    return;
  }

  // Словарь вариантов написания
  const searchMap: Record<string, string[]> = {
    iphone: ["iphone", "айфон", "аифон"],
    samsung: ["samsung", "самсунг", "самсун"],
    galaxy: ["galaxy", "галакси"],
    xiaomi: ["xiaomi", "ксиоми", "сяоми", "ксеоми"],
    pixel: ["pixel", "пиксель", "пиксел"],
    google: ["google", "гугл"],
    pro: ["pro", "про"],
    ultra: ["ultra", "ультра"],
  };

  filteredPhones.value = phonesData.filter((phone: Phone) => {
    const name = phone.name.toLowerCase();

    // Прямое вхождение
    if (name.includes(query)) return true;

    // Поиск по словарю
    for (const [original, variants] of Object.entries(searchMap)) {
      // Проверяем, есть ли запрос в вариантах
      const matchInVariants = variants.some(
        (v) => v.includes(query) || query.includes(v),
      );
      if (matchInVariants && name.includes(original)) {
        return true;
      }
    }

    return false;
  });
};

const closeSearch = () => {
  emit("close");
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price);
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/images/placeholder.jpg";
};
</script>
