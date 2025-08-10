import { useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  onReset: () => void;
}

const BeforeAfterSlider = ({ beforeImage, afterImage, onReset }: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  const downloadAfterImage = () => {
    const link = document.createElement('a');
    link.href = afterImage;
    link.download = 'edited_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="glass-card overflow-hidden">
      <div className="p-4 border-b border-border/20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Before / After Comparison</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" onClick={downloadAfterImage} className="ai-glow">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full h-96 overflow-hidden cursor-col-resize select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <img 
            src={afterImage} 
            alt="After editing" 
            className="w-full h-full object-contain bg-checkered"
            draggable={false}
          />
          <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            After
          </div>
        </div>
        
        {/* Before Image (Overlay) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt="Before editing" 
            className="w-full h-full object-contain"
            style={{ width: `${100 / (sliderPosition / 100)}%` }}
            draggable={false}
          />
          <div className="absolute top-4 left-4 bg-muted/90 text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">
            Before
          </div>
        </div>
        
        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-primary cursor-col-resize group"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full border-2 border-background shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BeforeAfterSlider;