import rentsData from "@/features/velo/data/rents.json";
import useStoredCollection from "@/features/velo/hooks/useStoredCollection.js";

const STORAGE_KEY = "velo:rents:v2";

const useRents = () => {
  return useStoredCollection(STORAGE_KEY, rentsData);
};

export default useRents;
