
import React, { useEffect, useRef } from 'react';
import ProductCard, { ProductProps } from './ProductCard';

const featuredProducts: ProductProps[] = [
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
    id: "8",
    name: "Creme Dental com Flúor - 90g",
    price: 7.90,
    image: "https://images.unsplash.com/photo-1612387290123-34af734b5063?q=80&w=500&auto=format&fit=crop",
    category: "Higiene",
    type: "Original",
    brand: "DentBrasil"
  }
];

const FeaturedProducts: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      const elements = section.querySelectorAll('.scroll-animation');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (section) {
        const elements = section.querySelectorAll('.scroll-animation');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section className="section" ref={sectionRef}>
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 scroll-animation">
          Produtos <span className="text-db-green">Destacados</span>
        </h2>
        <p className="text-center text-db-gray mb-12 max-w-2xl mx-auto scroll-animation">
          Conheça nossa seleção exclusiva de produtos em destaque, com preços especiais e qualidade garantida.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="scroll-animation" style={{ transitionDelay: `${index * 100}ms` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
