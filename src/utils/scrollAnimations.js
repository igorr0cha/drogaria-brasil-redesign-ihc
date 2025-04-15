
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
