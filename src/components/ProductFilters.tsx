
import React, { useState } from 'react';
import { CheckSquare, Square, ChevronDown, ChevronUp } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b pb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 font-medium text-left"
      >
        {title}
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ label, checked, onChange, count }) => {
  return (
    <div className="flex items-center justify-between py-1.5">
      <button 
        onClick={onChange}
        className="flex items-center"
      >
        {checked ? (
          <CheckSquare className="h-4 w-4 text-db-green mr-2" />
        ) : (
          <Square className="h-4 w-4 text-gray-400 mr-2" />
        )}
        <span>{label}</span>
      </button>
      {count !== undefined && (
        <span className="text-sm text-gray-500">({count})</span>
      )}
    </div>
  );
};

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [categoryFilters, setCategoryFilters] = useState({
    analgesicos: false,
    antigripais: false,
    vitaminasSuplementos: false,
    higienePessoal: false,
    dermocosmeticos: false,
  });
  
  const [typeFilters, setTypeFilters] = useState({
    generico: false,
    similar: false,
    referencia: false,
  });
  
  const [brandFilters, setBrandFilters] = useState({
    medbrasil: false,
    farmabrasil: false,
    vitabrasil: false,
    carebrasil: false,
    cleanbrasil: false,
  });
  
  const handleCategoryChange = (category: keyof typeof categoryFilters) => {
    const newFilters = {
      ...categoryFilters,
      [category]: !categoryFilters[category]
    };
    setCategoryFilters(newFilters);
    onFilterChange({ ...filters, categories: getSelectedCategories(newFilters) });
  };
  
  const handleTypeChange = (type: keyof typeof typeFilters) => {
    const newFilters = {
      ...typeFilters,
      [type]: !typeFilters[type]
    };
    setTypeFilters(newFilters);
    onFilterChange({ ...filters, types: getSelectedTypes(newFilters) });
  };
  
  const handleBrandChange = (brand: keyof typeof brandFilters) => {
    const newFilters = {
      ...brandFilters,
      [brand]: !brandFilters[brand]
    };
    setBrandFilters(newFilters);
    onFilterChange({ ...filters, brands: getSelectedBrands(newFilters) });
  };
  
  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
    onFilterChange({ ...filters, priceRange: newRange });
  };
  
  const getSelectedCategories = (categories = categoryFilters) => {
    return Object.entries(categories)
      .filter(([_, isSelected]) => isSelected)
      .map(([key, _]) => key);
  };
  
  const getSelectedTypes = (types = typeFilters) => {
    return Object.entries(types)
      .filter(([_, isSelected]) => isSelected)
      .map(([key, _]) => key);
  };
  
  const getSelectedBrands = (brands = brandFilters) => {
    return Object.entries(brands)
      .filter(([_, isSelected]) => isSelected)
      .map(([key, _]) => key);
  };
  
  const filters = {
    categories: getSelectedCategories(),
    types: getSelectedTypes(),
    brands: getSelectedBrands(),
    priceRange
  };
  
  return (
    <div className="space-y-6">
      <FilterSection title="Categorias" defaultOpen={true}>
        <div className="space-y-1">
          <CheckboxItem 
            label="Analgésicos" 
            checked={categoryFilters.analgesicos}
            onChange={() => handleCategoryChange('analgesicos')}
            count={12}
          />
          <CheckboxItem 
            label="Antigripais" 
            checked={categoryFilters.antigripais}
            onChange={() => handleCategoryChange('antigripais')}
            count={8}
          />
          <CheckboxItem 
            label="Vitaminas e Suplementos" 
            checked={categoryFilters.vitaminasSuplementos}
            onChange={() => handleCategoryChange('vitaminasSuplementos')}
            count={15}
          />
          <CheckboxItem 
            label="Higiene Pessoal" 
            checked={categoryFilters.higienePessoal}
            onChange={() => handleCategoryChange('higienePessoal')}
            count={20}
          />
          <CheckboxItem 
            label="Dermocosméticos" 
            checked={categoryFilters.dermocosmeticos}
            onChange={() => handleCategoryChange('dermocosmeticos')}
            count={17}
          />
        </div>
      </FilterSection>
      
      <FilterSection title="Faixa de Preço">
        <div className="px-1">
          <Slider 
            defaultValue={[priceRange[0], priceRange[1]]} 
            max={100} 
            step={1}
            onValueChange={handlePriceChange}
            className="my-6"
          />
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium">
              {priceRange[0].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <span className="text-sm font-medium">
              {priceRange[1].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>
      </FilterSection>
      
      <FilterSection title="Tipo">
        <div className="space-y-1">
          <CheckboxItem 
            label="Genérico" 
            checked={typeFilters.generico}
            onChange={() => handleTypeChange('generico')}
            count={14}
          />
          <CheckboxItem 
            label="Similar" 
            checked={typeFilters.similar}
            onChange={() => handleTypeChange('similar')}
            count={8}
          />
          <CheckboxItem 
            label="Referência" 
            checked={typeFilters.referencia}
            onChange={() => handleTypeChange('referencia')}
            count={22}
          />
        </div>
      </FilterSection>
      
      <FilterSection title="Marcas">
        <div className="space-y-1">
          <CheckboxItem 
            label="MedBrasil" 
            checked={brandFilters.medbrasil}
            onChange={() => handleBrandChange('medbrasil')}
            count={10}
          />
          <CheckboxItem 
            label="FarmaBrasil" 
            checked={brandFilters.farmabrasil}
            onChange={() => handleBrandChange('farmabrasil')}
            count={7}
          />
          <CheckboxItem 
            label="VitaBrasil" 
            checked={brandFilters.vitabrasil}
            onChange={() => handleBrandChange('vitabrasil')}
            count={5}
          />
          <CheckboxItem 
            label="CareBrasil" 
            checked={brandFilters.carebrasil}
            onChange={() => handleBrandChange('carebrasil')}
            count={8}
          />
          <CheckboxItem 
            label="CleanBrasil" 
            checked={brandFilters.cleanbrasil}
            onChange={() => handleBrandChange('cleanbrasil')}
            count={6}
          />
        </div>
      </FilterSection>
    </div>
  );
};

export default ProductFilters;
