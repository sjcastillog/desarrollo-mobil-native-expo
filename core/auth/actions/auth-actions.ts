import { productsApi } from "@/core/api/productsApi";
import { NewUserI } from "@/presentation/auth/store/useAuthStore";
import { UserI } from "../interface";

export interface AuthResponseI {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

const returnUserToken = (data: AuthResponseI) => {
  const { id, email, fullName, isActive, roles, token } = data;

  const user: UserI = {
    id,
    email,
    fullName,
    isActive,
    roles,
  };

  return {
    user,
    token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const { data } = await productsApi.post<AuthResponseI>("/auth/login", {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const authRegister = async (data:NewUserI) => {
  let { email, fullName, password} = data;
  email = email.toLowerCase();

  try {
    const { data } = await productsApi.post<AuthResponseI>("/auth/register", {
      email,
      password,
      fullName,
    });


    return returnUserToken(data);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await productsApi.get<AuthResponseI>("/auth/check-status");

    return returnUserToken(data);
    
  } catch (err) {
    return null;
  }
};
