import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

function DraggableIcon() {
  const iconRef = useRef(null);
  const maxRadius = 15;

  useEffect(() => {
    Draggable.create(iconRef.current, {
      type: "x,y",
      onDrag: function () {
        let dx = this.x;
        let dy = this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > maxRadius) {
          let angle = Math.atan2(dy, dx);
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

  return (
    <div className="relative navbar-brand">
      <img
        ref={iconRef}
        src="/favicon/48x48.svg"
        alt="Draggable Favicon"
        className="w-12 h-12 cursor-pointer select-none"
      />
    </div>
  );
}

export default DraggableIcon;
