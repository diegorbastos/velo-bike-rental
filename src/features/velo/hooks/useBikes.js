import bikesData from "@/features/velo/data/bikes.json";
import useStoredCollection from "@/features/velo/hooks/useStoredCollection.js";

const STORAGE_KEY = "velo:bikes:v1";

const useBikes = () => {
  return useStoredCollection(STORAGE_KEY, bikesData);
};

export default useBikes;
