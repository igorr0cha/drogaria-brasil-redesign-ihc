
import React, { useState } from 'react';
import { Star, MessageSquare, User, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
  likes: number;
  isLiked?: boolean;
  product?: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Maria Silva",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "10/04/2025",
    rating: 5,
    comment: "Excelente atendimento! Funcionários muito gentis e prestativos. A entrega foi super rápida, chegou bem antes do previsto.",
    likes: 12
  },
  {
    id: "2",
    name: "João Oliveira",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "05/04/2025",
    rating: 4,
    comment: "Ótima farmácia, preços justos e produtos de qualidade. Estão sempre com boas promoções.",
    likes: 8
  },
  {
    id: "3",
    name: "Ana Paula Costa",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    date: "01/04/2025",
    rating: 5,
    comment: "Sempre compro meus medicamentos aqui. O programa de fidelidade é ótimo e o app é muito prático para fazer pedidos.",
    likes: 15,
    product: "Dipirona 500mg"
  },
  {
    id: "4",
    name: "Carlos Eduardo",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    date: "28/03/2025",
    rating: 4,
    comment: "Farmácia bem organizada, fácil de encontrar os produtos. O único ponto negativo é que às vezes demora um pouco na fila do caixa.",
    likes: 3
  },
  {
    id: "5",
    name: "Fernanda Gomes",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    date: "20/03/2025",
    rating: 5,
    comment: "Atendimento farmacêutico de alta qualidade! O farmacêutico tirou todas minhas dúvidas sobre a medicação com muita paciência.",
    likes: 22,
    product: "Vitamina C - Efervescente"
  }
];

const ReviewSection: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('comments');
  const [userReviews, setUserReviews] = useState<Review[]>(reviews);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    product: ''
  });
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleRatingChange = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.comment.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, escreva um comentário para sua avaliação.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulando adicionar uma nova review
    const newReviewObject: Review = {
      id: `${userReviews.length + 1}`,
      name: "Você",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      date: new Date().toLocaleDateString('pt-BR'),
      rating: newReview.rating,
      comment: newReview.comment,
      likes: 0,
      product: newReview.product || undefined,
      isLiked: false
    };
    
    setUserReviews([newReviewObject, ...userReviews]);
    setNewReview({
      rating: 5,
      comment: '',
      product: ''
    });
    
    toast({
      title: "Avaliação enviada com sucesso!",
      description: "Obrigado por compartilhar sua opinião.",
      variant: "default"
    });
  };
  
  const handleLikeReview = (reviewId: string) => {
    setUserReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        if (review.isLiked) {
          return { ...review, likes: review.likes - 1, isLiked: false };
        } else {
          return { ...review, likes: review.likes + 1, isLiked: true };
        }
      }
      return review;
    }));
  };
  
  const renderStars = (rating: number, interactive = false) => {
    return Array(5).fill(0).map((_, index) => (
      <button 
        key={index}
        type={interactive ? "button" : undefined}
        disabled={!interactive}
        onClick={interactive ? () => handleRatingChange(index + 1) : undefined}
        className={`${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-transform`}
      >
        <Star 
          className={`h-5 w-5 ${index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'}`} 
        />
      </button>
    ));
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 scroll-animation">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Avaliações dos <span className="text-db-green">Clientes</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veja o que nossos clientes dizem sobre nós e compartilhe também a sua experiência com a Drogarias Brasil.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 scroll-animation">
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'comments' 
                    ? 'text-db-green border-b-2 border-db-green' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => handleTabChange('comments')}
              >
                <MessageSquare className="h-5 w-5 inline-block mr-2" />
                Ver Avaliações
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'write' 
                    ? 'text-db-green border-b-2 border-db-green' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => handleTabChange('write')}
              >
                <Star className="h-5 w-5 inline-block mr-2" />
                Avaliar
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'comments' ? (
                <div className="space-y-6">
                  {userReviews.length > 0 ? (
                    userReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                        <div className="flex items-start">
                          <img 
                            src={review.avatar} 
                            alt={review.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{review.name}</div>
                                <div className="flex items-center mt-1">
                                  <div className="flex mr-2">
                                    {renderStars(review.rating)}
                                  </div>
                                  <div className="text-sm text-gray-500">{review.date}</div>
                                </div>
                              </div>
                              
                              {review.product && (
                                <div className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                  {review.product}
                                </div>
                              )}
                            </div>
                            
                            <p className="mt-3 text-gray-700">{review.comment}</p>
                            
                            <div className="mt-3 flex items-center">
                              <button 
                                onClick={() => handleLikeReview(review.id)}
                                className="flex items-center text-gray-500 hover:text-db-green"
                              >
                                <ThumbsUp className={`h-4 w-4 mr-1 ${review.isLiked ? 'fill-db-green text-db-green' : ''}`} />
                                <span className="text-sm">{review.likes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Ainda não há avaliações. Seja o primeiro a avaliar!
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Sua nota</label>
                    <div className="flex">
                      {renderStars(newReview.rating, true)}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="product" className="block mb-2 font-medium text-gray-700">
                      Produto (opcional)
                    </label>
                    <input
                      type="text"
                      id="product"
                      name="product"
                      value={newReview.product}
                      onChange={handleTextChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                      placeholder="Nome do produto (se aplicável)"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="comment" className="block mb-2 font-medium text-gray-700">
                      Seu comentário
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={newReview.comment}
                      onChange={handleTextChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-db-green focus:border-transparent"
                      placeholder="Compartilhe sua experiência..."
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn-primary">
                    Enviar Avaliação
                  </button>
                </form>
              )}
            </div>
          </div>
          
          <div className="text-center scroll-animation">
            <p className="text-sm text-gray-500">
              Todas as avaliações são verificadas por nossa equipe antes de serem publicadas.
              <br />
              Leia nossos <a href="/termos" className="text-db-blue hover:underline">Termos e Condições</a> para saber mais sobre nossa política de avaliações.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
