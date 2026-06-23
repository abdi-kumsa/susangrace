import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  style,
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the movement
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Move up to 30% of the distance from the center
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const Inner = (
    <motion.div
      style={{ x: springX, y: springY }}
      className="w-full h-full flex items-center justify-center"
    >
      {children}
    </motion.div>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative inline-block ${className}`}
      style={style}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {href ? (
        <a href={href} className="w-full h-full block" onClick={onClick}>
          {Inner}
        </a>
      ) : (
        <button type={type} className="w-full h-full block" onClick={onClick} disabled={disabled}>
          {Inner}
        </button>
      )}
    </motion.div>
  );
}
