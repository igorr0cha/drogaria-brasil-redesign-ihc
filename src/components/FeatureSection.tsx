
import React, { useEffect, useRef } from 'react';
import { Clock, Calendar, Heart, Home } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-white">
      <div className="h-16 w-16 rounded-full bg-db-green/10 flex items-center justify-center mb-4 text-db-green">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-db-gray">{description}</p>
    </div>
  );
};

const FeatureSection: React.FC = () => {
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

  const features: FeatureProps[] = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Entrega em até 1h",
      description: "Receba seus medicamentos e produtos rapidamente onde estiver"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Mais de 50 anos no mercado",
      description: "Experiência e tradição cuidando da saúde dos brasileiros"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Atendimento humanizado",
      description: "Nossos farmacêuticos estão prontos para auxiliar você"
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "Receba em casa ou retire na loja",
      description: "Escolha a opção mais conveniente para você"
    }
  ];

  return (
    <section className="section bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 scroll-animation">
          Por que escolher a <span className="text-db-green">Drogarias Brasil</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="scroll-animation" style={{ transitionDelay: `${index * 150}ms` }}>
              <Feature {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
