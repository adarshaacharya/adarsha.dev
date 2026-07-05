"use client";

import * as React from "react";
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MIN_SCALE = 0.4;
const MAX_SCALE = 3;
const ZOOM_STEP = 0.2;

type DiagramCanvasProps = {
  svg: string;
  className?: string;
  viewportClassName?: string;
  hint?: string;
  onFullscreen?: () => void;
  fullscreen?: boolean;
};

export function DiagramCanvas({
  svg,
  className,
  viewportClassName,
  hint = "Drag to pan · Scroll to zoom",
  onFullscreen,
  fullscreen = false,
}: DiagramCanvasProps) {
  const [scale, setScale] = React.useState(1);
  const [translate, setTranslate] = React.useState({ x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);
  const dragStart = React.useRef({ x: 0, y: 0, translateX: 0, translateY: 0 });

  const clampScale = (value: number) =>
    Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

  const resetView = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  const zoomBy = (delta: number) => {
    setScale((current) => clampScale(Number((current + delta).toFixed(2))));
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      translateX: translate.x,
      translateY: translate.y,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setTranslate({
      x: dragStart.current.translateX + (event.clientX - dragStart.current.x),
      y: dragStart.current.translateY + (event.clientY - dragStart.current.y),
    });
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    zoomBy(event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="absolute right-2 top-2 z-10 flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 bg-background/90 backdrop-blur-sm"
          onClick={() => zoomBy(-ZOOM_STEP)}
          aria-label="Zoom out"
        >
          <ZoomOut className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 bg-background/90 backdrop-blur-sm"
          onClick={() => zoomBy(ZOOM_STEP)}
          aria-label="Zoom in"
        >
          <ZoomIn className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 bg-background/90 backdrop-blur-sm"
          onClick={resetView}
          aria-label="Reset view"
        >
          <RotateCcw className="size-4" />
        </Button>
        {onFullscreen ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8 bg-background/90 backdrop-blur-sm"
            onClick={onFullscreen}
            aria-label={fullscreen ? "Exit fullscreen" : "Open fullscreen"}
          >
            {fullscreen ? (
              <Minimize2 className="size-4" />
            ) : (
              <Maximize2 className="size-4" />
            )}
          </Button>
        ) : null}
      </div>

      <div
        className={cn(
          "relative min-h-[280px] cursor-grab overflow-hidden bg-background/40 active:cursor-grabbing",
          viewportClassName,
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        <div
          className="flex min-h-[280px] w-full items-center justify-center p-6 transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: "center center",
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      <p className="border-t border-border/60 px-4 py-2 text-center text-xs text-muted-foreground">
        {hint}
      </p>
    </div>
  );
}
