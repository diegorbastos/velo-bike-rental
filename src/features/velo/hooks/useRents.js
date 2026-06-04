import { useEffect, useState } from "react";
import rentsData from "@/features/velo/data/rents.json";

const STORAGE_KEY = "velo:rents:v2";

const readStoredRents = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : rentsData;
  } catch {
    return rentsData;
  }
};

const useRents = () => {
  const [rents, setRents] = useState(readStoredRents);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rents));
  }, [rents]);

  return [rents, setRents];
};

export default useRents;
