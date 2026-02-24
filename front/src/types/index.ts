export interface User {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: number;
  ProductId: number;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  CategoryId: number;
  Category: Category;
  Images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CartProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  CategoryId: number;
  Category: Category;
  Images: ProductImage[];
}

export interface Cart {
  id: number;
  UserId: number;
  expirationDate: string;
  total: number;
  Products: CartProduct[];
}

export interface AuthResponse {
  token: string;
  user: User;
}