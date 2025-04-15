
import React, { useEffect, useRef } from 'react';

const AboutPage: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  
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
    
    sectionsRef.current.forEach((section) => {
      if (section) {
        const elements = section.querySelectorAll('.scroll-animation');
        elements.forEach((el) => observer.observe(el));
      }
    });
    
    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          const elements = section.querySelectorAll('.scroll-animation');
          elements.forEach((el) => observer.unobserve(el));
        }
      });
    };
  }, []);
  
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };
  
  return (
    <div className="min-h-screen pt-20">
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1920&auto=format&fit=crop)` }}
        >
          <div className="absolute inset-0 bg-db-dark/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nós</h1>
              <p className="text-xl max-w-2xl mx-auto px-4">
                Conheça a história e os valores da Drogarias Brasil
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16" ref={addToRefs}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 scroll-animation">Nossa História</h2>
            <div className="space-y-4">
              <p className="text-gray-700 scroll-animation">
                Fundada em 1970, a Drogarias Brasil nasceu com uma missão clara: oferecer produtos farmacêuticos de qualidade com atendimento humanizado. Começamos com uma pequena farmácia no centro do Rio de Janeiro e, ao longo dos anos, expandimos nossa presença para várias cidades do país.
              </p>
              <p className="text-gray-700 scroll-animation">
                Nossa trajetória de mais de 50 anos é marcada pelo compromisso com a saúde e bem-estar dos brasileiros, sempre buscando inovar e oferecer os melhores produtos e serviços.
              </p>
              <p className="text-gray-700 scroll-animation">
                Ao longo das décadas, adaptamo-nos às mudanças do mercado farmacêutico, incorporando novas tecnologias e expandindo nosso portfólio de produtos, mas sempre mantendo nossos valores fundamentais de ética, confiança e cuidado com o cliente.
              </p>
            </div>
          </div>
          <div className="scroll-animation">
            <img 
              src="https://images.pexels.com/photos/5934485/pexels-photo-5934485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Farmácia tradicional"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-10 scroll-animation">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105 scroll-animation">
              <div className="h-16 w-16 mx-auto bg-db-green/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-db-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Confiança</h3>
              <p className="text-gray-600">
                Construímos relacionamentos duradouros baseados na transparência e na qualidade dos nossos produtos.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105 scroll-animation">
              <div className="h-16 w-16 mx-auto bg-db-green/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-db-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Atendimento</h3>
              <p className="text-gray-600">
                Valorizamos cada cliente e buscamos oferecer um serviço personalizado e humanizado.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105 scroll-animation">
              <div className="h-16 w-16 mx-auto bg-db-green/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-db-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualidade</h3>
              <p className="text-gray-600">
                Selecionamos cuidadosamente nossos fornecedores e produtos para garantir excelência.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105 scroll-animation">
              <div className="h-16 w-16 mx-auto bg-db-green/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-db-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Inovação</h3>
              <p className="text-gray-600">
                Buscamos constantemente novos produtos e tecnologias para melhor atender nossos clientes.
              </p>
            </div>
          </div>
        </div>
        
        <div ref={addToRefs} className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold scroll-animation">Nossa Equipe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4 scroll-animation">
              Conheça os profissionais que fazem a Drogarias Brasil acontecer todos os dias, 
              cuidando da sua saúde e bem-estar com dedicação e excelência.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md scroll-animation">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop"
                alt="Diretora Farmacêutica"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dra. Carla Santos</h3>
                <p className="text-db-green mb-4">Diretora Farmacêutica</p>
                <p className="text-gray-600">
                  Com mais de 20 anos de experiência no setor farmacêutico, a Dra. Carla lidera nossa equipe 
                  técnica garantindo a qualidade de todos os produtos e serviços.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md scroll-animation">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
                alt="Diretor Comercial"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Ricardo Almeida</h3>
                <p className="text-db-green mb-4">Diretor Comercial</p>
                <p className="text-gray-600">
                  Responsável por estabelecer parcerias estratégicas e garantir que nossos preços
                  sejam competitivos sem comprometer a qualidade.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md scroll-animation">
              <img 
                src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?q=80&w=400&auto=format&fit=crop"
                alt="Coordenadora de Atendimento"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Ana Oliveira</h3>
                <p className="text-db-green mb-4">Coordenadora de Atendimento</p>
                <p className="text-gray-600">
                  Ana treina nossa equipe de atendimento para oferecer um serviço humanizado
                  e personalizado, colocando o cliente sempre em primeiro lugar.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div ref={addToRefs} className="bg-db-green text-white p-8 md:p-12 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="scroll-animation">
              <h2 className="text-3xl font-bold mb-6">Compromisso Social</h2>
              <p className="mb-4">
                Acreditamos que uma empresa tem responsabilidades que vão além dos seus produtos e serviços. 
                Por isso, mantemos um forte compromisso com ações sociais que impactam positivamente nossas comunidades.
              </p>
              <p className="mb-6">
                Realizamos campanhas regulares de vacinação, orientação sobre saúde e bem-estar, 
                além de parcerias com instituições de caridade para doação de medicamentos.
              </p>
              <button className="bg-white text-db-green font-medium py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                Saiba mais sobre nossas ações
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 scroll-animation">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=300&auto=format&fit=crop"
                  alt="Ação social"
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=300&auto=format&fit=crop"
                  alt="Ação social"
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1576765608622-067973a79f53?q=80&w=300&auto=format&fit=crop"
                  alt="Ação social"
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=300&auto=format&fit=crop"
                  alt="Ação social"
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
