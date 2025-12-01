import { useEffect, useRef, useState, type ReactNode } from "react";
import './DropInSection.css'

class DropInSectionProps {
  children?: ReactNode;
}

function DropInSection({ children }: DropInSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1.00);
  const [scale, setScale] = useState(2.00);

  const handleScroll = () => {
    if (elementRef.current) {
      const xy = elementRef.current.getBoundingClientRect();
      const distFromBottom = xy.top - window.innerHeight;
      const newOpacity = Math.max(0.0, Math.min(1.0, 1.0-(distFromBottom + 100)*0.01));
      const newScale = Math.max(0.0, Math.min(1.0, 1.0-(distFromBottom + 100)*0.01));
      setOpacity(newOpacity);
      setScale(newScale);
    }
  }

  useEffect(() => {
    handleScroll()

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return <div ref={elementRef}>
    <div className="dropInSection" style={{ opacity: opacity, scale: scale }}>
      {children}
    </div>
  </div>
}

export default DropInSection;