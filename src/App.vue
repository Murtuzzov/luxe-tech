<template>
  <div class="min-h-screen pb-20 md:pb-8 flex flex-col">
    <!-- Добавил обработчики событий -->
    <TheHeader
      @open-cart="isCartOpen = true"
      @open-search="isSearchOpen = true"
    />

    <router-view class="flex-grow" @open-battle="isBattleOpen = true" />

    <MobileBottomBar
      @open-battle="isBattleOpen = true"
      @open-cart="isCartOpen = true"
    />

    <!-- Футер -->
    <TheFooter />

    <BattleModal
      v-show="isBattleOpen"
      :show="isBattleOpen"
      @close="isBattleOpen = false"
    />

    <!-- Добавил SearchModal (его не было в шаблоне!) -->
    <SearchModal :is-open="isSearchOpen" @close="isSearchOpen = false" />

    <CartDrawer :is-open="isCartOpen" @close="isCartOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TheHeader from "./components/layout/TheHeader.vue";
import MobileBottomBar from "./components/layout/MobileBottomBar.vue";
import BattleModal from "./components/ui/BattleModal.vue";
import CartDrawer from "./components/ui/CartDrawer.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import SearchModal from "./components/ui/SearchModal.vue"; // ← добавил импорт

const isBattleOpen = ref(false);
const isCartOpen = ref(false);
const isSearchOpen = ref(false); // ← добавил состояние
</script>
