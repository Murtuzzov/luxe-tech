import { ref, computed } from "vue";
import phonesData from "../data/phones.json";
import type { Phone } from "../types/phones";

// Состояние фильтров
const selectedBrands = ref<string[]>([]);
const selectedChips = ref<string[]>([]);
const priceRange = ref<[number, number]>([0, 2000]);
const maxPrice = ref(2000);

// Получаем уникальные значения для фильтров
const allBrands = computed(() => {
  const brands = phonesData
    .map((p) => {
      const nameParts = p.name.split(" ");
      return nameParts[0] || ""; // Добавляем fallback
    })
    .filter((brand) => brand !== ""); // Убираем пустые
  return [...new Set(brands)].sort();
});

const allChips = computed(() => {
  const chips = phonesData.map((p) => {
    if (p.chip.includes("Snapdragon")) return "Snapdragon";
    if (p.chip.includes("A17") || p.chip.includes("A19"))
      return "Apple A-series";
    if (p.chip.includes("Tensor")) return "Google Tensor";
    return p.chip;
  });
  return [...new Set(chips)].sort();
});

// Фильтрация товаров
const filteredPhones = computed(() => {
  return phonesData.filter((phone: Phone) => {
    // Фильтр по цене
    if (
      phone.price < priceRange.value[0] ||
      phone.price > priceRange.value[1]
    ) {
      return false;
    }

    // Фильтр по бренду
    if (selectedBrands.value.length > 0) {
      const brand = phone.name.split(" ")[0] || ""; // Добавляем fallback
      if (!selectedBrands.value.includes(brand)) {
        return false;
      }
    }

    // Фильтр по процессору
    if (selectedChips.value.length > 0) {
      let chipCategory = "";
      if (phone.chip.includes("Snapdragon")) chipCategory = "Snapdragon";
      else if (phone.chip.includes("A17") || phone.chip.includes("A19"))
        chipCategory = "Apple A-series";
      else if (phone.chip.includes("Tensor")) chipCategory = "Google Tensor";
      else chipCategory = phone.chip;

      if (!selectedChips.value.includes(chipCategory)) {
        return false;
      }
    }

    return true;
  });
});

export function usePhonesStore() {
  return {
    // Данные
    allPhones: phonesData,
    filteredPhones,

    // Фильтры
    selectedBrands,
    selectedChips,
    priceRange,
    maxPrice,

    // Опции для фильтров
    allBrands,
    allChips,

    // Методы
    toggleBrand: (brand: string) => {
      if (selectedBrands.value.includes(brand)) {
        selectedBrands.value = selectedBrands.value.filter((b) => b !== brand);
      } else {
        selectedBrands.value.push(brand);
      }
    },

    toggleChip: (chip: string) => {
      if (selectedChips.value.includes(chip)) {
        selectedChips.value = selectedChips.value.filter((c) => c !== chip);
      } else {
        selectedChips.value.push(chip);
      }
    },

    resetFilters: () => {
      selectedBrands.value = [];
      selectedChips.value = [];
      priceRange.value = [0, maxPrice.value];
    },
  };
}
