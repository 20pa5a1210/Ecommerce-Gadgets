import { createContext } from "react";


type UserStoreValue = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const userStore = createContext<UserStoreValue | null>(null);
