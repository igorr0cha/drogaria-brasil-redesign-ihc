
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    <div className="min-h-screen pt-16 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
              {type === 'login' ? 'Login' : 'Criar Conta'}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {type === 'register' && (
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                    placeholder="Digite seu nome completo"
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                  placeholder="Digite seu e-mail"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              {type === 'register' && (
                <>
                  <div>
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
                      Confirmar senha
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                        placeholder="Confirme sua senha"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="document" className="block mb-2 text-sm font-medium text-gray-700">
                      CPF
                    </label>
                    <input
                      type="text"
                      id="document"
                      name="document"
                      value={formData.document}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                      placeholder="000.000.000-00"
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-db-green border-gray-300 rounded focus:ring-db-green"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      Eu concordo com os {' '}
                      <a href="/termos" className="text-db-blue hover:underline">
                        Termos de Uso
                      </a>
                      {' '} e {' '}
                      <a href="/privacidade" className="text-db-blue hover:underline">
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
                  <a href="/recuperar-senha" className="text-sm text-db-blue hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-2.5"
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
              
              <div className="text-center">
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
