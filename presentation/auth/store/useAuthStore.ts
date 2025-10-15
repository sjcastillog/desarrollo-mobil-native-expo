import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { UserI } from "@/core/auth/interface";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: UserI;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: UserI) => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  // Actions

  changeStatus: (token?: string, user?: UserI) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return false;
    }

    set({ status: "authenticated", token: token, user: user });

    // TODO: GUARDAR EL TOKEN EN EL SECURE STORAGE
    return true;
  },

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    return get().changeStatus(resp?.token, resp?.user);
  },
  checkStatus: async () => {
    const resp = await authCheckStatus();

    get().changeStatus(resp?.token, resp?.user);
  },
  logout: async () => {
    // TODO: CLEAR DEL TOKEN DEL SECURE STORAGE
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
