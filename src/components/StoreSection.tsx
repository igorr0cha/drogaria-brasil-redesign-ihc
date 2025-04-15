
import React, { useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Clock } from 'lucide-react';
import { useCarousel } from "@/hooks/useCarousel";

const storeImages = [
  "https://lh3.googleusercontent.com/p/AF1QipP0ZwYe9Z5LMdXmTrzIPo_S-dadNmhRrsTSaVIi=w408-h431-k-no",
  "https://www.google.com.br/maps/place/Drogaria+Brasil+Pra%C3%A7a+da+Bandeira/@-22.9115489,-43.214002,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipO5mtzSZJtol1hojkIx_qSapBzwVh6_I07cKknD!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipO5mtzSZJtol1hojkIx_qSapBzwVh6_I07cKknD%3Dw396-h298-k-no!7i3280!8i2464!4m9!3m8!1s0x997f10a6d8f151:0x8f170e262709198a!8m2!3d-22.9115489!4d-43.214002!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11w_m499tt?authuser=2&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D#",
  "https://www.google.com.br/maps/place/Drogaria+Brasil+Pra%C3%A7a+da+Bandeira/@-22.9115489,-43.214002,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipO5mtzSZJtol1hojkIx_qSapBzwVh6_I07cKknD!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipO5mtzSZJtol1hojkIx_qSapBzwVh6_I07cKknD%3Dw396-h298-k-no!7i3280!8i2464!4m9!3m8!1s0x997f10a6d8f151:0x8f170e262709198a!8m2!3d-22.9115489!4d-43.214002!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11w_m499tt?authuser=2&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D#",
  "https://images.unsplash.com/photo-1567307668696-7ff50c068be8?q=80&w=800&auto=format&fit=crop"
];

const StoreSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { api, setApi } = useCarousel({
    loop: true,
    autoplay: true,
    interval: 5000,
  });

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
    <section className="section py-16 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 scroll-animation">
          Nosso <span className="text-db-green">Espaço</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="scroll-animation">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {storeImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="p-0">
                          <div 
                            className="h-[300px] md:h-[400px] bg-cover bg-center rounded-lg overflow-hidden"
                            style={{ backgroundImage: `url(${image})` }}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          
          <div className="scroll-animation">
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Nossa Localização</h3>
                
                <div className="mb-8">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.356219798796!2d-43.18056692559831!3d-22.90363397929868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f58a6a00a9d%3A0x3f251d85272f76f7!2sAv.%20Rio%20Branco%2C%20Centro%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1714212310985!5m2!1spt-BR!2sbr" 
                    width="100%" 
                    height="200"
                    style={{ border: 0, borderRadius: '0.5rem' }}
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização da Drogarias Brasil"
                  ></iframe>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-db-green mr-3" />
                    <p>Av. Rio Branco, 123 - Centro, Rio de Janeiro - RJ</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-db-green mr-3" />
                    <p>(21) 3456-7890</p>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-db-green mr-3 mt-1" />
                    <div>
                      <p>Segunda à Sexta: 07:00 - 22:00</p>
                      <p>Sábados: 08:00 - 20:00</p>
                      <p>Domingos: 08:00 - 18:00</p>
                    </div>
                  </div>
                </div>
                
                <button className="btn-primary w-full mt-6">Como chegar</button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreSection;
