
import { useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface UseCarouselProps {
  loop?: boolean;
  autoplay?: boolean;
  interval?: number;
}

export function useCarousel(props: UseCarouselProps = {}) {
  const { loop = false, autoplay = false, interval = 3000 } = props;
  const [api, setApi] = useState<CarouselApi>();

  const onApiChange = (newApi: CarouselApi) => {
    setApi(newApi);
    
    if (autoplay && newApi) {
      let intervalId: NodeJS.Timeout | null = null;
      
      const startAutoplay = () => {
        intervalId = setInterval(() => {
          if (loop) {
            newApi.scrollNext();
          } else if (!newApi.canScrollNext()) {
            newApi.scrollTo(0);
          } else {
            newApi.scrollNext();
          }
        }, interval);
      };

      startAutoplay();
      
      // Reset interval when manually navigating
      newApi.on("select", () => {
        if (intervalId) clearInterval(intervalId);
        startAutoplay();
      });

      // Cleanup
      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }
  };

  return {
    api,
    setApi: onApiChange,
  };
}
