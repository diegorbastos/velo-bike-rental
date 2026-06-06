import usersData from "@/features/velo/data/users.json";
import useStoredCollection from "@/features/velo/hooks/useStoredCollection.js";

const STORAGE_KEY = "velo:users:v1";

const useUsers = () => {
  return useStoredCollection(STORAGE_KEY, usersData);
};

export default useUsers;
