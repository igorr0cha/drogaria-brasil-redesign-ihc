
import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { isOpen, closeCart, cartItems, removeFromCart, updateQuantity, total } = useCart();
  
  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  return (
    <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Seu Carrinho</h2>
            <button 
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 p-8">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-lg font-medium mb-2">Seu carrinho está vazio</p>
              <p className="text-gray-500 text-center mb-6">
                Adicione produtos para continuar suas compras
              </p>
              <button 
                onClick={closeCart}
                className="btn-primary"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center border rounded-lg p-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium line-clamp-2">{item.name}</h4>
                        <div className="text-db-green font-semibold mt-1">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end ml-4 space-y-2">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remover"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <div className="flex items-center border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-gray-100"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Subtotal:</span>
                  <span className="font-semibold text-db-green">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Frete e descontos serão calculados na finalização da compra
                </p>
                <Link
                  to="/checkout"
                  className="btn-primary w-full flex justify-center items-center"
                  onClick={closeCart}
                >
                  Finalizar Pedido
                </Link>
                <button 
                  onClick={closeCart}
                  className="btn-outline w-full"
                >
                  Continuar Comprando
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
