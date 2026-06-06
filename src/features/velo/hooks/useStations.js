import stationsData from "@/features/velo/data/stations.json";
import useStoredCollection from "@/features/velo/hooks/useStoredCollection.js";

const STORAGE_KEY = "velo:stations:v1";

const useStations = () => {
  return useStoredCollection(STORAGE_KEY, stationsData);
};

export default useStations;
