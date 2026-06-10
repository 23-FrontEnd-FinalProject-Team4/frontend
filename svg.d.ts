declare module '*.svg?react' {
  import * as React from 'react';

  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  export default ReactComponent;
}

declare module '*.svg' {
  import * as React from 'react';

  const SVG: React.FC<React.SVGProps<SVGSVGElement>> & { src?: string };

  export default SVG;
}

declare module '*.png' {
  const src: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };

  export default src;
}
