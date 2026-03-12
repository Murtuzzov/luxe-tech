import { ref } from "vue";

// Тип телефона (экспортируем, чтобы использовать в других местах)
export interface Phone {
  id: number;
  name: string;
  price: number;
  chip: string;
  display: string;
  battery: number;
  camera: number;
  image: string;
}

const battlePhones = ref<Phone[]>([]);

export function useBattleStore() {
  const addToBattle = (phone: Phone) => {
    // Если телефон уже в списке - убираем
    if (battlePhones.value.some((p) => p.id === phone.id)) {
      battlePhones.value = battlePhones.value.filter((p) => p.id !== phone.id);
      return;
    }

    // Если в списке уже 2 телефона - удаляем самый старый
    if (battlePhones.value.length >= 2) {
      battlePhones.value.shift();
    }

    // Добавляем новый телефон
    battlePhones.value.push(phone);
  };

  const removeFromBattle = (phoneId: number) => {
    battlePhones.value = battlePhones.value.filter((p) => p.id !== phoneId);
  };

  const isInBattle = (phoneId: number) => {
    return battlePhones.value.some((p) => p.id === phoneId);
  };

  return {
    battlePhones,
    addToBattle,
    removeFromBattle,
    isInBattle,
  };
}
