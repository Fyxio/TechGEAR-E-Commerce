import { createContext, useContext, useState, type ReactNode } from "react";
import type { Cart } from "../types";
import { getCart, addToCart as addToCartService, removeFromCart as removeFromCartService } from "../services/cart.service";

interface CartContextType {
  cart: Cart | null;
  fetchCart: (userId: number) => Promise<void>;
  addToCart: (cartId: number, productId: number) => Promise<void>;
  removeFromCart: (cartId: number, productId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  const fetchCart = async (userId: number) => {
    const data = await getCart(userId);
    setCart(data);
  };

  const addToCart = async (cartId: number, productId: number) => {
    await addToCartService(cartId, productId);
    await fetchCart(cart!.UserId);
  };

  const removeFromCart = async (cartId: number, productId: number) => {
    await removeFromCartService(cartId, productId);
    await fetchCart(cart!.UserId);
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans CartProvider");
  return context;
};