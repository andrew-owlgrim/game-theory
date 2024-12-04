import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && "localStorage" in window;

  // Инициализация локализации
  const [value, setValue] = useState(() => {
    if (isLocalStorageAvailable) {
      return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  });

  // Синхронизация изменений с localStorage
  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem(key, value);
    }
  }, [value, isLocalStorageAvailable]);

  // Обработка синхронизации между вкладками/окнами
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue) {
        setValue(event.newValue);
      }
    };

    if (isLocalStorageAvailable) {
      window.addEventListener("storage", handleStorageChange);
    }
    return () => {
      if (isLocalStorageAvailable) {
        window.removeEventListener("storage", handleStorageChange);
      }
    };
  }, [isLocalStorageAvailable]);

  return [value, setValue];
};

export default useLocalStorage;
