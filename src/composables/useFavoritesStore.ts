import { ref, computed } from "vue";

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const favorites = ref<FavoriteItem[]>([]);

export function useFavoritesStore() {
  const toggleFavorite = (product: FavoriteItem) => {
    const index = favorites.value.findIndex((item) => item.id === product.id);

    if (index === -1) {
      // Добавляем в избранное
      favorites.value.push(product);
    } else {
      // Удаляем из избранного
      favorites.value.splice(index, 1);
    }
  };

  const isFavorite = (productId: number) => {
    return favorites.value.some((item) => item.id === productId);
  };

  const removeFromFavorites = (productId: number) => {
    favorites.value = favorites.value.filter((item) => item.id !== productId);
  };

  const clearFavorites = () => {
    favorites.value = [];
  };

  const totalFavorites = computed(() => {
    return favorites.value.length;
  });

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    removeFromFavorites,
    clearFavorites,
    totalFavorites,
  };
}
