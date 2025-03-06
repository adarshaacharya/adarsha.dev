"use client";

import React, { useState } from "react";
import { ImageViewer } from "./image-viewer";
import Image from "next/image";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt,
  className = "",
  width = 0,
  height = 0,
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div className="overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`img-zoomable transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          onClick={() => setIsViewerOpen(true)}
          onLoad={() => setIsLoaded(true)}
          unoptimized
        />
      </div>

      <ImageViewer
        src={src}
        alt={alt}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </>
  );
};
