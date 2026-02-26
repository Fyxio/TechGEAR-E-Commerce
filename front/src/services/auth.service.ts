import api from "./api";
import type { AuthResponse, User } from "../types";

export const signin = async (
  emailAddress: string,
  password: string
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/users/signin", {
    emailAddress,
    password,
  });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const signup = async (data: {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/users/signup", data);
  return res.data;
};

export const getUser = async (userId: number): Promise<User> => {
  const res = await api.get<User>(`/users/${userId}`);
  return res.data;
};

export const updateUser = async (
  userId: number,
  data: Partial<User>
): Promise<User> => {
  const res = await api.put<User>(`/users/${userId}`, data);
  return res.data;
};

export const logout = (): void => {
  localStorage.removeItem("token");
};