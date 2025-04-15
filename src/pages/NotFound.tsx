
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-db-green">404</h1>
          <div className="h-1 w-16 bg-db-green mx-auto my-4"></div>
          <h2 className="text-3xl font-bold mb-4">Página não encontrada</h2>
          <p className="text-gray-600 mb-8">
            A página que você está procurando pode ter sido removida, teve seu 
            nome alterado ou está temporariamente indisponível.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/" 
            className="btn-primary inline-block"
          >
            Voltar para a página inicial
          </Link>
          
          <div className="mt-6 text-gray-500">
            <p>Ou entre em contato conosco se precisar de ajuda.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
