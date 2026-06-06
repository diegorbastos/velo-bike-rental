import { useEffect, useState } from "react";

const readStoredCollection = (storageKey, initialData) => {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : initialData;
  } catch {
    return initialData;
  }
};

const useStoredCollection = (storageKey, initialData) => {
  const [items, setItems] = useState(() => readStoredCollection(storageKey, initialData));

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  return [items, setItems];
};

export default useStoredCollection;
