<template>
  <!-- Затемнение фона -->
  <div
    class="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4"
    @click.self="$emit('close')"
  >
    <!-- Модалка - на мобилке bottom sheet, на ПК обычная -->
    <div
      class="bg-white rounded-t-3xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scroll md:mx-4 fixed bottom-0 md:relative md:bottom-auto left-0 right-0 md:left-auto md:right-auto"
      :class="{ 'translate-y-0': show, 'translate-y-full': !show }"
      style="transition: transform 1s ease-in-out"
    >
      <!-- Ручка для мобилок -->
      <div
        class="md:hidden w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2"
      ></div>

      <!-- Заголовок -->
      <div
        class="flex items-center justify-between p-6 border-b border-gray-100"
      >
        <h2 class="text-2xl font-semibold">Битва характеристик</h2>
        <button
          @click="$emit('close')"
          class="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Тело модалки -->
      <div class="p-6">
        <!-- Показываем заглушку, если нет двух телефонов -->
        <div v-if="!leftPhone || !rightPhone" class="text-center py-12">
          <Swords class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-medium text-gray-700 mb-2">
            Выберите два телефона
          </h3>
          <p class="text-gray-500">Нажмите на иконку ⚔️ в карточке товара</p>
        </div>

        <div v-else>
          <!-- Два телефона с кругами -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Левый телефон -->
            <div class="text-center">
              <div class="bg-white rounded-2xl p-4 mb-3 shadow-sm">
                <div
                  class="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center p-4 mb-3"
                >
                  <img
                    :src="leftPhone.image"
                    :alt="leftPhone.name"
                    class="w-3/4 h-3/4 object-contain"
                    @error="handleImageError"
                    loading="lazy"
                  />
                </div>
                <!-- Круг с рейтингом -->
                <div class="flex justify-center mb-2">
                  <ScoreCircle
                    :value="leftScore"
                    :size="100"
                    :border-width="2"
                    color="#0066CC"
                    text-color-class="text-electric-blue"
                  />
                </div>
                <h3 class="font-semibold text-lg">{{ leftPhone.name }}</h3>
              </div>
            </div>

            <!-- Правый телефон -->
            <div class="text-center">
              <div class="bg-white rounded-2xl p-4 mb-3 shadow-sm">
                <div
                  class="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center p-4 mb-3"
                >
                  <img
                    :src="rightPhone.image"
                    :alt="rightPhone.name"
                    class="w-3/4 h-3/4 object-contain"
                    @error="handleImageError"
                    loading="lazy"
                  />
                </div>
                <!-- Круг с рейтингом -->
                <div class="flex justify-center mb-2">
                  <ScoreCircle
                    :value="rightScore"
                    :size="100"
                    :border-width="2"
                    color="#0066CC"
                    text-color-class="text-electric-blue"
                  />
                </div>
                <h3 class="font-semibold text-lg">{{ rightPhone.name }}</h3>
              </div>
            </div>
          </div>

          <!-- Сравнительная таблица (3 колонки) -->
          <div class="mt-8 space-y-6">
            <!-- Процессор -->
            <div>
              <div
                class="grid grid-cols-3 gap-1 md:gap-2 text-[0.7rem] md:text-sm mb-1"
              >
                <div class="font-medium text-left break-words pr-1">
                  {{ leftPhone.chip }}
                </div>
                <div class="text-gray-500 font-medium text-center mx-auto">
                  Процессор
                </div>
                <div class="font-medium text-right break-words pl-1">
                  {{ rightPhone.chip }}
                </div>
              </div>
              <div class="flex gap-1 h-2">
                <div class="flex-1 bg-gray-200 rounded-l-full overflow-hidden">
                  <div
                    class="h-full bg-electric-blue"
                    :style="{
                      width: (leftPhone.chip.includes('A17') ? 90 : 80) + '%',
                    }"
                  ></div>
                </div>
                <div class="flex-1 bg-gray-200 rounded-r-full overflow-hidden">
                  <div
                    class="h-full bg-electric-blue"
                    :style="{
                      width:
                        (rightPhone.chip.includes('Snapdragon') ? 95 : 80) +
                        '%',
                    }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Камера -->
            <div>
              <div
                class="grid grid-cols-3 gap-1 md:gap-2 text-[0.7rem] md:text-sm mb-1"
              >
                <div class="font-medium text-left break-words pr-1">
                  {{ leftPhone.camera }} МП
                </div>
                <div class="text-gray-500 font-medium text-center mx-auto">
                  Камера
                </div>
                <div class="font-medium text-right break-words pl-1">
                  {{ rightPhone.camera }} МП
                </div>
              </div>
              <div class="flex gap-1 h-2">
                <div class="flex-1 bg-gray-200 rounded-l-full overflow-hidden">
                  <div
                    class="h-full bg-electric-blue"
                    :style="{ width: (leftPhone.camera / 200) * 100 + '%' }"
                  ></div>
                </div>
                <div class="flex-1 bg-gray-200 rounded-r-full overflow-hidden">
                  <div
                    class="h-full bg-electric-blue"
                    :style="{ width: (rightPhone.camera / 200) * 100 + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Батарея -->
            <div>
              <div
                class="grid grid-cols-3 gap-1 md:gap-2 text-[0.7rem] md:text-sm mb-1"
              >
                <div class="font-medium text-left break-words pr-1">
                  {{ leftPhone.battery }} мАч
                </div>
                <div class="text-gray-500 font-medium text-center mx-auto">
                  Батарея
                </div>
                <div class="font-medium text-right break-words pl-1">
                  {{ rightPhone.battery }} мАч
                </div>
              </div>
              <div class="flex gap-1 h-2">
                <div class="flex-1 bg-gray-200 rounded-l-full overflow-hidden">
                  <div
                    class="h-full bg-electric-blue"
                    :style="{ width: (leftPhone.battery / 5000) * 100 + '%' }"
                  ></div>
                </div>
                <div class="flex-1 bg-gray-200 rounded-r-full overflow-hidden">
                  <div
                    class="h-full bg-electric-blue"
                    :style="{ width: (rightPhone.battery / 5000) * 100 + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Кнопка победителя -->
          <div class="mt-8 text-center">
            <button
              class="bg-electric-blue text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition inline-flex items-center gap-2"
            >
              Купить победителя
              <Trophy class="w-5 h-5 text-white" />
            </button>
            <p class="text-sm text-gray-500 mt-2">
              {{ winner }} побеждает в этой битве
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { X, Trophy, Swords } from "lucide-vue-next";
import { useBattleStore } from "../../composables/useBattleStore";
import ScoreCircle from "./ScoreCircle.vue";

