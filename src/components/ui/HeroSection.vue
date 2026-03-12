<template>
  <section class="bg-white rounded-2xl shadow-glass overflow-hidden mb-8">
    <div class="flex flex-col md:flex-row">
      <!-- Левая часть с текстом -->
      <div class="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
        <span
          class="text-sm font-medium text-electric-blue uppercase tracking-wider mb-2"
          >Новинка</span
        >
        <h1 class="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
          Google Pixel 10 Pro
        </h1>
        <p class="text-gray-600 text-lg mb-6 max-w-md">
          Мощность и элегантность в каждом штрихе
        </p>
        <div>
          <!-- Кнопка ведёт на страницу товара с id=5 -->
          <router-link
            :to="`/product/5`"
            class="bg-electric-blue text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            Подробнее
            <ArrowRight class="w-4 h-4" />
          </router-link>
        </div>
      </div>

      <!-- Правая часть с изображением -->
      <div
        class="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10 flex items-center justify-center"
      >
        <img
          src="/images/hero/pixel-10-pro.png"
          alt="Google Pixel 10 Pro"
          class="w-full max-w-sm h-auto object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
// Больше не нужно импортировать phonesData
</script>
