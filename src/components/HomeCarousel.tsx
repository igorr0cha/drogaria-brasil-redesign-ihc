
import React from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCarousel } from "@/hooks/useCarousel";

interface SlideProps {
  image: string;
  title: string;
  slogan: string;
}

const slides: SlideProps[] = [
  {
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1800&auto=format&fit=crop",
    title: "Mais saúde para sua família",
    slogan: "Cuidando de você há décadas"
  },
  {
    image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Confiança há mais de 50 anos",
    slogan: "A farmácia que o Brasil confia"
  },
  {
    image: "https://images.pexels.com/photos/11899614/pexels-photo-11899614.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Entrega rápida com cuidado e carinho",
    slogan: "Do nosso balcão para sua casa"
  },
  {
    image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1800&auto=format&fit=crop",
    title: "A farmácia do seu bairro com cara do Brasil",
    slogan: "Sempre perto de você"
  }
];

const HomeCarousel: React.FC = () => {
  const { api, setApi } = useCarousel({
    loop: true,
    autoplay: true,
    interval: 6000,
  });

  return (
    <div className="w-full mt-16">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-db-dark/70 to-transparent flex items-center">
                    <div className="container mx-auto px-4">
                      <div className="max-w-lg text-white">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
                          {slide.title}
                        </h1>
                        <p className="text-xl md:text-2xl mb-6 animate-fade-in">
                          {slide.slogan}
                        </p>
                        <Link to="/sobre" className="btn-primary animate-fade-in">
                          Saiba mais
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
