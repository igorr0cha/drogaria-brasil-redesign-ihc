
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, FileText, CheckSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { initScrollAnimations } from '@/utils/scrollAnimations';

const AuthPage: React.FC<{ type: 'login' | 'register' }> = ({ type }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    document: '',
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return cleanup;
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simples validação
    if (type === 'register') {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Erro de validação",
          description: "As senhas não coincidem.",
          variant: "destructive"
        });
        return;
      }
      
      if (!formData.terms) {
        toast({
          title: "Erro de validação",
          description: "Você precisa aceitar os termos e condições.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setIsSubmitting(true);
    
    // Simulação de autenticação
    setTimeout(() => {
      if (type === 'login') {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta!",
          variant: "default"
        });
      } else {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Sua conta foi criada. Faça login para continuar.",
          variant: "default"
        });
        navigate('/login');
      }
      setIsSubmitting(false);
    }, 1500);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-db-blue/5 to-db-green/5 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto scroll-animation">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-db-green to-db-blue p-3 rounded-full mb-4">
                {type === 'login' ? (
                  <Lock className="h-6 w-6 text-white" />
                ) : (
                  <User className="h-6 w-6 text-white" />
                )}
              </div>
              <h1 className="text-2xl font-bold mb-2">
                {type === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
              </h1>
              <p className="text-gray-600 text-sm">
                {type === 'login' ? 'Insira seus dados para acessar sua conta' : 'Preencha o formulário para fazer parte da família Drogarias Brasil'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {type === 'register' && (
                <div>
                  <label htmlFor="name" className="block mb-1.5 text-sm font-medium text-gray-700">
                    Nome completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                    placeholder="Digite seu e-mail"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-1.5 text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {type === 'register' && (
                <>
                  <div>
                    <label htmlFor="confirmPassword" className="block mb-1.5 text-sm font-medium text-gray-700">
                      Confirmar senha
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                        placeholder="Confirme sua senha"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-1.5 text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="document" className="block mb-1.5 text-sm font-medium text-gray-700">
                      CPF
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="document"
                        name="document"
                        value={formData.document}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        className="w-4 h-4 text-db-green border-gray-300 rounded focus:ring-db-green"
                      />
                    </div>
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      Eu concordo com os {' '}
                      <a href="/termos" className="text-db-blue hover:underline font-medium">
                        Termos de Uso
                      </a>
                      {' '} e {' '}
                      <a href="/privacidade" className="text-db-blue hover:underline font-medium">
                        Política de Privacidade
                      </a>
                    </label>
                  </div>
                </>
              )}
              
              {type === 'login' && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      className="h-4 w-4 text-db-green border-gray-300 rounded focus:ring-db-green"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                      Lembrar-me
                    </label>
                  </div>
                  <a href="/recuperar-senha" className="text-sm text-db-blue hover:underline font-medium">
                    Esqueceu sua senha?
                  </a>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-2.5 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </span>
                ) : (
                  type === 'login' ? "Entrar" : "Cadastrar"
                )}
              </button>
              
              <div className="text-center mt-6">
                {type === 'login' ? (
                  <p className="text-sm text-gray-600">
                    Não tem uma conta? {' '}
                    <a href="/cadastro" className="text-db-blue font-medium hover:underline">
                      Cadastre-se
                    </a>
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    Já tem uma conta? {' '}
                    <a href="/login" className="text-db-blue font-medium hover:underline">
                      Faça login
                    </a>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
