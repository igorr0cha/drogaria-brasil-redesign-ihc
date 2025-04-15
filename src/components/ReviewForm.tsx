
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  productId: string;
  onReviewSubmit: (review: any) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoggedIn] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast({
        title: "É necessário fazer login",
        description: "Para avaliar produtos, você precisa estar logado.",
        variant: "destructive",
      });
      return;
    }
    
    if (rating === 0) {
      toast({
        title: "Avaliação incompleta",
        description: "Por favor, selecione uma classificação de estrelas.",
        variant: "destructive",
      });
      return;
    }
    
    const review = {
      productId,
      rating,
      comment,
      date: new Date().toISOString(),
      user: {
        name: "Usuário Logado",
        avatar: "https://i.pravatar.cc/150?img=3"
      }
    };
    
    onReviewSubmit(review);
    setRating(0);
    setComment('');
    
    toast({
      title: "Avaliação enviada",
      description: "Sua avaliação foi enviada com sucesso. Obrigado pelo feedback!",
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Sua avaliação</h3>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-2xl mr-1 focus:outline-none"
            >
              <Star 
                className={`h-6 w-6 ${
                  star <= (hoverRating || rating) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-gray-600">
            {rating > 0 ? `${rating} de 5 estrelas` : "Selecione uma classificação"}
          </span>
        </div>
      </div>
      
      <div>
        <label htmlFor="comment" className="block font-medium mb-2">
          Seu comentário (opcional)
        </label>
        <Textarea
          id="comment"
          placeholder="Compartilhe sua experiência com o produto..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>
      
      <Button type="submit">
        Enviar avaliação
      </Button>
    </form>
  );
};

export default ReviewForm;
