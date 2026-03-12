<template>
  <footer class="bg-white border-t border-gray-100 mt-12">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-sm text-gray-500">
          © {{ new Date().getFullYear() }} LUXE-TECH. Все права защищены.
        </div>

        <div class="flex gap-6 text-sm">
          <a href="#" class="text-gray-500 hover:text-electric-blue transition"
            >О нас</a
          >
          <a href="#" class="text-gray-500 hover:text-electric-blue transition"
            >Контакты</a
          >
          <a href="#" class="text-gray-500 hover:text-electric-blue transition"
            >Доставка</a
          >
        </div>

        <!-- Иконки из Lucide (чистый код) -->
        <div class="flex gap-4">
          <a href="#" class="text-gray-400 hover:text-electric-blue transition">
            <Instagram class="w-5 h-5" />
          </a>
          <a href="#" class="text-gray-400 hover:text-electric-blue transition">
            <Send class="w-5 h-5" />
            <!-- Telegram обычно через Send -->
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Instagram, Send } from "lucide-vue-next";
</script>
