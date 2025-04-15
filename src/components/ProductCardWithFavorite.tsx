
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { useFavorite } from '@/hooks/useFavorite';
import { Button } from '@/components/ui/button';

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  type: string;
  brand: string;
  isPromotion?: boolean;
  quantity?: number;
}

const ProductCardWithFavorite: React.FC<ProductProps> = (product) => {
  const { id, name, price, oldPrice, image, isPromotion } = product;
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorite();
  const [isLoggedIn] = useState(false); // Simulating logged-in state
  const favorite = isFavorite(id);
  
  const handleAddToCart = () => {
    // Using the modified CartContext that accepts a product without requiring quantity
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1 // Set a default quantity
    });
    
    toast({
      title: "Produto adicionado",
      description: "O item foi adicionado ao carrinho.",
    });
  };
  
  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id, isLoggedIn);
    }
  };
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-xl transform -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        {isPromotion && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Promoção
          </div>
        )}
        
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:scale-110 transition-transform z-10"
        >
          <Heart className={`h-5 w-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
        
        <Link to={`/produto/${id}`}>
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
        </Link>
      </div>
      
      <div className="p-4">
        <Link to={`/produto/${id}`} className="block">
          <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 hover:text-db-green transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-baseline mt-2 mb-3">
          <span className="text-lg font-semibold text-db-green">
            {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          
          {oldPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              {oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            size="sm"
            className="flex-1 flex items-center justify-center text-db-green border-db-green hover:bg-db-green hover:text-white transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            <span>Adicionar</span>
          </Button>
          
          <Button 
            variant="default"
            size="sm"
            className="bg-db-green text-white hover:bg-db-green/90 transition-colors"
            asChild
          >
            <Link to={`/produto/${id}`}>Ver detalhes</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardWithFavorite;
