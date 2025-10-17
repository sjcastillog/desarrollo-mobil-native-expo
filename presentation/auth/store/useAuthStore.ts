import {
  authCheckStatus,
  authLogin,
  authRegister,
} from "@/core/auth/actions/auth-actions";
import { UserI } from "@/core/auth/interface";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface NewUserI {
  fullName: string;
  email: string;
  password: string;
}
export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: UserI;

  login: (email: string, password: string) => Promise<boolean>;
  register: (data: NewUserI) => Promise<string>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: UserI) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  // Actions

  changeStatus: async (token?: string, user?: UserI) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      await SecureStorageAdapter.deleteItem("token");
      return false;
    }

    set({ status: "authenticated", token: token, user: user });

    await SecureStorageAdapter.setItem("token", token);

    return true;
  },

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    return get().changeStatus(resp?.token, resp?.user);
  },

  register: async (data: NewUserI) => {
    const resp = await authRegister(data);

    return resp?.token!;
  },

  checkStatus: async () => {
    if (get().user) {
      return;
    }

    const resp = await authCheckStatus();

    get().changeStatus(resp?.token, resp?.user);
  },

  logout: async () => {
    SecureStorageAdapter.deleteItem("token");

    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
