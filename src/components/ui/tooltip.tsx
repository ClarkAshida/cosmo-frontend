import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  delay?: number;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  delay = 300,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const scrollX =
          window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY =
          window.pageYOffset || document.documentElement.scrollTop;

        let x = rect.left + scrollX + rect.width / 2;
        let y = rect.top + scrollY;

        switch (position) {
          case "top":
            y = rect.top + scrollY - 10;
            break;
          case "bottom":
            y = rect.bottom + scrollY + 10;
            break;
          case "left":
            x = rect.left + scrollX - 10;
            y = rect.top + scrollY + rect.height / 2;
            break;
          case "right":
            x = rect.right + scrollX + 10;
            y = rect.top + scrollY + rect.height / 2;
            break;
        }

        setTooltipPosition({ x, y });
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getTooltipClasses = () => {
    const baseClasses =
      "absolute z-50 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-xl border border-gray-700 backdrop-blur-sm transition-all duration-300 pointer-events-none max-w-xs";
    const positionClasses = {
      top: "-translate-x-1/2 -translate-y-full",
      bottom: "-translate-x-1/2 translate-y-0",
      left: "-translate-y-1/2 -translate-x-full",
      right: "-translate-y-1/2 translate-x-0",
    };

    return `${baseClasses} ${positionClasses[position]} ${
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
    }`;
  };

  const getArrowClasses = () => {
    const baseClasses =
      "absolute w-3 h-3 bg-gradient-to-br from-gray-800 to-gray-900 transform rotate-45 border-gray-700";
    const arrowPositions = {
      top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-r border-b",
      bottom:
        "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-l border-t",
      left: "left-full top-1/2 -translate-y-1/2 -translate-x-1/2 border-r border-t",
      right:
        "right-full top-1/2 -translate-y-1/2 translate-x-1/2 border-l border-b",
    };

    return `${baseClasses} ${arrowPositions[position]}`;
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block cursor-help"
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            className={getTooltipClasses()}
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
          >
            <div className={getArrowClasses()}></div>
            <span className="relative z-10">{content}</span>
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
