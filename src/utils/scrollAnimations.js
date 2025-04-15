
// Função para inicializar as animações de scroll
export const initScrollAnimations = () => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.scroll-animation');
    
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight * 0.85;
      
      if (elementPosition < screenPosition) {
        element.classList.add('show');
      }
    });
  };
  
  // Executar uma vez ao inicializar
  animateOnScroll();
  
  // Adicionar evento de scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Retornar função para limpar o evento
  return () => {
    window.removeEventListener('scroll', animateOnScroll);
  };
};

// Adiciona estilos CSS necessários para as animações
export const initScrollAnimationsStyles = () => {
  // Verifica se os estilos já foram adicionados
  if (document.getElementById('scroll-animations-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'scroll-animations-styles';
  style.innerHTML = `
    .scroll-animation {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .scroll-animation.show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .scroll-animation-left {
      opacity: 0;
      transform: translateX(-50px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .scroll-animation-left.show {
      opacity: 1;
      transform: translateX(0);
    }
    
    .scroll-animation-right {
      opacity: 0;
      transform: translateX(50px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .scroll-animation-right.show {
      opacity: 1;
      transform: translateX(0);
    }
    
    .scroll-animation-zoom {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .scroll-animation-zoom.show {
      opacity: 1;
      transform: scale(1);
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    
    .pulse-animation {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `;
  document.head.appendChild(style);
};

// Função para inicializar as animações globalmente
export const initGlobalAnimations = () => {
  // Adicionar estilos CSS
  initScrollAnimationsStyles();
  
  // Inicializar animações de scroll
  return initScrollAnimations();
};
