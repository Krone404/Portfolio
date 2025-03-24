import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

interface DraggableIconProps {
  darkMode?: boolean;
}

function DraggableIcon({ darkMode = false }: DraggableIconProps) {
  const iconRef = useRef<HTMLImageElement>(null);
  const maxRadius = 15;

  useEffect(() => {
    if (!iconRef.current) return;
    Draggable.create(iconRef.current, {
      type: "x,y",
      onDrag: function () {
        const dx = this.x;
        const dy = this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > maxRadius) {
          const angle = Math.atan2(dy, dx);
          gsap.set(this.target, {
            x: Math.cos(angle) * maxRadius,
            y: Math.sin(angle) * maxRadius,
          });
        }
      },
      onRelease: function () {
        gsap.to(iconRef.current, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      },
    });
  }, []);

  // Choose icon based on darkMode prop
  const iconSrc = darkMode
    ? "/images/icon-darkmode.png"
    : "/images/icon-lightmode.png";

  return (
    <div className="relative navbar-brand">
      <img
        ref={iconRef}
        src={iconSrc}
        alt="Draggable Favicon"
        className="draggable-icon cursor-pointer select-none"
      />
    </div>
  );
}

export default DraggableIcon;
