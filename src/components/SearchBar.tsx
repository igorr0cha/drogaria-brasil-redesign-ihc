
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductSuggestionProps {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
}

const dummyProducts: ProductSuggestionProps[] = [
  {
    id: "1",
    name: "Dipirona 500mg - Caixa com 20 Comprimidos",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=100&auto=format&fit=crop",
    category: "Medicamentos",
    price: 8.99
  },
  {
    id: "2",
    name: "Paracetamol - Gotas 15ml",
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=100&auto=format&fit=crop",
    category: "Medicamentos",
    price: 12.50
  },
  {
    id: "3",
    name: "Vitamina C - Efervescente 1000mg",
    image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=100&auto=format&fit=crop",
    category: "Suplementos",
    price: 22.90
  },
  {
    id: "4",
    name: "Fralda Geriátrica Tamanho M",
    image: "https://images.unsplash.com/photo-1633414715275-fd4a1e59f10a?q=80&w=100&auto=format&fit=crop",
    category: "Cuidados Pessoais",
    price: 35.90
  },
  {
    id: "5",
    name: "Álcool em Gel Antisséptico 70%",
    image: "https://images.unsplash.com/photo-1584483720412-ce931f4aefa8?q=80&w=100&auto=format&fit=crop",
    category: "Cuidados Pessoais",
    price: 15.90
  }
];

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ProductSuggestionProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (query.length > 1) {
      const filteredProducts = dummyProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredProducts);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/busca?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };
  
  const handleSuggestionClick = (id: string) => {
    navigate(`/produto/${id}`);
    setIsOpen(false);
    setQuery('');
  };
  
  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="O que você procura?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 1 && setIsOpen(true)}
            className="w-full pl-12 pr-4 py-3 border-none shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-db-green bg-white text-gray-800"
            aria-label="Campo de pesquisa"
          />
          <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center">
            <Search className="h-5 w-5 text-db-green" />
          </div>
          {query && (
            <button 
              type="button" 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition-colors"
              aria-label="Limpar busca"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
          )}
        </div>
      </form>
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-xl z-50 max-h-[400px] overflow-y-auto border border-gray-100">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Sugestões</h3>
            <div className="space-y-3">
              {suggestions.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleSuggestionClick(product.id)}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="text-sm font-medium text-gray-800">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.category}</div>
                  </div>
                  <div className="text-db-green font-medium">
                    {formatPrice(product.price)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t text-center">
              <button 
                onClick={handleSearchSubmit}
                className="text-db-blue text-sm font-medium hover:underline"
              >
                Ver todos os resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
