
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { initScrollAnimations } from '@/utils/scrollAnimations';

const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return cleanup;
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio
    setTimeout(() => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
        variant: "default"
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen pt-20">
      <div className="relative h-80 md:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1920&auto=format&fit=crop)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-db-dark/70 to-db-dark/90 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 scroll-animation">Atendimento</h1>
              <p className="text-xl max-w-2xl mx-auto scroll-animation">
                Estamos aqui para cuidar de você. Nossa equipe está pronta para atender todas as suas necessidades.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md scroll-animation">
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-full bg-db-green/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-db-green" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">Telefone</h3>
                <p className="text-gray-700">(21) 3456-7890</p>
                <p className="text-gray-700">(21) 98765-4321</p>
                <p className="text-sm text-gray-500 mt-2">
                  Para atendimento imediato e pedidos por telefone
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md scroll-animation" style={{animationDelay: "0.2s"}}>
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-full bg-db-green/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-db-green" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">E-mail</h3>
                <p className="text-gray-700">contato@drogariasbrasil.com.br</p>
                <p className="text-gray-700">sac@drogariasbrasil.com.br</p>
                <p className="text-sm text-gray-500 mt-2">
                  Respondemos em até 24 horas úteis
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md scroll-animation" style={{animationDelay: "0.4s"}}>
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-full bg-db-green/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-db-green" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">Horário de Atendimento</h3>
                <p className="text-gray-700">Segunda à Sexta: 07:00 - 22:00</p>
                <p className="text-gray-700">Sábados: 08:00 - 20:00</p>
                <p className="text-gray-700">Domingos: 08:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="scroll-animation">
            <h2 className="text-2xl font-bold mb-6">Envie-nos uma mensagem</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                    placeholder="Digite seu nome"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                    placeholder="Digite seu e-mail"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">
                    Assunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="duvida">Dúvida sobre produto</option>
                    <option value="pedido">Informações sobre pedido</option>
                    <option value="reclamacao">Reclamação</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                  placeholder="Digite sua mensagem..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="scroll-animation" style={{animationDelay: "0.3s"}}>
            <h2 className="text-2xl font-bold mb-6">Nossa Localização</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-6">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.356219798796!2d-43.18056692559831!3d-22.90363397929868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f58a6a00a9d%3A0x3f251d85272f76f7!2sAv.%20Rio%20Branco%2C%20Centro%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1714212310985!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="300"
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Drogarias Brasil"
              ></iframe>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Drogarias Brasil - Unidade Centro</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-db-green mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-gray-600">Av. Rio Branco, 123 - Centro</p>
                    <p className="text-gray-600">Rio de Janeiro - RJ, 20040-009</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-db-green mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-gray-600">(21) 3456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-db-green mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Horário de Funcionamento</p>
                    <p className="text-gray-600">Segunda à Sexta: 07:00 - 22:00</p>
                    <p className="text-gray-600">Sábados: 08:00 - 20:00</p>
                    <p className="text-gray-600">Domingos: 08:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
