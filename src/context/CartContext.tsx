
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  
  const addToCart = (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Se o produto já existe, aumenta a quantidade
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += product.quantity || 1;
        
        toast({
          title: "Produto atualizado no carrinho",
          description: `Quantidade de ${product.name} atualizada.`,
          variant: "default"
        });
        
        return updatedItems;
      } else {
        // Se o produto não existe, adiciona
        toast({
          title: "Produto adicionado",
          description: `${product.name} adicionado ao carrinho.`,
          variant: "default"
        });
        
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
    
    openCart();
  };
  
  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      
      if (itemToRemove) {
        toast({
          title: "Produto removido",
          description: `${itemToRemove.name} removido do carrinho.`,
          variant: "default"
        });
      }
      
      return prevItems.filter(item => item.id !== id);
    });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Carrinho esvaziado",
      description: "Todos os produtos foram removidos do carrinho.",
      variant: "default"
    });
  };
  
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      isOpen,
      openCart,
      closeCart,
      clearCart,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
