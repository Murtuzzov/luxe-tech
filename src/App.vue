<template>
  <div class="min-h-screen pb-20 md:pb-8 flex flex-col">
    <TheHeader />

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

    <CartDrawer :is-open="isCartOpen" @close="isCartOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TheHeader from "./components/layout/TheHeader.vue";
import MobileBottomBar from "./components/layout/MobileBottomBar.vue";
import BattleModal from "./components/ui/BattleModal.vue";
import CartDrawer from "./components/ui/CartDrawer.vue";
import TheFooter from "./components/layout/TheFooter.vue"; // импорт

const isBattleOpen = ref(false);
const isCartOpen = ref(false);
</script>
