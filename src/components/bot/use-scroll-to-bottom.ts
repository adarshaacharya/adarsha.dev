import { useEffect, useRef, type RefObject } from "react";

export function useScrollToBottom<T extends HTMLElement>(): [
  RefObject<T | null>,
  RefObject<T | null>,
] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;

    if (container && end) {
      // Check if user is near the bottom (within 100px)
      const isNearBottom = () => {
        const threshold = 100;
        const position = container.scrollTop + container.clientHeight;
        const height = container.scrollHeight;
        return position >= height - threshold;
      };

      const observer = new MutationObserver(() => {
        // Only auto-scroll if user is already near the bottom
        if (isNearBottom()) {
          end.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
      });

      // Initial scroll to bottom when component mounts
      end.scrollIntoView({ behavior: "instant", block: "end" });

      return () => observer.disconnect();
    }
  }, []);

  return [containerRef, endRef];
}
