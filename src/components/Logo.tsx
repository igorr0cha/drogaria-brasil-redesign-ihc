
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="h-8 w-8 rounded-full bg-db-green flex items-center justify-center">
          <div className="h-5 w-5 bg-white rounded-full flex items-center justify-center">
            <div className="h-3 w-[1px] bg-db-green absolute transform -rotate-45"></div>
            <div className="h-3 w-[1px] bg-db-green absolute transform rotate-45"></div>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-db-yellow rounded-full"></div>
        <div className="absolute -bottom-1 -left-1 h-3 w-3 bg-db-blue rounded-full"></div>
      </div>
      <div className="font-montserrat font-bold text-xl text-db-dark">
        <span className="text-db-green">Drogarias</span>
        <span className="text-db-blue">Brasil</span>
      </div>
    </div>
  );
};

export default Logo;
