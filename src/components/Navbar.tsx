
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { openCart, cartItems } = useCart();
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSubmenuToggle = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const navItems = [
    {
      name: 'Home',
      path: '/',
      hasSubmenu: false
    },
    {
      name: 'Medicamentos',
      path: '/medicamentos',
      hasSubmenu: true,
      submenu: [
        { name: 'Analgésicos', path: '/medicamentos/analgesicos' },
        { name: 'Antigripais', path: '/medicamentos/antigripais' },
        { name: 'Genéricos', path: '/medicamentos/genericos' },
        { name: 'Controlados', path: '/medicamentos/controlados' },
      ]
    },
    {
      name: 'Cuidados Pessoais',
      path: '/cuidados-pessoais',
      hasSubmenu: true,
      submenu: [
        { name: 'Higiene', path: '/cuidados-pessoais/higiene' },
        { name: 'Dermocosméticos', path: '/cuidados-pessoais/dermocosmeticos' },
        { name: 'Infantil', path: '/cuidados-pessoais/infantil' },
        { name: 'Cabelos', path: '/cuidados-pessoais/cabelos' },
      ]
    },
    {
      name: 'Promoções',
      path: '/promocoes',
      hasSubmenu: false
    },
    {
      name: 'Atendimento',
      path: '/atendimento',
      hasSubmenu: false
    },
    {
      name: 'Sobre',
      path: '/sobre',
      hasSubmenu: false
    }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="z-50">
            <Logo />
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.name} className="relative group">
                  <Link 
                    to={item.path} 
                    className="nav-link py-2 px-1"
                  >
                    {item.name}
                  </Link>
                  
                  {item.hasSubmenu && (
                    <div className="absolute left-0 top-full bg-white shadow-lg rounded-lg p-4 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <ul className="space-y-2">
                        {item.submenu?.map((subItem) => (
                          <li key={subItem.name}>
                            <Link 
                              to={subItem.path} 
                              className="block px-2 py-1 rounded hover:bg-db-green/10 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Search, Cart, User icons */}
          <div className="flex items-center space-x-4">
            <Link to="/busca" className="hover:text-db-green transition-colors" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Link>
            <button 
              onClick={openCart} 
              className="hover:text-db-green transition-colors relative"
              aria-label="Carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-db-yellow text-db-dark rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <Link to="/login" className="hover:text-db-green transition-colors" aria-label="Minha conta">
              <User className="h-5 w-5" />
            </Link>
            <button 
              className="lg:hidden hover:text-db-green transition-colors" 
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-40 overflow-y-auto lg:hidden transition-transform transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="container mx-auto px-4 pt-20 pb-8">
          <nav>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name} className="border-b border-gray-100 pb-2">
                  <div className="flex justify-between items-center">
                    <Link 
                      to={item.path} 
                      className="text-lg font-medium py-2"
                      onClick={() => !item.hasSubmenu && toggleMobileMenu()}
                    >
                      {item.name}
                    </Link>
                    {item.hasSubmenu && (
                      <button 
                        onClick={() => handleSubmenuToggle(item.name)}
                        aria-label={`Expandir ${item.name}`}
                        className="p-2"
                      >
                        {activeSubmenu === item.name ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <span className="text-xl">+</span>
                        )}
                      </button>
                    )}
                  </div>
                  
                  {item.hasSubmenu && activeSubmenu === item.name && (
                    <ul className="pl-4 mt-2 space-y-2">
                      {item.submenu?.map((subItem) => (
                        <li key={subItem.name}>
                          <Link 
                            to={subItem.path} 
                            className="block py-1"
                            onClick={toggleMobileMenu}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="pt-4">
                <Link 
                  to="/login" 
                  className="block py-2 px-4 bg-db-green text-white rounded-lg text-center"
                  onClick={toggleMobileMenu}
                >
                  Login / Cadastro
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
