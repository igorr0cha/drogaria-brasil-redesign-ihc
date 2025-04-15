
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { CreditCard, Truck, MapPin, Home, Store, Check } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useCart();
  const { toast } = useToast();
  const [isLoggedIn] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardCode, setCardCode] = useState('');
  
  const handleProceed = () => {
    if (!isLoggedIn) {
      toast({
        title: "É necessário fazer login",
        description: "Para finalizar sua compra, você precisa estar logado.",
        variant: "destructive",
      });
      
      // Navigate to login page with return URL
      navigate('/login?redirect=checkout');
      return;
    }
    
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      // Process order
      toast({
        title: "Pedido realizado com sucesso!",
        description: "Seu pedido foi recebido e será processado em breve.",
        variant: "default",
      });
      
      clearCart();
      navigate('/');
    }
  };
  
  const handleGoBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    } else {
      navigate(-1);
    }
  };
  
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Finalizar Pedido</h1>
          <div className="flex items-center mb-6">
            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${activeStep >= 1 ? 'bg-db-green text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <div className={`h-1 w-12 ${activeStep >= 2 ? 'bg-db-green' : 'bg-gray-200'} mx-2`}></div>
            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${activeStep >= 2 ? 'bg-db-green text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <div className={`h-1 w-12 ${activeStep >= 3 ? 'bg-db-green' : 'bg-gray-200'} mx-2`}></div>
            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${activeStep >= 3 ? 'bg-db-green text-white' : 'bg-gray-200'}`}>
              3
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {activeStep === 1 && (
              <div className="bg-white p-6 rounded-lg shadow-md scroll-animation">
                <h2 className="text-xl font-bold mb-4">Endereço de Entrega</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" placeholder="Seu nome completo" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input id="cep" placeholder="00000-000" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" placeholder="Rua, Avenida, etc." />
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-1">
                      <Label htmlFor="number">Número</Label>
                      <Input id="number" placeholder="123" />
                    </div>
                    <div className="sm:col-span-3">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input id="complement" placeholder="Apto, Bloco, etc." />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input id="neighborhood" placeholder="Seu bairro" />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" placeholder="Sua cidade" />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Input id="state" placeholder="UF" />
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h3 className="font-medium mb-4">Método de recebimento</h3>
                <RadioGroup 
                  value={deliveryMethod} 
                  onValueChange={setDeliveryMethod}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className={`flex items-start p-4 border rounded-lg ${deliveryMethod === 'delivery' ? 'border-db-green bg-db-green/5' : 'border-gray-200'}`}>
                    <RadioGroupItem 
                      value="delivery" 
                      id="delivery" 
                      className="mt-1"
                    />
                    <Label htmlFor="delivery" className="ml-3 cursor-pointer">
                      <div className="flex items-center mb-1">
                        <Truck className="h-4 w-4 mr-2" />
                        <span className="font-medium">Entrega em domicílio</span>
                      </div>
                      <p className="text-sm text-gray-600">Receba o pedido no endereço informado</p>
                    </Label>
                  </div>
                  
                  <div className={`flex items-start p-4 border rounded-lg ${deliveryMethod === 'pickup' ? 'border-db-green bg-db-green/5' : 'border-gray-200'}`}>
                    <RadioGroupItem 
                      value="pickup" 
                      id="pickup" 
                      className="mt-1"
                    />
                    <Label htmlFor="pickup" className="ml-3 cursor-pointer">
                      <div className="flex items-center mb-1">
                        <Store className="h-4 w-4 mr-2" />
                        <span className="font-medium">Retirar na loja</span>
                      </div>
                      <p className="text-sm text-gray-600">Retire seu pedido em uma de nossas lojas</p>
                    </Label>
                  </div>
                </RadioGroup>
                
                {deliveryMethod === 'pickup' && (
                  <div className="mt-4">
                    <Label htmlFor="store" className="mb-2 block">Selecione uma loja</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 cursor-pointer hover:border-db-green">
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 mr-2 text-db-green" />
                          <span className="font-medium">Loja Centro</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Av. Rio Branco, 156 - Centro</p>
                        <p className="text-sm text-gray-600">Rio de Janeiro - RJ</p>
                      </div>
                      
                      <div className="border rounded-lg p-4 cursor-pointer hover:border-db-green">
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 mr-2 text-db-green" />
                          <span className="font-medium">Loja Copacabana</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Av. N. S. de Copacabana, 680</p>
                        <p className="text-sm text-gray-600">Rio de Janeiro - RJ</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeStep === 2 && (
              <div className="bg-white p-6 rounded-lg shadow-md scroll-animation">
                <h2 className="text-xl font-bold mb-4">Forma de Pagamento</h2>
                
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className={`flex items-start p-4 border rounded-lg ${paymentMethod === 'credit' ? 'border-db-green bg-db-green/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="credit" id="credit" className="mt-1" />
                    <Label htmlFor="credit" className="ml-3 cursor-pointer w-full">
                      <div className="flex items-center mb-1">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span className="font-medium">Cartão de Crédito</span>
                      </div>
                      
                      {paymentMethod === 'credit' && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor="cardName">Nome no cartão</Label>
                            <Input id="cardName" placeholder="Nome como aparece no cartão" />
                          </div>
                          
                          <div>
                            <Label htmlFor="cardNumber">Número do cartão</Label>
                            <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Data de validade</Label>
                              <Input id="expiryDate" placeholder="MM/AA" />
                            </div>
                            <div>
                              <Label htmlFor="cvv">Código de segurança</Label>
                              <Input id="cvv" placeholder="CVV" />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="installments">Parcelas</Label>
                            <select 
                              id="installments"
                              className="w-full border rounded-md h-10 px-3"
                            >
                              <option value="1">1x de R$ {total.toFixed(2)} sem juros</option>
                              <option value="2">2x de R$ {(total / 2).toFixed(2)} sem juros</option>
                              <option value="3">3x de R$ {(total / 3).toFixed(2)} sem juros</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </Label>
                  </div>
                  
                  <div className={`flex items-start p-4 border rounded-lg ${paymentMethod === 'pix' ? 'border-db-green bg-db-green/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="pix" id="pix" className="mt-1" />
                    <Label htmlFor="pix" className="ml-3 cursor-pointer w-full">
                      <div className="flex items-center mb-1">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.2 17L11.6 12.4M11.6 12.4L7 7.8M11.6 12.4L16.2 7.8M11.6 12.4L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-medium">Pix</span>
                      </div>
                      
                      {paymentMethod === 'pix' && (
                        <div className="mt-4 flex flex-col items-center">
                          <div className="bg-gray-100 p-4 rounded-lg mb-4">
                            <div className="w-48 h-48 bg-white flex items-center justify-center">
                              <p className="text-center text-gray-500">QR Code PIX</p>
                            </div>
                          </div>
                          
                          <div className="w-full mb-4">
                            <Label htmlFor="pixCode" className="mb-2 block">Código PIX</Label>
                            <div className="flex">
                              <Input id="pixCode" value="123e4567-e89b-12d3-a456-426655440000" readOnly className="flex-1" />
                              <Button variant="outline" className="ml-2">Copiar</Button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 text-center">
                            Realize o pagamento em até 30 minutos para garantir seu pedido.
                          </p>
                        </div>
                      )}
                    </Label>
                  </div>
                  
                  <div className={`flex items-start p-4 border rounded-lg ${paymentMethod === 'boleto' ? 'border-db-green bg-db-green/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="boleto" id="boleto" className="mt-1" />
                    <Label htmlFor="boleto" className="ml-3 cursor-pointer w-full">
                      <div className="flex items-center mb-1">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 7H5M9 7H7M11 7H13M17 7H15M21 7H19M5 7V17M9 7V17M13 7V17M17 7V17M21 7V17M3 17H21M3 11H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-medium">Boleto Bancário</span>
                      </div>
                      
                      {paymentMethod === 'boleto' && (
                        <div className="mt-4 text-center">
                          <p className="text-sm text-gray-600 mb-4">
                            O boleto será gerado após a confirmação do pedido e tem vencimento em 3 dias úteis.
                          </p>
                          <Button variant="outline">Gerar Boleto</Button>
                        </div>
                      )}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            {activeStep === 3 && (
              <div className="bg-white p-6 rounded-lg shadow-md scroll-animation">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-16 w-16 bg-db-green/10 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-db-green" />
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mb-4 text-center">Confirmar Pedido</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Endereço de entrega</h3>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-db-green mt-0.5" />
                      <div>
                        <p className="font-medium">Avenida Rio Branco, 123</p>
                        <p className="text-sm text-gray-600">Apartamento 101 - Centro</p>
                        <p className="text-sm text-gray-600">Rio de Janeiro - RJ, 20040-009</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Método de pagamento</h3>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-db-green" />
                      <p>Cartão de crédito (final 1234)</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Previsão de entrega</h3>
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-2 text-db-green" />
                      <p>Em até 1 hora</p>
                    </div>
                  </div>
                  
                  {paymentMethod === 'credit' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-4">Digite o código enviado para seu celular</h3>
                      <div className="flex justify-center">
                        <InputOTP maxLength={6} value={cardCode} onChange={setCardCode}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={handleGoBack}
              >
                {activeStep === 1 ? 'Voltar ao carrinho' : 'Voltar'}
              </Button>
              
              <Button 
                onClick={handleProceed}
              >
                {activeStep < 3 ? 'Continuar' : 'Finalizar compra'}
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                        <p className="font-medium">
                          {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span>Grátis</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
