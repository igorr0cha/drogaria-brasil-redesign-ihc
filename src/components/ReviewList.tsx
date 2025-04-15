
import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  comment: string;
  date: string;
  user: {
    name: string;
    avatar: string;
  };
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">Este produto ainda não possui avaliações.</p>
        <p className="text-gray-500">Seja o primeiro a avaliar!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6">
          <div className="flex items-center mb-2">
            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
              <img
                src={review.user.avatar}
                alt={review.user.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{review.user.name}</h4>
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(review.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
          {review.comment && (
            <p className="text-gray-700 mt-2">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
