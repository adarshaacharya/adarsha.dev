import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageViewerProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  alt,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 100);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`blur-backdrop ${
        isClosing ? "animate-fade-out" : "animate-fade-in"
      }`}
      onClick={handleOutsideClick}
    >
      <div className="modal-container">
        <div
          ref={modalRef}
          className={`modal-content p-1 ${
            isClosing ? "animate-scale-out" : "animate-scale-in"
          }`}
        >
          <button
            onClick={handleClose}
            className="absolute right-2 top-2 z-10 rounded-full bg-black/20 p-2  backdrop-blur-md transition-all hover:bg-black/30"
            aria-label="Close"
          >
            <X size={15} />
          </button>
          <div className="relative max-h-[80vh] w-auto">
            <Image
              src={src}
              alt={alt}
              width={0}
              height={0}
              unoptimized
              className="h-auto max-h-[80vh] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
