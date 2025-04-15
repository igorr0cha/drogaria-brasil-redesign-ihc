
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Package, Truck, ShieldCheck, Heart } from 'lucide-react';
import ProductCard, { ProductProps } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

// Produtos de exemplo
const products: Record<string, ProductProps> = {
  "1": {
    id: "1",
    name: "Dipirona 500mg - Caixa com 20 Comprimidos",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=500&auto=format&fit=crop",
    category: "Medicamentos",
    type: "Genérico",
    brand: "MedBrasil"
  },
  "2": {
    id: "2",
    name: "Paracetamol - Gotas 15ml",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=500&auto=format&fit=crop",
    category: "Medicamentos",
    type: "Similar",
    brand: "FarmaBrasil"
  },
  "3": {
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
  "4": {
    id: "4",
    name: "Fralda Geriátrica Tamanho M - Pacote com 10 unidades",
    price: 35.90,
    image: "https://images.unsplash.com/photo-1633414715275-fd4a1e59f10a?q=80&w=500&auto=format&fit=crop",
    category: "Cuidados Pessoais",
    type: "Original",
    brand: "CareBrasil"
  },
  "5": {
    id: "5",
    name: "Álcool em Gel Antisséptico 70% - 500ml",
    price: 15.90,
    oldPrice: 19.90,
    image: "https://images.unsplash.com/photo-1584483720412-ce931f4aefa8?q=80&w=500&auto=format&fit=crop",
    category: "Cuidados Pessoais",
    type: "Original",
    brand: "CleanBrasil",
    isPromotion: true
  }
};

// Produtos relacionados de exemplo
const relatedProducts: ProductProps[] = [
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

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  
  if (!id || !products[id]) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <p className="mb-6">O produto que você está procurando não existe ou foi removido.</p>
          <Link to="/" className="btn-primary">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }
  
  const product = products[id];
  
  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-8">
          <Link to="/" className="text-gray-500 hover:text-db-green">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link to={`/${product.category.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-db-green">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-700">{product.name}</span>
        </div>
        
        {/* Product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          
          <div>
            <div className="mb-2 flex items-center">
              <span className="text-sm bg-db-green/10 text-db-green px-2 py-1 rounded">
                {product.type}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                {product.brand}
              </span>
            </div>
            
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index}
                    className={`h-4 w-4 ${index < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">(12 avaliações)</span>
            </div>
            
            <div className="flex items-end gap-3 mb-6">
              <div className="text-3xl font-bold text-db-green">
                {formatPrice(product.price)}
              </div>
              {product.oldPrice && (
                <div className="text-lg text-gray-500 line-through">
                  {formatPrice(product.oldPrice)}
                </div>
              )}
            </div>
            
            <div className="mb-8">
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl eu ultricies lacinia, nisl nisl aliquam nisl, euismod euismod nisl nisl eu ultricies lacinia.
              </p>
            </div>
            
            <div className="flex items-center mb-8">
              <div className="flex items-center border rounded-md overflow-hidden mr-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <input 
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 text-center border-l border-r p-2"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="btn-primary w-full py-3"
              >
                Adicionar ao Carrinho
              </button>
              
              <button 
                className="ml-3 p-3 rounded-full border hover:bg-gray-100 transition-colors"
                aria-label="Favoritar"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>
            
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-start">
                <Package className="h-5 w-5 text-db-green mt-1 mr-3" />
                <div>
                  <p className="font-medium">Disponibilidade</p>
                  <p className="text-gray-600">Em estoque - pronto para envio</p>
                </div>
              </div>
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-db-green mt-1 mr-3" />
                <div>
                  <p className="font-medium">Entrega</p>
                  <p className="text-gray-600">Entrega grátis para compras acima de R$ 50,00</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheck className="h-5 w-5 text-db-green mt-1 mr-3" />
                <div>
                  <p className="font-medium">Garantia</p>
                  <p className="text-gray-600">Satisfação garantida ou seu dinheiro de volta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product tabs */}
        <div className="mb-16">
          <div className="border-b mb-6">
            <div className="flex overflow-x-auto">
              <button 
                onClick={() => setActiveTab('description')}
                className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'description' ? 'border-b-2 border-db-green text-db-green' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Descrição
              </button>
              <button 
                onClick={() => setActiveTab('details')}
                className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'details' ? 'border-b-2 border-db-green text-db-green' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Informações Técnicas
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'reviews' ? 'border-b-2 border-db-green text-db-green' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Avaliações (12)
              </button>
            </div>
          </div>
          
          <div className="py-4">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget euismod nisl nisl eget ultricies lacinia. Nulla facilisi. Sed euismod, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget euismod nisl nisl eget ultricies lacinia.
                </p>
                <p className="mb-4">
                  Phasellus auctor, magna eget ultricies lacinia, nisl nisl aliquam nisl, eget euismod nisl nisl eget ultricies lacinia. Nulla facilisi. Sed euismod, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget euismod nisl nisl eget ultricies lacinia.
                </p>
                <p>
                  Suspendisse potenti. Sed euismod, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget euismod nisl nisl eget ultricies lacinia. Nulla facilisi. Sed euismod, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget euismod nisl nisl eget ultricies lacinia.
                </p>
              </div>
            )}
            
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Especificações do produto</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Nome</td>
                          <td className="py-2">{product.name}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Marca</td>
                          <td className="py-2">{product.brand}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Tipo</td>
                          <td className="py-2">{product.type}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Categoria</td>
                          <td className="py-2">{product.category}</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Código</td>
                          <td className="py-2">DB-{product.id}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Informações importantes</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Armazenar em local seco e arejado</li>
                      <li>Proteger da luz e umidade</li>
                      <li>Manter fora do alcance de crianças</li>
                      <li>Leia sempre a bula antes de consumir</li>
                      <li>Em caso de dúvida, consulte um profissional de saúde</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="mb-8 flex flex-col md:flex-row gap-6 md:items-center">
                  <div className="flex-shrink-0 text-center">
                    <div className="text-5xl font-bold text-db-green">4.0</div>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, index) => (
                        <Star 
                          key={index}
                          className={`h-4 w-4 ${index < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">12 avaliações</p>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center">
                      <span className="w-12 text-sm text-right pr-3">5 ★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="w-12 text-sm text-gray-500 pl-3">60%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 text-sm text-right pr-3">4 ★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="w-12 text-sm text-gray-500 pl-3">20%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 text-sm text-right pr-3">3 ★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="w-12 text-sm text-gray-500 pl-3">10%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 text-sm text-right pr-3">2 ★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                      <span className="w-12 text-sm text-gray-500 pl-3">5%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 text-sm text-right pr-3">1 ★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                      <span className="w-12 text-sm text-gray-500 pl-3">5%</span>
                    </div>
                  </div>
                </div>
                
                <button className="btn-primary">Escrever uma avaliação</button>
                
                <div className="mt-8 border-t pt-8">
                  <h3 className="text-lg font-semibold mb-6">Avaliações recentes</h3>
                  
                  <div className="space-y-8">
                    {/* Example reviews */}
                    <div className="border-b pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, index) => (
                            <Star 
                              key={index}
                              className={`h-4 w-4 ${index < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 font-medium">Ótimo produto</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        Por Maria S. em 10/03/2023
                      </p>
                      <p className="text-gray-700">
                        Produto de excelente qualidade! Superou minhas expectativas. Entrega rápida e o preço está ótimo comparado a outras farmácias.
                      </p>
                    </div>
                    
                    <div className="border-b pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, index) => (
                            <Star 
                              key={index}
                              className={`h-4 w-4 ${index < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 font-medium">Bom custo-benefício</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        Por João P. em 28/02/2023
                      </p>
                      <p className="text-gray-700">
                        Produto com boa relação custo-benefício. Faz o que promete e o preço está dentro do esperado.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, index) => (
                            <Star 
                              key={index}
                              className={`h-4 w-4 ${index < 3 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 font-medium">Atendeu às expectativas</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        Por Ana L. em 15/02/2023
                      </p>
                      <p className="text-gray-700">
                        O produto é bom, mas a entrega demorou um pouco mais do que o esperado. De qualquer forma, atendeu às minhas necessidades.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
