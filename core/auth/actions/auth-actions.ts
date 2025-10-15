import { productsApi } from "../api/productsApi";
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
    throw new Error("User and/or password not valid");
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
