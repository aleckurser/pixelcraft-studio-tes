import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Download, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BackgroundRemovalProps {
  imageFile: File;
  onProcessed: (processedImageUrl: string) => void;
}

const BackgroundRemoval = ({ imageFile, onProcessed }: BackgroundRemovalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const removeBackground = async () => {
    setIsProcessing(true);
    setProgress(0);

    try {
      // Import the background removal function
      const { removeBackground: removeBg, loadImage } = await import("@/lib/background-removal");
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      toast({
        title: "Processing started",
        description: "AI is removing the background...",
      });

      // Load and process the image
      const imageElement = await loadImage(imageFile);
      const processedBlob = await removeBg(imageElement);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Create URL for the processed image
      const url = URL.createObjectURL(processedBlob);
      setProcessedImageUrl(url);
      onProcessed(url);
      
      toast({
        title: "Background removed successfully!",
        description: "Your image is ready for download",
      });
    } catch (error) {
      console.error('Background removal failed:', error);
      toast({
        title: "Processing failed",
        description: "Please try again with a different image",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const downloadImage = () => {
    if (processedImageUrl) {
      const link = document.createElement('a');
      link.href = processedImageUrl;
      link.download = `${imageFile.name.split('.')[0]}_no_bg.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className="glass-card p-6">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Wand2 className="w-8 h-8 text-primary" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">AI Background Removal</h3>
          <p className="text-muted-foreground">
            Remove the background from your image with AI precision
          </p>
        </div>

        {isProcessing && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Processing... {progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <Button 
            onClick={removeBackground}
            disabled={isProcessing}
            className="ai-glow"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Remove Background
              </>
            )}
          </Button>
          
          {processedImageUrl && (
            <Button variant="outline" onClick={downloadImage}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BackgroundRemoval;