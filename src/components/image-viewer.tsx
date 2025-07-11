import React, { useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ImageViewerProps {
  src: string;
  alt: string;
  isOpen: boolean;
  setIsViewerOpen: (isOpen: boolean) => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  alt,
  isOpen,
  setIsViewerOpen,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsViewerOpen}>
      <DialogTrigger asChild>
        <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            unoptimized
            className="h-auto max-h-[90vh] w-auto max-w-full object-contain rounded-lg cursor-pointer"
          />
      </DialogTrigger>
      <DialogContent
        className="max-w-7xl border-0 bg-background p-0 shadow-none"
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <div className="relative flex items-center justify-center">
          <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            unoptimized
            className="h-auto max-h-[90vh] w-auto max-w-full object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
