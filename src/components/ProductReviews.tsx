
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  // Mock reviews data - in a real app, this would come from an API
  const [reviews, setReviews] = useState([
    {
      id: '1',
      rating: 5,
      comment: 'Excelente produto! Atendeu todas as minhas expectativas. Recomendo muito.',
      date: '2025-03-10T10:00:00Z',
      user: {
        name: 'Maria Silva',
        avatar: 'https://i.pravatar.cc/150?img=1'
      }
    },
    {
      id: '2',
      rating: 4,
      comment: 'Muito bom, mas a embalagem poderia ser melhor.',
      date: '2025-02-15T14:30:00Z',
      user: {
        name: 'João Pereira',
        avatar: 'https://i.pravatar.cc/150?img=2'
      }
    },
    {
      id: '3',
      rating: 5,
      comment: 'Comprei para minha mãe e ela adorou! Entrega rápida.',
      date: '2025-01-20T09:45:00Z',
      user: {
        name: 'Ana Souza',
        avatar: 'https://i.pravatar.cc/150?img=5'
      }
    }
  ]);
  
  const handleReviewSubmit = (newReview: any) => {
    setReviews([
      {
        ...newReview,
        id: String(reviews.length + 1)
      },
      ...reviews
    ]);
  };
  
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };
  
  const averageRating = calculateAverageRating();
  
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 scroll-animation">
      <h2 className="text-2xl font-bold mb-6">Avaliações</h2>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
          <div className="flex items-center mb-2 md:mb-0 md:mr-4">
            {renderRatingStars(Math.round(averageRating))}
            <span className="ml-2 text-xl font-semibold">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-600">
            Baseado em {reviews.length} avaliações
          </span>
        </div>
        
        <div className="flex space-x-2">
          <div className="text-sm text-gray-500">
            <div className="flex items-center mb-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="ml-2 w-24 bg-gray-200 rounded-full h-1.5">
                <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${reviews.filter(r => r.rating === 5).length / reviews.length * 100}%` }}></div>
              </div>
              <span className="ml-2 w-5 text-right">{reviews.filter(r => r.rating === 5).length}</span>
            </div>
            
            <div className="flex items-center mb-1">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                ))}
                <Star className="h-3 w-3 text-gray-300" />
              </div>
              <div className="ml-2 w-24 bg-gray-200 rounded-full h-1.5">
                <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${reviews.filter(r => r.rating === 4).length / reviews.length * 100}%` }}></div>
              </div>
              <span className="ml-2 w-5 text-right">{reviews.filter(r => r.rating === 4).length}</span>
            </div>
            
            <div className="flex items-center mb-1">
              <div className="flex">
                {[1, 2, 3].map((star) => (
                  <Star key={star} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                ))}
                {[4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 text-gray-300" />
                ))}
              </div>
              <div className="ml-2 w-24 bg-gray-200 rounded-full h-1.5">
                <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${reviews.filter(r => r.rating === 3).length / reviews.length * 100}%` }}></div>
              </div>
              <span className="ml-2 w-5 text-right">{reviews.filter(r => r.rating === 3).length}</span>
            </div>
            
            <div className="flex items-center mb-1">
              <div className="flex">
                {[1, 2].map((star) => (
                  <Star key={star} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                ))}
                {[3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 text-gray-300" />
                ))}
              </div>
              <div className="ml-2 w-24 bg-gray-200 rounded-full h-1.5">
                <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${reviews.filter(r => r.rating === 2).length / reviews.length * 100}%` }}></div>
              </div>
              <span className="ml-2 w-5 text-right">{reviews.filter(r => r.rating === 2).length}</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                {[2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 text-gray-300" />
                ))}
              </div>
              <div className="ml-2 w-24 bg-gray-200 rounded-full h-1.5">
                <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${reviews.filter(r => r.rating === 1).length / reviews.length * 100}%` }}></div>
              </div>
              <span className="ml-2 w-5 text-right">{reviews.filter(r => r.rating === 1).length}</span>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Todas as avaliações</TabsTrigger>
          <TabsTrigger value="add">Adicionar avaliação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-2">
          <ReviewList reviews={reviews} />
        </TabsContent>
        
        <TabsContent value="add" className="pt-2">
          <ReviewForm productId={productId} onReviewSubmit={handleReviewSubmit} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductReviews;
