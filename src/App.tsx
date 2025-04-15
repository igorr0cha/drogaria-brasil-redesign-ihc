
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Layouts
import Layout from "./layouts/Layout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";

// Components
import Cart from "./components/Cart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Produtos */}
              <Route path="/medicamentos" element={<ProductsPage />} />
              <Route path="/medicamentos/:subcategory" element={<ProductsPage />} />
              <Route path="/cuidados-pessoais" element={<ProductsPage />} />
              <Route path="/cuidados-pessoais/:subcategory" element={<ProductsPage />} />
              <Route path="/promocoes" element={<ProductsPage />} />
              <Route path="/produto/:id" element={<ProductDetailPage />} />
              <Route path="/busca" element={<ProductsPage />} />
              
              {/* Páginas Institucionais */}
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/atendimento" element={<ContactPage />} />
              
              {/* Autenticação */}
              <Route path="/login" element={<AuthPage type="login" />} />
              <Route path="/cadastro" element={<AuthPage type="register" />} />
              
              {/* Página 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          
          <Cart />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
