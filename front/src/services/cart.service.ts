import api from "./api";
import type { Cart } from "../types";

export const getCart = async (userId: number): Promise<Cart> => {
  const res = await api.get<Cart>(`/carts/user/${userId}`);
  return res.data;
};

export const addToCart = async (
  cartId: number,
  productId: number
): Promise<void> => {
  await api.post(`/carts/${cartId}/products/${productId}`);
};

export const removeFromCart = async (
  cartId: number,
  productId: number
): Promise<void> => {
  await api.delete(`/carts/${cartId}/products/${productId}`);
};