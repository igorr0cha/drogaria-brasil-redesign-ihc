
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCarousel } from "@/hooks/useCarousel";

interface ReviewProps {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: ReviewProps[] = [
  {
    id: '1',
    name: 'Maria Silva',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'Excelente atendimento! A entrega foi super rápida e o medicamento chegou bem embalado. Recomendo a Drogarias Brasil para todos.',
    date: '15/03/2025'
  },
  {
    id: '2',
    name: 'João Pereira',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rating: 4,
    text: 'Sempre compro nesta farmácia pela comodidade. Os preços são justos e o atendimento online é muito prático.',
    date: '10/03/2025'
  },
  {
    id: '3',
    name: 'Ana Souza',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'Adoro a variedade de produtos que encontro na Drogarias Brasil. Os funcionários são muito atenciosos e me ajudam a encontrar o que preciso.',
    date: '05/03/2025'
  },
  {
    id: '4',
    name: 'Carlos Mendes',
    avatar: 'https://i.pravatar.cc/150?img=8',
    rating: 5,
    text: 'Sou cliente há anos e nunca tive problemas. A nova funcionalidade de receber em casa é incrível e muito conveniente nos dias de hoje.',
    date: '01/03/2025'
  },
  {
    id: '5',
    name: 'Patrícia Lima',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 4,
    text: 'Encontrei produtos de cuidados pessoais com preços muito bons. A entrega foi no prazo e o atendimento do farmacêutico foi de primeira.',
    date: '25/02/2025'
  }
];

const CustomerReviewsSection: React.FC = () => {
  const { api, setApi } = useCarousel({
    loop: true,
    autoplay: true,
    interval: 5000
  });
  
  return (
    <section className="bg-gradient-to-br from-db-green/5 to-db-green/10 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-animation">
            O que nossos <span className="text-db-green">clientes</span> dizem
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto scroll-animation">
            Veja as avaliações dos nossos clientes e descubra por que somos a farmácia de referência no Brasil há mais de 50 anos.
          </p>
        </div>
        
        <div className="scroll-animation">
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      
                      <Quote className="h-6 w-6 text-db-green/20" />
                    </div>
                    
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 flex-1">{review.text}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative mr-2" />
              <CarouselNext className="relative" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsSection;
