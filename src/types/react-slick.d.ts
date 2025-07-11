import * as React from 'react';

declare module 'react-slick' {
  export interface Settings {
    dots?: boolean;
    arrows?: boolean;
    autoplay?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    responsive?: Array<{
      breakpoint: number;
      settings: Partial<Settings>;
    }>;
    [key: string]: any;
  }

  const Slider: React.FC<Settings & { children?: React.ReactNode }>;
  export default Slider;
}
