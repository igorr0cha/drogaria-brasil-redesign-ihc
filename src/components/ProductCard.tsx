
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  type: string;
  brand: string;
  isPromotion?: boolean;
  oldPrice?: number;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, price, image, category, isPromotion, oldPrice }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  
  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1
    });
  };
  
  return (
    <div 
      className="product-card relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPromotion && (
        <div className="absolute top-3 left-3 z-10 bg-db-yellow text-db-dark py-1 px-2 rounded-md text-xs font-semibold">
          Promoção
        </div>
      )}
      
      <div className="relative overflow-hidden h-48">
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            to={`/produto/${id}`}
            className="h-10 w-10 bg-white rounded-full flex items-center justify-center transition-transform duration-300 hover:bg-db-green hover:text-white transform hover:scale-110"
            aria-label="Ver detalhes"
          >
            <Eye className="h-5 w-5" />
          </Link>
          
          <button 
            onClick={handleAddToCart}
            className="h-10 w-10 bg-white rounded-full flex items-center justify-center transition-transform duration-300 hover:bg-db-green hover:text-white transform hover:scale-110"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-sm text-db-gray mb-1">{category}</div>
        <h3 className="font-semibold mb-2 line-clamp-2 min-h-[48px]">{name}</h3>
        <div className="flex items-end gap-2">
          <div className="text-lg font-bold text-db-green">
            {formatPrice(price)}
          </div>
          {isPromotion && oldPrice && (
            <div className="text-sm text-db-gray line-through">
              {formatPrice(oldPrice)}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Link 
            to={`/produto/${id}`}
            className="btn-outline text-center text-sm py-1.5"
          >
            Ver Detalhes
          </Link>
          <button 
            onClick={handleAddToCart}
            className="btn-primary text-sm py-1.5"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