defineProps<{
  show: boolean;
}>();

defineEmits<{
  (e: "close"): void;
}>();

const { battlePhones } = useBattleStore();

const leftPhone = computed(() => battlePhones.value[0] || null);
const rightPhone = computed(() => battlePhones.value[1] || null);

const calculateScore = (phone: any) => {
  if (!phone) return 0;

  let chipScore = 70;
  if (phone.chip?.includes("A17 Pro")) chipScore = 94;
  if (phone.chip?.includes("Snapdragon 8 Gen 3")) chipScore = 96;
  if (phone.chip?.includes("Tensor G4")) chipScore = 85;
  if (phone.chip?.includes("A16")) chipScore = 88;

  const cameraScore = Math.min(100, (phone.camera / 200) * 100);
  const batteryScore = Math.min(100, (phone.battery / 5000) * 100);

  return Math.round(chipScore * 0.4 + cameraScore * 0.3 + batteryScore * 0.3);
};

const leftScore = computed(() =>
  leftPhone.value ? calculateScore(leftPhone.value) : 0,
);
const rightScore = computed(() =>
  rightPhone.value ? calculateScore(rightPhone.value) : 0,
);

const winner = computed(() => {
  if (!leftPhone.value || !rightPhone.value) return "Выберите два телефона";
  return leftScore.value > rightScore.value
    ? leftPhone.value.name
    : rightPhone.value.name;
});

// Обработка ошибки загрузки изображения
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/images/placeholder.jpg";
};
</script>

<style scoped>
/* Плавное появление затемнения */
.fixed.bg-black\/50 {
  transition: background-color 0.3s ease;
}

/* Для мобилок модалка прилипает к низу */
@media (max-width: 768px) {
  .fixed.bottom-0 {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
