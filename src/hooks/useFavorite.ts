
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function useFavorite() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  const { toast } = useToast();
  
  const addToFavorites = (productId: string, isLoggedIn: boolean = false) => {
    if (!isLoggedIn) {
      toast({
        title: "É necessário fazer login",
        description: "Para adicionar produtos aos favoritos, você precisa estar logado.",
        variant: "destructive",
      });
      return false;
    }
    
    const newFavorites = [...favorites, productId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    toast({
      title: "Produto adicionado aos favoritos",
      description: "O produto foi adicionado à sua lista de favoritos.",
    });
    
    return true;
  };
  
  const removeFromFavorites = (productId: string) => {
    const newFavorites = favorites.filter(id => id !== productId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    toast({
      title: "Produto removido dos favoritos",
      description: "O produto foi removido da sua lista de favoritos.",
    });
    
    return true;
  };
  
  const isFavorite = (productId: string) => {
    return favorites.includes(productId);
  };
  
  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
}
