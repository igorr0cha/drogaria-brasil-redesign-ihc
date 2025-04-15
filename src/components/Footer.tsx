
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-db-dark text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-400 mb-4">
              Há mais de 50 anos cuidando da saúde e bem-estar dos brasileiros com dedicação, qualidade e preços justos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-db-yellow transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-db-yellow transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-db-yellow transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/medicamentos" className="text-gray-400 hover:text-white transition-colors">
                  Medicamentos
                </Link>
              </li>
              <li>
                <Link to="/cuidados-pessoais" className="text-gray-400 hover:text-white transition-colors">
                  Cuidados Pessoais
                </Link>
              </li>
              <li>
                <Link to="/promocoes" className="text-gray-400 hover:text-white transition-colors">
                  Promoções
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/medicamentos/analgesicos" className="text-gray-400 hover:text-white transition-colors">
                  Analgésicos
                </Link>
              </li>
              <li>
                <Link to="/medicamentos/antigripais" className="text-gray-400 hover:text-white transition-colors">
                  Antigripais
                </Link>
              </li>
              <li>
                <Link to="/cuidados-pessoais/dermocosmeticos" className="text-gray-400 hover:text-white transition-colors">
                  Dermocosméticos
                </Link>
              </li>
              <li>
                <Link to="/cuidados-pessoais/higiene" className="text-gray-400 hover:text-white transition-colors">
                  Higiene Pessoal
                </Link>
              </li>
              <li>
                <Link to="/cuidados-pessoais/infantil" className="text-gray-400 hover:text-white transition-colors">
                  Infantil
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-db-yellow" />
                <span className="text-gray-400">Av. Rio Branco, 123 - Centro, Rio de Janeiro - RJ</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-db-yellow" />
                <span className="text-gray-400">(21) 3456-7890</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-db-yellow" />
                <span className="text-gray-400">contato@drogariasbrasil.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Drogarias Brasil. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4">
              <Link to="/termos" className="text-gray-500 text-sm hover:text-white transition-colors">
                Termos de Uso
              </Link>
              <Link to="/privacidade" className="text-gray-500 text-sm hover:text-white transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
