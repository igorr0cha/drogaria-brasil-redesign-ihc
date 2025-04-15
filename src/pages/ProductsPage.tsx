
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard, { ProductProps } from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import SearchBar from '@/components/SearchBar';
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';

const medicamentos: ProductProps[] = [
  {
    id: "1",
    name: "Dipirona 500mg - Caixa com 20 Comprimidos",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=500&auto=format&fit=crop",
    category: "Medicamentos",
    type: "Genérico",
    brand: "MedBrasil"
  },
  {
    id: "2",
    name: "Paracetamol - Gotas 15ml",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=500&auto=format&fit=crop",
    category: "Medicamentos",
    type: "Similar",
    brand: "FarmaBrasil"
  },
  {
    id: "3",
    name: "Vitamina C - Efervescente 1000mg",
    price: 22.90,
    oldPrice: 28.90,
    image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=500&auto=format&fit=crop",
    category: "Suplementos",
    type: "Original",
    brand: "VitaBrasil",
    isPromotion: true
  },
  {
    id: "8",
    name: "Ibuprofeno 400mg - 20 Comprimidos",
    price: 15.75,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=500&auto=format&fit=crop",
    category: "Medicamentos",
    type: "Genérico",
    brand: "MedBrasil"
  },
  {
    id: "9",
    name: "Omeprazol 20mg - 28 Cápsulas",
    price: 19.90,
    oldPrice: 24.50,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=500&auto=format&fit=crop",
    category: "Medicamentos",
    type: "Similar",
    brand: "FarmaBrasil",
    isPromotion: true
  },
  {
    id: "10",
    name: "Complexo B - 30 Comprimidos",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=500&auto=format&fit=crop",
    category: "Suplementos",
    type: "Original",
    brand: "VitaBrasil"
  }
];

const cuidadosPessoais: ProductProps[] = [
  {
    id: "4",
    name: "Fralda Geriátrica Tamanho M - Pacote com 10 unidades",
    price: 35.90,
    image: "https://images.unsplash.com/photo-1633414715275-fd4a1e59f10a?q=80&w=500&auto=format&fit=crop",
    category: "Cuidados Pessoais",
    type: "Original",
    brand: "CareBrasil"
  },
  {
    id: "5",
    name: "Álcool em Gel Antisséptico 70% - 500ml",
    price: 15.90,
    oldPrice: 19.90,
    image: "https://images.unsplash.com/photo-1584483720412-ce931f4aefa8?q=80&w=500&auto=format&fit=crop",
    category: "Cuidados Pessoais",
    type: "Original",
    brand: "CleanBrasil",
    isPromotion: true
  },
  {
    id: "6",
    name: "Protetor Solar FPS 50 - 120ml",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop",
    category: "Cuidados Pessoais",
    type: "Original",
    brand: "SunBrasil"
  },
  {
    id: "7",
    name: "Desodorante Antitranspirante Roll-on - 50ml",
    price: 18.50,
    image: "https://images.unsplash.com/photo-1619451683077-500fa1ea485f?q=80&w=500&auto=format&fit=crop",
    category: "Higiene",
    type: "Original",
    brand: "FreshBrasil"
  },
  {
    id: "11",
    name: "Creme Dental com Flúor - 90g",
    price: 7.90,
    image: "https://images.unsplash.com/photo-1612387290123-34af734b5063?q=80&w=500&auto=format&fit=crop",
    category: "Higiene",
    type: "Original",
    brand: "DentBrasil"
  },
  {
    id: "12",
    name: "Sabonete Líquido Antibacteriano - 250ml",
    price: 14.50,
    oldPrice: 17.90,
    image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?q=80&w=500&auto=format&fit=crop",
    category: "Higiene",
    type: "Original",
    brand: "CleanBrasil",
    isPromotion: true
  }
];

const promocoes: ProductProps[] = [
  {
    id: "3",
    name: "Vitamina C - Efervescente 1000mg",
    price: 22.90,
    oldPrice: 28.90,
    image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=500&auto=format&fit=crop",
    category: "Suplementos",
    type: "Original",
    brand: "VitaBrasil",
    isPromotion: true
  },
  {
    id: "5",
    name: "Álcool em Gel Antisséptico 70% - 500ml",
    price: 15.90,
    oldPrice: 19.90,
    image: "https://images.unsplash.com/photo-1584483720412-ce931f4aefa8?q=80&w=500&auto=format&fit=crop",
    category: "Cuidados Pessoais",
    type: "Original",
    brand: "CleanBrasil",
    isPromotion: true
  },
  {
    id: "9",
    name: "Omeprazol 20mg - 28 Cápsulas",
    price: 19.90,
    oldPrice: 24.50,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=500&auto=format&fit=crop",
    category: "Medicamentos",
    type: "Similar",
    brand: "FarmaBrasil",
    isPromotion: true
  },
  {
    id: "12",
    name: "Sabonete Líquido Antibacteriano - 250ml",
    price: 14.50,
    oldPrice: 17.90,
    image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?q=80&w=500&auto=format&fit=crop",
    category: "Higiene",
    type: "Original",
    brand: "CleanBrasil",
    isPromotion: true
  }
];

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({});
  
  let products: ProductProps[] = [];
  let pageTitle = "";
  
  switch (category) {
    case 'medicamentos':
      products = medicamentos;
      pageTitle = "Medicamentos";
      break;
    case 'cuidados-pessoais':
      products = cuidadosPessoais;
      pageTitle = "Cuidados Pessoais";
      break;
    case 'promocoes':
      products = promocoes;
      pageTitle = "Promoções";
      break;
    default:
      products = [...medicamentos, ...cuidadosPessoais];
      pageTitle = "Todos os Produtos";
  }
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Filtros aplicados:', newFilters);
  };
  
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">{pageTitle}</h1>
          <div className="max-w-xl">
            <SearchBar />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtro em tela pequena */}
          <div className="lg:hidden mb-4 flex justify-between items-center">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 py-2 px-4 border rounded-lg"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filtros
            </button>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setView('grid')}
                className={`p-2 rounded-md ${view === 'grid' ? 'bg-gray-200' : ''}`}
                aria-label="Visualização em grade"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-2 rounded-md ${view === 'list' ? 'bg-gray-200' : ''}`}
                aria-label="Visualização em lista"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Drawer de filtro em tela pequena */}
          <div className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`absolute right-0 top-0 h-full w-80 max-w-full bg-white transition-transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Filtros</h2>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                <ProductFilters onFilterChange={handleFilterChange} />
              </div>
            </div>
          </div>
          
          {/* Filtros em tela grande */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Filtros</h2>
              <ProductFilters onFilterChange={handleFilterChange} />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Mostrando {products.length} produtos
              </p>
              
              <div className="flex items-center gap-2">
                <span className="mr-2 text-sm text-gray-600">Visualização:</span>
                <button 
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-md ${view === 'grid' ? 'bg-gray-200' : ''}`}
                  aria-label="Visualização em grade"
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`p-2 rounded-md ${view === 'list' ? 'bg-gray-200' : ''}`}
                  aria-label="Visualização em lista"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Nenhum produto encontrado.</p>
                <p className="mt-2 text-gray-500">Tente modificar seus filtros ou busque por outro termo.</p>
              </div>
            ) : (
              <div className={view === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-6"
              }>
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
