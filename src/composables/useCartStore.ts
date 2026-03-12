import { ref, computed } from "vue";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const cartItems = ref<CartItem[]>([]);

export function useCartStore() {
  const addToCart = (product: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => {
    const existingItem = cartItems.value.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.value.push({
        ...product,
        quantity: 1,
      });
    }
  };

  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const item = cartItems.value.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  const totalItems = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return cartItems.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  });

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
}
