import api from "./api";
import type { Product } from "../types";

export const getProducts = async (search?: string): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products", {
    params: search ? { search } : {},
  });
  return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};